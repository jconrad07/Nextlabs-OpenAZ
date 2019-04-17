var util = require('util');

var Category = require("./Category");
var NextLabsXACML = require("../xacml/NextLabsXACML");

function Application(id) {
	
	if (!id) {
		throw Error("Object id is null or undefined");
	}
	
	Category.apply(this, arguments);
	this._attributes.set(NextLabsXACML.ID_APPLICATION_APPLICATION_ID, id.toString());
}

util.inherits(Application, Category);

/**
 * Get categoryid of the object
 */
Application.prototype.getCategoryID = function() {
	return NextLabsXACML.ID_NEXTLABS_ATTRIBUTE_CATEGORY_APPLICATION;
}

module.exports = Application;
