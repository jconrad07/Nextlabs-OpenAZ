var util = require('util');

var Category = require("./Category");
var XACML3 = require("../xacml/XACML3");
var NextLabsXACML = require("../xacml/NextLabsXACML");

function Resource(id) {

	if (!id) {
		throw Error("Object id is null or undefined");
	}

	Category.apply(this, arguments);
	this._attributes.set(XACML3.ID_RESOURCE_RESOURCE_ID, id.toString());
}

util.inherits(Resource, Category);

/**
 * Get categoryid of the object
 */
Resource.prototype.getCategoryID = function() {
	return XACML3.ID_ATTRIBUTE_CATEGORY_RESOURCE;
}

Resource.prototype.setResourceType = function(resourceType) {
	this._attributes.set(NextLabsXACML.ID_RESOURCE_RESOURCE_TYPE, resourceType);
}

Resource.prototype.getResourceType = function() {
	return this._attributes.get(NextLabsXACML.ID_RESOURCE_RESOURCE_TYPE);
}

module.exports = Resource;
