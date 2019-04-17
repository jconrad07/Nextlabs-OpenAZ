"use strict";

var request = require("request");
var querystring = require('querystring');
var Promise = require("bluebird");

var NextLabsConstants = require("./NextLabsConstants");
var Utils = require("./Utils");

function NextLabsRestPDPEngine(options) {

	if (options[NextLabsConstants.PDP_REST_HTTPS]) {
		this._protocol = 'https';
	} else {
		this._protocol = 'http';
	}

	if (!Utils.validateString(options[NextLabsConstants.PDP_REST_HOST])) {
		throw Error("Host is null or undefined");
	} else {
		this._host = options[NextLabsConstants.PDP_REST_HOST].trim();
	}

	if (!Utils.validateNumber(options[NextLabsConstants.PDP_REST_PORT])) {
		if (this._protocol === "http") {
			this._port = NextLabsConstants.DEFAULT_HTTP_PORT;
		} else {
			this._port = NextLabsConstants.DEFAULT_HTTPS_PORT;
		}
	} else {
		this._port = parseInt(options[NextLabsConstants.PDP_REST_PORT]);
	}

	if (!Utils.validateString(options[NextLabsConstants.PDP_REST_RESOURCE_PATH])) {
		this._resourcePath = NextLabsConstants.DEFAULT_RES_PATH;
	} else {
		this._resourcePath = options[NextLabsConstants.PDP_REST_RESOURCE_PATH].trim();
	}
	// hide the default port for http and https (otherwise will cause cas authentication problem)
	if( (this._protocol === 'http' && this._port === 80) ||
		(this._protocol === 'https' && this._port === 443) ) {
		this._endpoint = this._protocol + "://" + this._host + this._resourcePath;
	} else {
		this._endpoint = this._protocol + "://" + this._host + ":" + this._port  + this._resourcePath;
	}
	
	// console.log("Endpoint is " + this._endpoint);

	if (!Utils.validateString(options[NextLabsConstants.PDP_REST_AUTH_TYPE])) {
		this._authenticationType = NextLabsConstants.NONE_AUTH_TYPE;
	} else {
		this._authenticationType = options[NextLabsConstants.PDP_REST_AUTH_TYPE].trim();
	}

	switch(this._authenticationType) {
		case NextLabsConstants.NONE_AUTH_TYPE:
			break;
		case NextLabsConstants.CAS_AUTH_TYPE: 
			if(!Utils.validateString(options[NextLabsConstants.PDP_REST_CAS_AUTH_USERNAME]) || !Utils.validateString(options[NextLabsConstants.PDP_REST_CAS_AUTH_PASSWORD])) {
				throw Error("casUsername or casPassword is null or undefined");
			} else {
				this._casUsername = options[NextLabsConstants.PDP_REST_CAS_AUTH_USERNAME].trim();
				this._casPassword = options[NextLabsConstants.PDP_REST_CAS_AUTH_PASSWORD].trim();
				this._casAuthEndpoint = this._protocol + "://" + this._host + ":" + this._port + NextLabsConstants.CAS_TICKET_PATH;
			}
			break;
		case NextLabsConstants.OAUTH2_AUTH_TYPE:
			// if oauth2 grant_type is not specified, use default
			if (Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_TOKEN_GRANT_TYPE])) {
				this._oauth2GrantType = options[NextLabsConstants.PDP_REST_OAUTH2_TOKEN_GRANT_TYPE];
			} else {
				this._oauth2GrantType = NextLabsConstants.DEFAULT_PDP_REST_OAUTH2_GRANT_TYPE;
			}
			// if oauth2 server is not specified explicitly, use pdp host
			if(Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_SERVER])) {
				this._oauth2Host = options[NextLabsConstants.PDP_REST_OAUTH2_SERVER].trim();
			} else {
				this._oauth2Host = this._host;
			}
			// if oauth2 server protocol is not specified explicitly, use default
			if(options[NextLabsConstants.PDP_REST_OAUTH2_HTTPS] == undefined) {
				this._oauth2Protocol = NextLabsConstants.DEFAULT_PDP_REST_OAUTH2_HTTPS ? 'https' : 'http';
			} else {
				this._oauth2Protocol = options[NextLabsConstants.PDP_REST_OAUTH2_HTTPS] ? 'https' : 'http';
			}
			// if oauth2 server port is not specified explicitly, use default
			if (Utils.validateNumber(options[NextLabsConstants.PDP_REST_OAUTH2_PORT])) {
				this._oauth2Port = parseInt(options[NextLabsConstants.PDP_REST_OAUTH2_PORT]);
			} else {
				this._oauth2Port = NextLabsConstants.DEFAULT_PDP_REST_OAUTH2_PORT;
			}
			// if oauth2 server token endpoint is not specified explicitly, use default
			if (!Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_TOKEN_ENDPOINT_PATH])) {
				this._oauth2TokenEndpoint = NextLabsConstants.DEFAULT_PDP_REST_OAUTH2_TOKEN_ENDPOINT_PATH;
			} else {
				this._oauth2TokenEndpoint = options[NextLabsConstants.PDP_REST_OAUTH2_TOKEN_ENDPOINT_PATH].trim();
			}

			this._oauth2TokenExpiresIn = parseInt(options[NextLabsConstants.PDP_REST_OAUTH2_TOKEN_EXPIRES_IN]);
			if(isNaN(this._oauth2TokenExpiresIn) || this._oauth2TokenExpiresIn < 0) this._oauth2TokenExpiresIn = NextLabsConstants.DEFAULT_PDP_REST_OAUTH2_TOKEN_EXPIRES_IN;
			
			this._oauth2AuthEndpoint = this._oauth2Protocol + "://" + this._oauth2Host + ":" + this._oauth2Port + this._oauth2TokenEndpoint;

			switch(this._oauth2GrantType) {
				case NextLabsConstants.OAUTH2_GRANT_TYPE_CLIENT_CREDENTIALS:
					if(!Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_CLIENT_ID]) || !Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_CLIENT_SECRET])) {
						throw new Error(NextLabsConstants.PDP_REST_OAUTH2_CLIENT_ID + " or " + NextLabsConstants.PDP_REST_OAUTH2_CLIENT_SECRET + " is null or undefined");
					} else {
						this._oauth2ClientId = options[NextLabsConstants.PDP_REST_OAUTH2_CLIENT_ID].trim();
						this._oauth2ClientSecret = options[NextLabsConstants.PDP_REST_OAUTH2_CLIENT_SECRET].trim();
					}
					break;
				case NextLabsConstants.OAUTH2_GRANT_TYPE_PASSWORD:
					if(!Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_USERNAME]) || !Utils.validateString(options[NextLabsConstants.PDP_REST_OAUTH2_PASSWORD])) {
						throw new Error(NextLabsConstants.PDP_REST_OAUTH2_USERNAME + " or " + NextLabsConstants.PDP_REST_OAUTH2_PASSWORD + " is null or undefined");
					} else {
						this._oauth2Username = options[NextLabsConstants.PDP_REST_OAUTH2_USERNAME].trim();
						this._oauth2Password = options[NextLabsConstants.PDP_REST_OAUTH2_PASSWORD].trim();
					}
					break;
				default:
					throw new Error("Unsupported grant type:" + this._oauth2GrantType);
			}
			this._oauth2Header = {};
			break;
		default:
			throw new Error("Unsupported auth type:" + this._authenticationType);
	}

	this._requestOptions = {};
	if (options[NextLabsConstants.PDP_REST_IGNORE_HTTPS_CERTIFICATE]) {
		// allow insecure https
		this._requestOptions['rejectUnauthorized'] = false;
	}
	this._passedConfiguration = true;
	this._cookieJar = request.jar();
	this._request = request.defaults({
		jar : this._cookieJar
	});
	this._authPromise = null;
}

