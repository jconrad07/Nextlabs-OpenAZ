var util = require('util');

var Category = require("./Category");
var XACML3 = require("../xacml/XACML3");
var XACMLConstants = require("../xacml/NextLabsXACML");

function Subject(id) {
	
	if (!id) {
		throw Error("Object id is null or undefined");
	}
	
	Category.apply(this, arguments);
	this._attributes.set(XACML3.ID_SUBJECT_SUBJECT_ID, id.toString());
}

util.inherits(Subject, Category);

/**
 * Get categoryid of the object
 */
Subject.prototype.getCategoryID = function() {
	return XACML3.ID_SUBJECT_CATEGORY_ACCESS_SUBJECT;
}

module.exports = Subject;
