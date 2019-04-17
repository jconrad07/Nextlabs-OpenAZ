var util = require('util');

var Category = require("./Category");
var NextLabsXACML = require("../xacml/NextLabsXACML");
var NextLabsConstants = require("../NextLabsConstants");

function Host(id) {
	Category.apply(this, arguments);

	if (!id) {
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_NAME, NextLabsConstants.LOCAL_HOST);
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS, NextLabsConstants.DEFAULT_INET_ADDRESS);
	} else if (typeof id == "string") {
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_NAME, id);
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS, NextLabsConstants.DEFAULT_INET_ADDRESS);
	} else if (typeof id == "number") {
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS, id.toString());
	} else {
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_NAME, NextLabsConstants.LOCAL_HOST);
		this._attributes.set(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS, NextLabsConstants.DEFAULT_INET_ADDRESS);
	}
}

util.inherits(Host, Category);

/**
 * Get categoryid of the object
 */
Host.prototype.getCategoryID = function() {
	return NextLabsXACML.ID_NEXTLABS_ATTRIBUTE_CATEGORY_HOST;
}

module.exports = Host;