/**
 * Authenticate to server with CAS authentication
 * 
 * @return a promise object
 */
NextLabsRestPDPEngine.prototype._casAuthenticate = function() {
	var _this = this;
	if(_this._authenticationType !==  NextLabsConstants.CAS_AUTH_TYPE) {
		throw new Error('The authenticationType is not ' + NextLabsConstants.CAS_AUTH_TYPE);
	}
	
	if(!_this._authPromise || !_this._authPromise.isPending()) {
		_this._authPromise = new Promise(function (resolve, reject) {
			if (!_this._passedConfiguration) {
				throw new Error("NextLabs Rest PDP engine wasn't configured properly");
			}
            var formData = querystring.stringify({username: _this._casUsername, password: _this._casPassword});
						var options = Object.assign({
							url: _this._casAuthEndpoint,
							method: 'POST',
							headers: {
									'Content-Type': 'application/x-www-form-urlencoded',
									'Content-Length': formData.length
							},
							body: formData
						}, _this._requestOptions);

            _this._request(options, function(err, httpResponse, body) {
					if(err) {
						reject(err);
					} else if(httpResponse.statusCode != 201) {
						reject(new Error("Error requesting TGT" + body));
					} else {
						var stEndpoint = httpResponse.headers['location'];
						// console.log("Service ticket location: " + stEndpoint);
						var stFormData = querystring.stringify({service: _this._endpoint});
						var options = Object.assign({
							url: stEndpoint,
							method: 'POST',
							headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': stFormData.length
							},
							body: stFormData,
							timeout: 10000
						}, _this._requestOptions);
						_this._request(options, function(err, httpResponse, body) {
							if(err) {
								reject(err);
							} else if(httpResponse.statusCode != 200) {
								reject(new Error("Error requesting ST: " + body));
							} else {
								var st = body;
								// console.log("Service ticket got: " + st);
								var options = Object.assign({
									url: _this._endpoint + '?' + querystring.stringify({ticket: st}),
									method: 'GET',
									timeout: 10000
								}, _this._requestOptions);
								_this._request(options, function(err, httpResponse, body) {
									if (err) {
										reject(err);
									} else if(httpResponse.statusCode != 200) {
										reject(new Error("Obtain CAS cookie error" + body));
									} else {
										// console.log("Authenticatd");
										resolve(true);
									}
								});
							}
						});
					}
				}
			);
		});
	}
	return _this._authPromise;
};

