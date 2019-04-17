"use strict";

module.exports = Object.freeze(new function() {
	this.PERMIT = "Permit";
	this.DENY = "Deny";
	this.INDETERMINATE = "Indeterminate";
	this.INDETERMINATE_PERMIT = "Indeterminate{P}";
	this.INDETERMINATE_DENY = "Indeterminate{D}";
	this.INDETERMINATE_DENYPERMIT ="Indeterminate{DP}";
	this.NOTAPPLICABLE = "NotApplicable";
});