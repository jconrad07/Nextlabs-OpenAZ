"use strict";

var Utils = require("../Utils");

module.exports = Object.freeze(new function() {

    this.XMLSCHEMA = "http://www.w3.org/2001/XMLSchema#";
    this.XPATHVERSION_1_0 = "http://www.w3.org/TR/1999/REC-xpath-19991116";
    this.XPATHVERSION_2_0 = "http://www.w3.org/TR/2007/REC-xpath20-20070123";
    this.XQUERYOPERATORS = "http://www.w3.org/TR/2002/WD-xquery-operators-20020816";

    /*
     * URN builder components
     */
    this.URN_XACML = "urn:oasis:names:tc:xacml";
    this.DATA_TYPE = "data-type";
    this.RULE_COMBINING_ALGORITHM = "rule-combining-algorithm";
    this.POLICY_COMBINING_ALGORITHM = "policy-combining-algorithm";
    this.FUNCTION = "function";
    this.ATTRIBUTE_CATEGORY = "attribute-category";
    this.SUBJECT_CATEGORY = "subject-category";
    this.SCOPE = "scope";
    this.CONTENT_SELECTOR = "content-selector";
    this.MULTIPLE_CONTENT_SELECTOR = "multiple" + this.CONTENT_SELECTOR;
    this.CONFORMANCE_TEST = "conformance-test";
    this.CONTEXT = "context";
    this.EXAMPLE = "example";
    this.ENVIRONMENT = "environment";
    this.POLICY = "policy";
    this.SUBJECT = "subject";
    this.RESOURCE = "resource";
    this.ACTION = "action";
    this.ACTIONS = "actions";
    this.PROFILE = "profile";
    this.PROFILES = "profiles";

    /*
     * Full Identifiers from the URN components
     */
    this.ID_XACML = Utils.resolveURI(this.URN_XACML);

    /*
     * Data Type strings
     */
    this.DATATYPE_STRING = this.XMLSCHEMA + "string";
    this.DATATYPE_BOOLEAN = this.XMLSCHEMA + "boolean";
    this.DATATYPE_INTEGER = this.XMLSCHEMA + "integer";
    this.DATATYPE_DOUBLE = this.XMLSCHEMA + "double";
    this.DATATYPE_TIME = this.XMLSCHEMA + "time";
    this.DATATYPE_DATE = this.XMLSCHEMA + "date";
    this.DATATYPE_DATETIME = this.XMLSCHEMA + "dateTime";
    this.DATATYPE_DAYTIMEDURATION = this.XMLSCHEMA + "dayTimeDuration";
    this.DATATYPE_YEARMONTHDURATION = this.XMLSCHEMA + "yearMonthDuration";
    this.DATATYPE_ANYURI = this.XMLSCHEMA + "anyURI";
    this.DATATYPE_HEXBINARY = this.XMLSCHEMA + "hexBinary";
    this.DATATYPE_BASE64BINARY = this.XMLSCHEMA + "base64Binary";

    this.DATATYPE_WD_DAYTIMEDURATION = this.XQUERYOPERATORS + "#dayTimeDuration";
    this.DATATYPE_WD_YEARMONTHDURATION = this.XQUERYOPERATORS + "#yearMonthDuration";

    /*
     * Data Type identifiers
     */
    this.ID_DATATYPE_STRING = Utils.resolveURI(this.DATATYPE_STRING);
    this.ID_DATATYPE_BOOLEAN = Utils.resolveURI(this.DATATYPE_BOOLEAN);
    this.ID_DATATYPE_INTEGER = Utils.resolveURI(this.DATATYPE_INTEGER);
    this.ID_DATATYPE_DOUBLE = Utils.resolveURI(this.DATATYPE_DOUBLE);
    this.ID_DATATYPE_TIME = Utils.resolveURI(this.DATATYPE_TIME);
    this.ID_DATATYPE_DATE = Utils.resolveURI(this.DATATYPE_DATE);
    this.ID_DATATYPE_DATETIME = Utils.resolveURI(this.DATATYPE_DATETIME);
    this.ID_DATATYPE_DAYTIMEDURATION = Utils.resolveURI(this.DATATYPE_DAYTIMEDURATION);
    this.ID_DATATYPE_YEARMONTHDURATION = Utils.resolveURI(this.DATATYPE_YEARMONTHDURATION);
    this.ID_DATATYPE_ANYURI = Utils.resolveURI(this.DATATYPE_ANYURI);
    this.ID_DATATYPE_HEXBINARY = Utils.resolveURI(this.DATATYPE_HEXBINARY);
    this.ID_DATATYPE_BASE64BINARY = Utils.resolveURI(this.DATATYPE_BASE64BINARY);

    this.ID_DATATYPE_WD_DAYTIMEDURATION = Utils.resolveURI(this.DATATYPE_WD_DAYTIMEDURATION);
    this.ID_DATATYPE_WD_YEARMONTHDURATION = Utils.resolveURI(this.DATATYPE_WD_YEARMONTHDURATION);

});