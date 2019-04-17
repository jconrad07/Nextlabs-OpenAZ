"use strict";

function Obligation(obligation) {
	var _this = this;
	this._wrappedObligation = obligation;
	this._id = obligation.Id;
	this._attributeMap = new Map();
	
	var obligationAttributes = obligation.AttributeAssignment;

	if (obligationAttributes) {
		obligationAttributes.forEach(function(attribute) {
			if (!attribute) {
				return;
			}
			
			var obligationAttrId = attribute.AttributeId;
			if (!obligationAttrId) {
				return;
			}
			
			_this._attributeMap.set(obligationAttrId, attribute.Value);
		});
	};
}

/**
 * Return the id of the obligation
 */
Obligation.prototype.getId = function() {
	return this._id;
}

/**
 * Return the attribute map of the obligation
 */
Obligation.prototype.getAttributeMap = function() {
	return this._attributeMap;
}

module.exports = Obligation;