"use strict";
var Promise = require("bluebird");
var PEPResponse = require("./lib/PEPResponse");
var Obligation = require("./lib/Obligation");
var PEPRequest = require("./lib/PEPRequest");
var NextlabsRestPDPEngine = require("./lib/NextlabsRestPDPEngine");

function NextLabsPEPAgent(options) {

	if (!options) {
		console.log("NextLabsPEPAgent() Constructor argument is null");
		options = {};
	}
	
	this.pdpEngine = new NextlabsRestPDPEngine(options);
};

NextLabsPEPAgent.prototype.simpleDecide = function(subject, resource, action) {
};

NextLabsPEPAgent.prototype.decide = function() {
	var pepRequest = new PEPRequest(null, Array.from(arguments));

	return this._callEngine(pepRequest);
};

NextLabsPEPAgent.prototype.bulkDecide = function() {

	if (arguments.length < 3) {
		throw Error("Missing some arguments. Arguments length should be at least 3");
	}	

	var pepRequest = new PEPRequest(arguments[0], Array.from(arguments).slice(1));

	return this._callEngine(pepRequest);
};

NextLabsPEPAgent.prototype._callEngine = function(pepRequest) {
	var _this = this;

	return new Promise(function(resolve, reject) {
		_this.pdpEngine.evaluate(pepRequest.toXACMLJson()).then(function(response) {

			if (!response || !response.Response || !response.Response.Result) {
				reject("Response from PDP is invalid");
			}

			var resultObj = response.Response.Result;

			if (resultObj instanceof Array) {
				try {
					if (resultObj.length == 1) {
						resolve(new PEPResponse(resultObj[0]));
					} else {
						var pepResponses = [];
						resultObj.forEach(function(result) {
							pepResponses.push(new PEPResponse(result));
						})
						
						resolve(pepResponses);
					}
				} catch (error) {
					reject(error);
				}
			} else {
				reject("Response result from PDP is invalid")
			}
		}, function (error) {
			reject(error);
		}); 
	});
}

module.exports = NextLabsPEPAgent;