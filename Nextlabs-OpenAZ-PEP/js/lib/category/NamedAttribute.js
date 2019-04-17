var util = require('util');

var Category = require("./Category");
var XACML3 = require("../xacml/XACML3");
var NextLabsXACML = require("../xacml/NextLabsXACML");

function NamedAttribute(name) {
	Category.apply(this, arguments);

	if (name) {
		this._attributeName = name;
	} else {
		throw Error("Attribute name is null or undefined");
	}
}

util.inherits(NamedAttribute, Category);

/**
 * Get categoryid of the object
 */
NamedAttribute.prototype.getCategoryID = function() {
	return NextLabsXACML.ID_NEXTLABS_ATTRIBUTE_CATEGORY_NAMED_ATTRIBUTE + this._attributeName;
}

module.exports = NamedAttribute;
