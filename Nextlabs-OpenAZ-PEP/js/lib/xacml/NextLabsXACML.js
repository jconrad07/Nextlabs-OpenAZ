"use strict";

var XACML = require("./XACML");
var Utils = require("../Utils");

module.exports = Object.freeze(new function() {
	
	this.URN_NEXTLABS = "urn:nextlabs:names:evalsvc:1.0";

	this.ID_RESOURCE = Utils.resolveURI(this.URN_NEXTLABS, "resource");
	this.ID_RESOURCE_RESOURCE_TYPE = Utils.resolveURI(this.ID_RESOURCE, "resource-type");

	this.ID_NEXTLABS_ATTRIBUTE_CATEGORY_APPLICATION = Utils.resolveURI(this.URN_NEXTLABS, XACML.ATTRIBUTE_CATEGORY, "application");
	this.ID_NEXTLABS_ATTRIBUTE_CATEGORY_POD = Utils.resolveURI(this.URN_NEXTLABS, XACML.ATTRIBUTE_CATEGORY, "pod");
	this.ID_NEXTLABS_ATTRIBUTE_CATEGORY_HOST = Utils.resolveURI(this.URN_NEXTLABS, XACML.ATTRIBUTE_CATEGORY, "host");
	this.ID_NEXTLABS_ATTRIBUTE_CATEGORY_NAMED_ATTRIBUTE = Utils.resolveURI(this.URN_NEXTLABS, XACML.ATTRIBUTE_CATEGORY, "environment-");

	this.ID_APPLICATION = Utils.resolveURI(this.URN_NEXTLABS, "application");
	this.ID_APPLICATION_APPLICATION_ID = Utils.resolveURI(this.ID_APPLICATION, "application-id");
	
	this.ID_POD = Utils.resolveURI(this.URN_NEXTLABS, "pod");
	this.ID_POD_POD_ID = Utils.resolveURI(this.ID_POD, "pod-id");
	this.ID_POD_IGNORE_BUILT_IN = Utils.resolveURI(this.ID_POD, "pod-ignore-built-in");
		
	this.ID_RECIPIENT = Utils.resolveURI(this.URN_NEXTLABS, "recipient");
	this.ID_RECIPIENT_RECIPIENT_EMAIL = Utils.resolveURI(this.URN_NEXTLABS, "recipient", "email");
	this.ID_RECIPIENT_RECIPIENT_ID = Utils.resolveURI(this.URN_NEXTLABS, "recipient", "id");
	
	this.ID_HOST = Utils.resolveURI(this.URN_NEXTLABS, "host");
	this.ID_HOST_HOST_NAME = Utils.resolveURI(this.ID_HOST, "name");
	this.ID_HOST_HOST_INET_ADDRESS = Utils.resolveURI(this.ID_HOST, "inet_address");
	
});

