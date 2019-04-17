"use strict";

function Category() {
	this._attributes = new Map();
};

/**
 * Add an attribute to the category object
 * 
 * @param {String}
 *            attributeId attributeid of the attribute
 * @param {Object}
 *            value value of the attribute
 * @param {Boolean}
 *            includeInResult
 */
Category.prototype.addAttribute = function(attributeId, value) {

	if (!attributeId) {
		throw Error("Attribute name is null or undefined");
	}

	if (!value) {
		throw Error("Attribute value is null or undefined");
	}
	
	this._attributes.set(attributeId.toString(), value);
}

/**
 * Get the value of an attribute
 * 
 * @param {String}
 *            attributeId xacml id of the attribute
 * @return value of the attribute
 */
Category.prototype.getAttribute = function(attributeId) {

	if (!attributeId) {
		throw Error("Attribute name is null or undefined");
	}

	return this._attributes.get(attributeId);

}

/**
 * Get the attributes map
 * 
 * @return the attributes map of the object
 */
Category.prototype.getAttributesMap = function() {
	return this._attributes;
}

module.exports = Category;
