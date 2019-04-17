var util = require('util');

var Category = require("./Category");
var XACML3 = require("../xacml/XACML3");
var NextLabsXACML = require("../xacml/NextLabsXACML");

function Recipient(param) {
	Category.apply(this, arguments);

	if (!param) {
		throw Error("Recipient id or email is null or undefined");
	}

	if (param instanceof Array) {
		this._attributes.set(NextLabsXACML.ID_RECIPIENT_RECIPIENT_EMAIL, 
				param.map(function(currentValue) {
					return currentValue.toString()
				}));
	} else {
		this._attributes.set(NextLabsXACML.ID_RECIPIENT_RECIPIENT_ID, param.toString());
	}
}

util.inherits(Recipient, Category);

/**
 * Get categoryid of the object
 */
Recipient.prototype.getCategoryID = function() {
	return XACML3.ID_SUBJECT_CATEGORY_RECIPIENT_SUBJECT;
}

module.exports = Recipient;