/**
 * Authenticate to server with OAuth authentication
 * 
 * @return a promise object
 */
NextLabsRestPDPEngine.prototype._oauth2TokenAuth = function() {
	var _this = this;
	if(_this._authenticationType !==  NextLabsConstants.OAUTH2_AUTH_TYPE) {
		throw new Error('The authenticationType is not ' + NextLabsConstants.OAUTH2_AUTH_TYPE);
	}
	
	if(!_this._authPromise || !_this._authPromise.isPending()) {
		_this._authPromise = new Promise(function (resolve, reject) {
			if (!_this._passedConfiguration) {
				throw new Error("NextLabs Rest PDP engine wasn't configured properly");
			}
			var formObj = {
				grant_type: _this._oauth2GrantType,
				expires_in: _this._oauth2TokenExpiresIn
			}
			if (_this._oauth2GrantType == NextLabsConstants.OAUTH2_GRANT_TYPE_CLIENT_CREDENTIALS) {
				formObj.client_id = _this._oauth2ClientId;
				formObj.client_secret = _this._oauth2ClientSecret;
			} else if (_this._oauth2GrantType == NextLabsConstants.OAUTH2_GRANT_TYPE_PASSWORD) {
				formObj.username = _this._oauth2Username;
				formObj.password = _this._oauth2Password;
			}
			var formData = querystring.stringify(formObj);
			var options = Object.assign({
				url: _this._oauth2AuthEndpoint,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': formData.length
				},
				body: formData,
				timeout: 10000
			}, _this._requestOptions);
			_this._request(options, function(err, httpResponse, body) {
					if(err) {
						reject(err);
					} else if(httpResponse.statusCode != 200) {
						reject(new Error("Error while generating token with status code " + httpResponse.statusCode));
					} else {
						var tokenData = JSON.parse(body)
						var tokenType = tokenData['token_type']
						var token = tokenData['access_token']
						if(!Utils.validateString(tokenType) || !Utils.validateString(token)) {
							reject(new Error("got non wel formed token response while generating token"));
						}
						_this._oauth2Header.Authorization = tokenType + ' ' + token
						resolve(true);
					}
				}
			);
		});
	}
	return _this._authPromise;
};

