var util = require('util');

var Category = require("./Category");
var XACML3 = require("../xacml/XACML3");

function Action(id) {
	
	if (!id) {
		throw Error("Object id is null or undefined");
	}
	
	Category.apply(this, arguments);
	this._attributes.set(XACML3.ID_ACTION_ACTION_ID, id.toString());
}

util.inherits(Action, Category);

/**
 * Get categoryid of the object
 */
Action.prototype.getCategoryID = function() {
	return XACML3.ID_ATTRIBUTE_CATEGORY_ACTION;
}

module.exports = Action;
