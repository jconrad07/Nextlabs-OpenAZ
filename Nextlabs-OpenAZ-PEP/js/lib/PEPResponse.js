"use strict"
var Obligation = require("./Obligation");
var Decision = require("./Decision");

function PEPResponse(response) {
	var _this = this;
	if (!response) {
		throw Error("Response object is null or undefined");
	}

	if (!response.Decision) {
		throw Error("Response object is invalid. No decision can be retrieved");
	}

	this._wrappedResult = response;
	this._decision = response.Decision;

	if (response.Status) {
		this._status = response.Status;
	}

	// process obligation if exists
	this._obligationMap = new Map();


	if (response.Obligations) {
		response.Obligations.forEach(function(obligation) {

			if (!obligation) {
				return;
			}

			if (!obligation.Id) {
				return;
			}

			var obligationObject = new Obligation(obligation);
			_this._obligationMap.set(obligation.Id, obligationObject);

		});
	}
};

PEPResponse.prototype.allowed = function() {
	switch (this._decision) {
		case Decision.PERMIT :
			return true;
		case Decision.DENY :
			return false;
		case Decision.NOTAPPLICABLE :
			return false;
		case Decision.INDETERMINATE :
		case Decision.INDETERMINATE_DENY :
		case Decision.INDETERMINATE_DENYPERMIT :
		case Decision.INDETERMINATE_PERMIT :
			var message = "Decision: Indeterminate";
			if (this._status) {
				message += " - Status Code: " + this._status.StatusCode.Value + ", Status Message: " + this._status.StatusMessage;
			}
			throw Error(message);
		default :
			throw Error("Invalid response from PDP");
	}
};

PEPResponse.prototype.getObligations = function() {
	return this._obligationMap;
};

PEPResponse.prototype.getWrappedResult = function() {
	return this._wrappedResult;
}

module.exports = PEPResponse;