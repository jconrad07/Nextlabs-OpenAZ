"use strict";

var Category = require("./category/Category");
var PEPRequestAttributes = require("./PEPRequestAttributes");
var XACML3 = require("./xacml/XACML3");

function PEPRequest(association, requestObjects) {
    this._association = association;
    this._requestObjects = requestObjects;
    this.idCounter = 1;
    this.pepRequestAttributesMapByCategory = new Map();
    this.associationPEPRequestAttributes = [];

    this._mapSharedRequestObjects();
    if(association) {
        this._mapAssociation();
    }
}

PEPRequest.prototype._getPepRequestAttributes = function(categoryIdentifier) {
    var pepRequestAttributes = this.pepRequestAttributesMapByCategory.get(categoryIdentifier);
    if(!pepRequestAttributes) {
        pepRequestAttributes = new PEPRequestAttributes(this.idCounter, categoryIdentifier);
        this.idCounter++;
        this.pepRequestAttributesMapByCategory.set(categoryIdentifier, pepRequestAttributes);   
    }
    return pepRequestAttributes;
}

PEPRequest.prototype._mapSharedRequestObjects = function() {
    var self = this;
    this._requestObjects.forEach(function(v) {
        if(v == null) {
            throw new Error("One or more requestObjects is null");
        }
        if(!(v instanceof Category)) {
            throw new Error("object not instanceof Category");
        }
        var identifier = v.getCategoryID();
        var pepRequestAttributes = self._getPepRequestAttributes(identifier);
        self._mapAttributes(v.getAttributesMap(), pepRequestAttributes);
    });
}

PEPRequest.prototype._mapAssociation = function() {
    var self = this;
    // first, clear the sharedPEPReqeustAttributes
    this.sharedPEPRequestAttributes = [];
    this._association.forEach(function(v) {
        if(v == null) {
            throw new Error("One or more association is null");
        }
        if(!(v instanceof Category)) {
            throw new Error("object not instanceof Category");
        }
        var pepRequestAttributes = new PEPRequestAttributes(self.idCounter, v.getCategoryID());
        self.idCounter++;
        self._mapAttributes(v.getAttributesMap(), pepRequestAttributes);
        self.associationPEPRequestAttributes.push(pepRequestAttributes);
    });
}

PEPRequest.prototype._mapAttributes = function(sourceMap, pepRequestAttributes) {
    sourceMap.forEach(function(v, k) {
        var key = k.toString();
        // send out values as only string
        var value;
        if(v instanceof Array) {
            value = [];
            v.forEach(function(i) {
                value.push(i.toString());
            });
        } else {
            value = v.toString();
        }
        pepRequestAttributes.addAttribute(k.toString(), v);
    });
}

PEPRequest.prototype._generateStringId = function(id) {
    return "attributes" + id;
}

PEPRequest.prototype._pepRequestAttributesToXACMLJson = function(pepRequestAttributes) {
    var categoryEle = {
        "CategoryId": pepRequestAttributes.categoryId,
        "Id": this._generateStringId(pepRequestAttributes.id),
        "Attribute": []
    };
    pepRequestAttributes.attributeMapById.forEach(function(value, attributeId) {
        categoryEle["Attribute"].push({
            "AttributeId": attributeId,
            "Value": value,
            "DataType": XACML3.ID_DATATYPE_STRING,
            "IncludeInResult": false,
            "Issuer" : ""
        })
    });
    return categoryEle;
}

PEPRequest.prototype.toXACMLJson = function() {
    var self = this;
    var xacmlRequest = new Object();
    xacmlRequest["CombinedDecision"] = false;
    xacmlRequest["ReturnPolicyIdList"] = false;
    xacmlRequest["Category"] = [];

    var sharedRefIds = [];

    this.pepRequestAttributesMapByCategory.forEach(function(v) {
        xacmlRequest["Category"].push(self._pepRequestAttributesToXACMLJson(v));
        sharedRefIds.push(self._generateStringId(v.id));
    });

    if(this.associationPEPRequestAttributes && this.associationPEPRequestAttributes.length > 0) {        
        var multiRequests = {"RequestReference": []};
        this.associationPEPRequestAttributes.forEach(function(v) {
            xacmlRequest["Category"].push(self._pepRequestAttributesToXACMLJson(v));
            multiRequests["RequestReference"].push({
                "ReferenceId": sharedRefIds.concat([self._generateStringId(v.id)])
            });
        });

        xacmlRequest["MultiRequests"] = multiRequests;
    }

    return JSON.stringify({"Request": xacmlRequest});
}

module.exports = PEPRequest;