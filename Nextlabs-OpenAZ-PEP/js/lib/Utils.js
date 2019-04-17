"use strict";

function Utils() {
};

Utils.prototype.validateString = function(str) {
	if (str === undefined || str == null || str.length === 0) {
		return false;
	} else {
		return true;
	}
};

Utils.prototype.validateNumber = function(num) {
	if (num === undefined || num == null || isNaN(num)) {
		return false;
	} else {
		return true;
	}
};

Utils.prototype.resolveURI = function() {
	var uri = "";
	
	for (var i = 0; i < arguments.length; i++) {
		uri += arguments[i];
		if (i != arguments.length - 1) {
			uri += ":";
		}
	}
	
	return uri;
}

module.exports = new Utils();