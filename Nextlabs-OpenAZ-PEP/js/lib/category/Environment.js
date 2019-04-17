var util = require('util');

var Category = require("./Category");
var XACML3 = require("../xacml/XACML3");

function Environment() {
	Category.apply(this, arguments);
}

util.inherits(Environment, Category);

/**
 * Get categoryid of the object
 */
Environment.prototype.getCategoryID = function() {
	return XACML3.ID_ATTRIBUTE_CATEGORY_ENVIRONMENT;
}

module.exports = Environment;
