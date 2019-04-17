var util = require('util');

var Category = require("./Category");
var NextLabsXACML = require("../xacml/NextLabsXACML");

function DiscretionaryPolicies(pql, flag) {
	
	if (!pql) {
		throw Error("PQL is null or undefined");
	}
	
	Category.apply(this, arguments);
	
	this._attributes.set(NextLabsXACML.ID_POD_POD_ID, pql.toString());

	if (flag != undefined && flag != null) {
		this._attributes.set(NextLabsXACML.ID_POD_IGNORE_BUILT_IN, flag.toString());
	} else {
		this._attributes.set(NextLabsXACML.ID_POD_IGNORE_BUILT_IN, "false");
	}
}

util.inherits(DiscretionaryPolicies, Category);

/**
 * Get categoryid of the object
 */
DiscretionaryPolicies.prototype.getCategoryID = function() {
	return NextLabsXACML.ID_NEXTLABS_ATTRIBUTE_CATEGORY_POD;
}

module.exports = DiscretionaryPolicies;