/**
 * Evaluate the json request
 * 
 * @param jsonPayLoad
 *            the request object in json format
 * @return a promise object
 */
NextLabsRestPDPEngine.prototype.evaluate = function(jsonPayload) {
	var _this = this;

	if(typeof jsonPayload !== 'string') {
		throw new Error("Illegal argument: " + jsonPayload);
	}
	
	return new Promise(function(resolve, reject) {
		if (!_this._passedConfiguration) {
			throw new Error("NextLabs Rest PDP engine wasn't configured properly");
		}

		_this._sendRequest(jsonPayload).then(function(response) {
			resolve(response);
		}, function(error) {
			// check whether it's caused by unauthorized
			if (error instanceof PDPAuthenticationError) {
				var authPromise = null;
				switch(_this._authenticationType) {
					case NextLabsConstants.CAS_AUTH_TYPE:
						// try to authenticate and try again
						// console.log("Trying to authenticate...");
						authPromise = _this._casAuthenticate();
						break;
					case NextLabsConstants.OAUTH2_AUTH_TYPE:
						authPromise = _this._oauth2TokenAuth();
						break;
					default:
						reject(new Error("Unsupported auth type:" + _this._authenticationType))
				}
				authPromise && authPromise.then(function() {
					_this._sendRequest(jsonPayload).then(function(response) {
						resolve(response);
					}, function(error) {
						reject(error);
					});
				}, function(error) {
					reject(error);
				});
			} else {
				reject(error);
			}
		});
	});
}

/**
 * Internal method to send post request to NextLabs Rest API
 * 
 * @param jsonPayLoad
 *            the request object in json format
 * @return a promise object, with resolve to json object of the reposne body
 */
NextLabsRestPDPEngine.prototype._sendRequest = function(jsonPayLoad) {
	var _this = this;

	var formData = querystring.stringify({
		"Version" : NextLabsConstants.API_VERSION,
		"DataType" : NextLabsConstants.API_DATA_TYPE_JSON,
		"Service" : NextLabsConstants.API_SERVICE,
		"data" : jsonPayLoad
	});

	var headers = {
		'Accept' : 'application/json',
		'Content-Type' : 'application/x-www-form-urlencoded',
		'Content-Length' : formData.length
	}
	for (var k in _this._oauth2Header) {
		headers[k] = _this._oauth2Header[k]
	}
	var options = Object.assign({
		followAllRedirects : true,
		url : this._endpoint,
		method : 'POST',
		headers : headers,
		body : formData,
		timeout : 10000
	}, _this._requestOptions);

	return new Promise(function sendRequestPromise(resolve, reject) {
		_this._request(options, function(error, response, body) {
			if (error) {
				reject(error);
			} else if (response.statusCode == 404) {
				reject(new Error("404: Endpoint cannot be reached"));
			} else if (response.statusCode == 401) {
				reject(new PDPAuthenticationError("Got authentication error from server"));
			} else if (response.statusCode == 200) {
				try {
					resolve(JSON.parse(body));
				} catch(error) {
					reject(new Error("Error parsing response: " + error));
				}
			} else {
				reject(new Error("Unable to call the Rest API" + body));
			}
		});
	});

}

function PDPAuthenticationError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

module.exports = NextLabsRestPDPEngine;
