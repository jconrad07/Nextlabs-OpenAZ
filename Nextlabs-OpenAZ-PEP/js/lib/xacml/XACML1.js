"use strict";

var XACML = require("./XACML");
var Utils = require("../Utils");

module.exports = Object.freeze(new function() {
    /*
     * DOM Namespaces and schema
     */
    this.SCHEMA_LOCATION_POLICY = "urn:oasis:names:tc:xacml:1.0:policy http://www.oasis-open.org/tc/xacml/1.0/cs-xacml-schema-policy-01.xsd";
    this.SCHEMA_LOCATION_CONTEXT = "urn:oasos:names:tc:xacml:1.0:context http://www.oasis-open.org/tc/xacml/1.0/cs-xacml-schema-context-01.xsd";
    this.XMLNS_POLICY = "urn:oasis:names:tc:xacml:1.0:policy";
    this.XMLNS_CONTEXT = "urn:oasis:names:tc:xacml:1.0:context";
    this.XMLNS_XSI = "http://www.w3.org/2001/XMLSchema-instance";

    /*
     * URN builder components
     */
    this.VERSION_1_0 = "1.0";
    this.VERSION_1_1 = "1.1";

    /*
     * Section 10.2.2 Identifier Prefixes
     */
    this.ID_XACML_1_0 = Utils.resolveURI(XACML.ID_XACML, this.VERSION_1_0);
    this.ID_XACML_1_1 = Utils.resolveURI(XACML.ID_XACML, this.VERSION_1_1);
    this.ID_CONFORMANCE_TEST = Utils.resolveURI(this.ID_XACML_1_0, XACML.CONFORMANCE_TEST);
    this.ID_CONTEXT = Utils.resolveURI(this.ID_XACML_1_0, XACML.CONTEXT);
    this.ID_EXAMPLE = Utils.resolveURI(this.ID_XACML_1_0, XACML.EXAMPLE);
    this.ID_FUNCTION = Utils.resolveURI(this.ID_XACML_1_0, XACML.FUNCTION);
    this.ID_POLICY = Utils.resolveURI(this.ID_XACML_1_0, XACML.POLICY);
    this.ID_SUBJECT = Utils.resolveURI(this.ID_XACML_1_0, XACML.SUBJECT);
    this.ID_SUBJECT_CATEGORY = Utils.resolveURI(this.ID_XACML_1_0, XACML.SUBJECT_CATEGORY);
    this.ID_RESOURCE = Utils.resolveURI(this.ID_XACML_1_0, XACML.RESOURCE);
    this.ID_ACTION = Utils.resolveURI(this.ID_XACML_1_0, XACML.ACTION);
    this.ID_ENVIRONMENT = Utils.resolveURI(this.ID_XACML_1_0, XACML.ENVIRONMENT);

    /*
     * Section 10.2.3 Algorithms
     */
    this.ID_RULE_COMBINING_ALGORITHM = Utils.resolveURI(this.ID_XACML_1_0, "rule-combining-algorithm");
    this.ID_POLICY_COMBINING_ALGORITHM = Utils.resolveURI(this.ID_XACML_1_0, "policy-combining-algorithm");

    this.DENY_OVERRIDES = "deny-overrides";
    this.ID_RULE_DENY_OVERRIDES = Utils.resolveURI(this.ID_RULE_COMBINING_ALGORITHM, this.DENY_OVERRIDES);
    this.ID_POLICY_DENY_OVERRIDES = Utils.resolveURI(this.ID_POLICY_COMBINING_ALGORITHM, this.DENY_OVERRIDES);
    this.PERMIT_OVERRIDES = "permit-overrides";
    this.ID_RULE_PERMIT_OVERRIDES = Utils.resolveURI(this.ID_RULE_COMBINING_ALGORITHM, this.PERMIT_OVERRIDES);
    this.ID_POLICY_PERMIT_OVERRIDES = Utils.resolveURI(this.ID_POLICY_COMBINING_ALGORITHM, this.PERMIT_OVERRIDES);
    this.FIRST_APPLICABLE = "first-applicable";
    this.ID_RULE_FIRST_APPLICABLE = Utils.resolveURI(this.ID_RULE_COMBINING_ALGORITHM, this.FIRST_APPLICABLE);
    this.ID_POLICY_FIRST_APPLICABLE = Utils.resolveURI(this.ID_POLICY_COMBINING_ALGORITHM, this.FIRST_APPLICABLE);
    this.ONLY_ONE_APPLICABLE = "only-one-applicable";
    this.ID_RULE_ONLY_ONE_APPLICABLE = Utils.resolveURI(this.ID_RULE_COMBINING_ALGORITHM, this.ONLY_ONE_APPLICABLE);
    this.ID_POLICY_ONLY_ONE_APPLICABLE = Utils.resolveURI(this.ID_POLICY_COMBINING_ALGORITHM, this.ONLY_ONE_APPLICABLE);

    this.ID_RULE_COMBINING_ALGORITHM11 = Utils.resolveURI(this.ID_XACML_1_1, "rule-combining-algorithm");
    this.ID_POLICY_COMBINING_ALGORITHM11 = Utils.resolveURI(this.ID_XACML_1_1, "policy-combining-algorithm");

    this.ORDERED_DENY_OVERRIDES = "ordered-deny-overrides";
    this.ID_RULE_ORDERED_DENY_OVERRIDES = Utils.resolveURI(this.ID_RULE_COMBINING_ALGORITHM11, this.ORDERED_DENY_OVERRIDES);
    this.ID_POLICY_ORDERED_DENY_OVERRIDES = Utils.resolveURI(this.ID_POLICY_COMBINING_ALGORITHM11, this.ORDERED_DENY_OVERRIDES);
    this.ORDERED_PERMIT_OVERRIDES = "ordered-permit-overrides";
    this.ID_RULE_ORDERED_PERMIT_OVERRIDES = Utils.resolveURI(this.ID_RULE_COMBINING_ALGORITHM11, this.ORDERED_PERMIT_OVERRIDES);
    this.ID_POLICY_ORDERED_PERMIT_OVERRIDES = Utils.resolveURI(this.ID_POLICY_COMBINING_ALGORITHM11, this.ORDERED_PERMIT_OVERRIDES);

    /*
     * Section 10.2.4 Status Codes
     */
    this.ID_STATUS = Utils.resolveURI(this.ID_XACML_1_0, "status");
    this.ID_STATUS_MISSING_ATTRIBUTE = Utils.resolveURI(this.ID_STATUS, "missing-attribute");
    this.ID_STATUS_OK = Utils.resolveURI(this.ID_STATUS, "ok");
    this.ID_STATUS_PROCESSING_ERROR = Utils.resolveURI(this.ID_STATUS, "processing-error");
    this.ID_STATUS_SYNTAX_ERROR = Utils.resolveURI(this.ID_STATUS, "syntax-error");

    /*
     * Section 10.2.5 Attributes
     */
    this.ID_ENVIRONMENT_CURRENT_TIME = Utils.resolveURI(this.ID_ENVIRONMENT, "current-time");
    this.ID_ENVIRONMENT_CURRENT_DATE = Utils.resolveURI(this.ID_ENVIRONMENT, "current-date");
    this.ID_ENVIRONMENT_CURRENT_DATETIME = Utils.resolveURI(this.ID_ENVIRONMENT, "current-dateTime");

    /*
     * Section 10.2.6 Identifiers
     */
    this.ID_SUBJECT_AUTHN_LOCALITY = Utils.resolveURI(this.ID_SUBJECT, "authn-locality");
    this.ID_SUBJECT_AUTHN_LOCALITY_DNS_NAME = Utils.resolveURI(this.ID_SUBJECT_AUTHN_LOCALITY, "dns-name");
    this.ID_SUBJECT_AUTHN_LOCALITY_IP_ADDRESS = Utils.resolveURI(this.ID_SUBJECT_AUTHN_LOCALITY, "ip-address");
    this.ID_SUBJECT_AUTHENTICATION_METHOD = Utils.resolveURI(this.ID_SUBJECT, "authentication-method");
    this.ID_SUBJECT_AUTHENTICATION_TIME = Utils.resolveURI(this.ID_SUBJECT, "authentication-time");
    this.ID_SUBJECT_KEY_INFO = Utils.resolveURI(this.ID_SUBJECT, "key-info");
    this.ID_SUBJECT_REQUEST_TIME = Utils.resolveURI(this.ID_SUBJECT, "request-time");
    this.ID_SUBJECT_SESSION_START_TIME = Utils.resolveURI(this.ID_SUBJECT, "session-start-time");
    this.ID_SUBJECT_SUBJECT_ID = Utils.resolveURI(this.ID_SUBJECT, "subject-id");
    this.ID_SUBJECT_SUBJECT_ID_QUALIFIER = Utils.resolveURI(this.ID_SUBJECT, "subject-id-qualifier");
    this.ID_SUBJECT_CATEGORY_ACCESS_SUBJECT = Utils.resolveURI(this.ID_SUBJECT_CATEGORY, "access-subject");
    this.ID_SUBJECT_CATEGORY_CODEBASE = Utils.resolveURI(this.ID_SUBJECT_CATEGORY, "codebase");
    this.ID_SUBJECT_CATEGORY_INTERMEDIARY_SUBJECT = Utils.resolveURI(this.ID_SUBJECT_CATEGORY, "intermediary-subject");
    this.ID_SUBJECT_CATEGORY_RECIPIENT_SUBJECT = Utils.resolveURI(this.ID_SUBJECT_CATEGORY, "recipient-subject");
    this.ID_SUBJECT_CATEGORY_REQUESTING_MACHINE = Utils.resolveURI(this.ID_SUBJECT_CATEGORY, "requesting-machine");
    this.ID_RESOURCE_RESOURCE_LOCATION = Utils.resolveURI(this.ID_RESOURCE, "resource-location");
    this.ID_RESOURCE_RESOURCE_ID = Utils.resolveURI(this.ID_RESOURCE, "resource-id");
    this.ID_RESOURCE_SCOPE = Utils.resolveURI(this.ID_RESOURCE, "scope");
    this.ID_RESOURCE_SIMPLE_FILE_NAME = Utils.resolveURI(this.ID_RESOURCE, "simple-file-name");
    this.ID_ACTION_ACTION_ID = Utils.resolveURI(this.ID_ACTION, "action-id");
    this.ID_ACTION_IMPLIED_ACTION = Utils.resolveURI(this.ID_ACTION, "implied-action");

    /*
     * Section 10.2.7 Data-types
     */
    this.ID_DATATYPE_STRING = XACML.ID_DATATYPE_STRING;
    this.ID_DATATYPE_BOOLEAN = XACML.ID_DATATYPE_BOOLEAN;
    this.ID_DATATYPE_INTEGER = XACML.ID_DATATYPE_BOOLEAN;
    this.ID_DATATYPE_DOUBLE = XACML.ID_DATATYPE_DOUBLE;
    this.ID_DATATYPE_TIME = XACML.ID_DATATYPE_TIME;
    this.ID_DATATYPE_DATE = XACML.ID_DATATYPE_DATE;
    this.ID_DATATYPE_DATETIME = XACML.ID_DATATYPE_DATETIME;
    this.ID_DATATYPE_DAYTIMEDURATION = XACML.ID_DATATYPE_WD_DAYTIMEDURATION;
    this.ID_DATATYPE_YEARMONTHDURATION = XACML.ID_DATATYPE_WD_YEARMONTHDURATION;
    this.ID_DATATYPE_ANYURI = XACML.ID_DATATYPE_ANYURI;
    this.ID_DATATYPE_HEXBINARY = XACML.ID_DATATYPE_HEXBINARY;
    this.ID_DATATYPE_BASE64BINARY = XACML.ID_DATATYPE_BASE64BINARY;
    this.ID_DATATYPE = Utils.resolveURI(this.ID_XACML_1_0, XACML.DATA_TYPE);
    this.ID_DATATYPE_RFC822NAME = Utils.resolveURI(this.ID_DATATYPE, "rfc822Name");
    this.ID_DATATYPE_X500NAME = Utils.resolveURI(this.ID_DATATYPE, "x500Name");

    /*
     * Section 10.2.8 Functions
     */
    this.ID_FUNCTION_STRING_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "string-equal");
    this.ID_FUNCTION_BOOLEAN_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "boolean-equal");
    this.ID_FUNCTION_INTEGER_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "integer-equal");
    this.ID_FUNCTION_DOUBLE_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "double-equal");
    this.ID_FUNCTION_DATE_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "date-equal");
    this.ID_FUNCTION_TIME_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "time-equal");
    this.ID_FUNCTION_DATETIME_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "dateTime-equal");
    this.ID_FUNCTION_DAYTIMEDURATION_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-equal");
    this.ID_FUNCTION_YEARMONTHDURATION_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-equal");
    this.ID_FUNCTION_ANYURI_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "anyURI-equal");
    this.ID_FUNCTION_X500NAME_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "x500Name-equal");
    this.ID_FUNCTION_RFC822NAME_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-equal");
    this.ID_FUNCTION_HEXBINARY_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-equal");
    this.ID_FUNCTION_BASE64BINARY_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-equal");
    this.ID_FUNCTION_INTEGER_ADD = Utils.resolveURI(this.ID_FUNCTION, "integer-add");
    this.ID_FUNCTION_DOUBLE_ADD = Utils.resolveURI(this.ID_FUNCTION, "double-add");
    this.ID_FUNCTION_INTEGER_SUBTRACT = Utils.resolveURI(this.ID_FUNCTION, "integer-subtract");
    this.ID_FUNCTION_DOUBLE_SUBTRACT = Utils.resolveURI(this.ID_FUNCTION, "double-subtract");
    this.ID_FUNCTION_INTEGER_MULTIPLY = Utils.resolveURI(this.ID_FUNCTION, "integer-multiply");
    this.ID_FUNCTION_DOUBLE_MULTIPLY = Utils.resolveURI(this.ID_FUNCTION, "double-multiply");
    this.ID_FUNCTION_INTEGER_DIVIDE = Utils.resolveURI(this.ID_FUNCTION, "integer-divide");
    this.ID_FUNCTION_DOUBLE_DIVIDE = Utils.resolveURI(this.ID_FUNCTION, "double-divide");
    this.ID_FUNCTION_INTEGER_MOD = Utils.resolveURI(this.ID_FUNCTION, "integer-mod");
    this.ID_FUNCTION_INTEGER_ABS = Utils.resolveURI(this.ID_FUNCTION, "integer-abs");
    this.ID_FUNCTION_DOUBLE_ABS = Utils.resolveURI(this.ID_FUNCTION, "double-abs");
    this.ID_FUNCTION_ROUND = Utils.resolveURI(this.ID_FUNCTION, "round");
    this.ID_FUNCTION_FLOOR = Utils.resolveURI(this.ID_FUNCTION, "floor");
    this.ID_FUNCTION_STRING_NORMALIZE_SPACE = Utils.resolveURI(this.ID_FUNCTION, "string-normalize-space");
    this.ID_FUNCTION_STRING_NORMALIZE_TO_LOWER_CASE = Utils.resolveURI(this.ID_FUNCTION, "string-normalize-to-lower-case");
    this.ID_FUNCTION_DOUBLE_TO_INTEGER = Utils.resolveURI(this.ID_FUNCTION, "double-to-integer");
    this.ID_FUNCTION_INTEGER_TO_DOUBLE = Utils.resolveURI(this.ID_FUNCTION, "integer-to-double");
    this.ID_FUNCTION_OR = Utils.resolveURI(this.ID_FUNCTION, "or");
    this.ID_FUNCTION_AND = Utils.resolveURI(this.ID_FUNCTION, "and");
    this.ID_FUNCTION_N_OF = Utils.resolveURI(this.ID_FUNCTION, "n-of");
    this.ID_FUNCTION_NOT = Utils.resolveURI(this.ID_FUNCTION, "not");
    this.ID_FUNCTION_PRESENT = Utils.resolveURI(this.ID_FUNCTION, "present");
    this.ID_FUNCTION_INTEGER_GREATER_THAN = Utils.resolveURI(this.ID_FUNCTION, "integer-greater-than");
    this.ID_FUNCTION_INTEGER_GREATER_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "integer-greater-than-or-equal");
    this.ID_FUNCTION_INTEGER_LESS_THAN = Utils.resolveURI(this.ID_FUNCTION, "integer-less-than");
    this.ID_FUNCTION_INTEGER_LESS_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "integer-less-than-or-equal");
    this.ID_FUNCTION_DOUBLE_GREATER_THAN = Utils.resolveURI(this.ID_FUNCTION, "double-greater-than");
    this.ID_FUNCTION_DOUBLE_GREATER_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "double-greater-than-or-equal");
    this.ID_FUNCTION_DOUBLE_LESS_THAN = Utils.resolveURI(this.ID_FUNCTION, "double-less-than");
    this.ID_FUNCTION_DOUBLE_LESS_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "double-less-than-or-equal");
    this.ID_FUNCTION_DATETIME_ADD_DAYTIMEDURATION = Utils.resolveURI(this.ID_FUNCTION, "dateTime-add-dayTimeDuration");
    this.ID_FUNCTION_DATETIME_ADD_YEARMONTHDURATION = Utils.resolveURI(this.ID_FUNCTION, "dateTime-add-yearMonthDuration");
    this.ID_FUNCTION_DATETIME_SUBTRACT_DAYTIMEDURATION = Utils.resolveURI(this.ID_FUNCTION, "dateTime-subtract-dayTimeDuration");
    this.ID_FUNCTION_DATETIME_SUBTRACT_YEARMONTHDURATION = Utils.resolveURI(this.ID_FUNCTION, "dateTime-subtract-yearMonthDuration");
    this.ID_FUNCTION_DATE_ADD_YEARMONTHDURATION = Utils.resolveURI(this.ID_FUNCTION, "date-add-yearMonthDuration");
    this.ID_FUNCTION_DATE_SUBTRACT_YEARMONTHDURATION = Utils.resolveURI(this.ID_FUNCTION, "date-subtract-yearMonthDuration");
    this.ID_FUNCTION_STRING_GREATER_THAN = Utils.resolveURI(this.ID_FUNCTION, "string-greater-than");
    this.ID_FUNCTION_STRING_GREATER_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "string-greater-than-or-equal");
    this.ID_FUNCTION_STRING_LESS_THAN = Utils.resolveURI(this.ID_FUNCTION, "string-less-than");
    this.ID_FUNCTION_STRING_LESS_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "string-less-than-or-equal");
    this.ID_FUNCTION_TIME_GREATER_THAN = Utils.resolveURI(this.ID_FUNCTION, "time-greater-than");
    this.ID_FUNCTION_TIME_GREATER_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "time-greater-than-or-equal");
    this.ID_FUNCTION_TIME_LESS_THAN = Utils.resolveURI(this.ID_FUNCTION, "time-less-than");
    this.ID_FUNCTION_TIME_LESS_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "time-less-than-or-equal");
    this.ID_FUNCTION_DATETIME_GREATER_THAN = Utils.resolveURI(this.ID_FUNCTION, "dateTime-greater-than");
    this.ID_FUNCTION_DATETIME_GREATER_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "dateTime-greater-than-or-equal");
    this.ID_FUNCTION_DATETIME_LESS_THAN = Utils.resolveURI(this.ID_FUNCTION, "dateTime-less-than");
    this.ID_FUNCTION_DATETIME_LESS_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "dateTime-less-than-or-equal");
    this.ID_FUNCTION_DATE_GREATER_THAN = Utils.resolveURI(this.ID_FUNCTION, "date-greater-than");
    this.ID_FUNCTION_DATE_GREATER_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "date-greater-than-or-equal");
    this.ID_FUNCTION_DATE_LESS_THAN = Utils.resolveURI(this.ID_FUNCTION, "date-less-than");
    this.ID_FUNCTION_DATE_LESS_THAN_OR_EQUAL = Utils.resolveURI(this.ID_FUNCTION, "date-less-than-or-equal");
    this.ID_FUNCTION_STRING_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "string-one-and-only");
    this.ID_FUNCTION_STRING_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "string-bag-size");
    this.ID_FUNCTION_STRING_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "string-is-in");
    this.ID_FUNCTION_STRING_BAG = Utils.resolveURI(this.ID_FUNCTION, "string-bag");
    this.ID_FUNCTION_BOOLEAN_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "boolean-one-and-only");
    this.ID_FUNCTION_BOOLEAN_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "boolean-bag-size");
    this.ID_FUNCTION_BOOLEAN_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "boolean-is-in");
    this.ID_FUNCTION_BOOLEAN_BAG = Utils.resolveURI(this.ID_FUNCTION, "boolean-bag");
    this.ID_FUNCTION_INTEGER_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "integer-one-and-only");
    this.ID_FUNCTION_INTEGER_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "integer-bag-size");
    this.ID_FUNCTION_INTEGER_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "integer-is-in");
    this.ID_FUNCTION_INTEGER_BAG = Utils.resolveURI(this.ID_FUNCTION, "integer-bag");
    this.ID_FUNCTION_DOUBLE_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "double-one-and-only");
    this.ID_FUNCTION_DOUBLE_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "double-bag-size");
    this.ID_FUNCTION_DOUBLE_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "double-is-in");
    this.ID_FUNCTION_DOUBLE_BAG = Utils.resolveURI(this.ID_FUNCTION, "double-bag");
    this.ID_FUNCTION_TIME_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "time-one-and-only");
    this.ID_FUNCTION_TIME_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "time-bag-size");
    this.ID_FUNCTION_TIME_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "time-is-in");
    this.ID_FUNCTION_TIME_BAG = Utils.resolveURI(this.ID_FUNCTION, "time-bag");
    this.ID_FUNCTION_DATE_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "date-one-and-only");
    this.ID_FUNCTION_DATE_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "date-bag-size");
    this.ID_FUNCTION_DATE_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "date-is-in");
    this.ID_FUNCTION_DATE_BAG = Utils.resolveURI(this.ID_FUNCTION, "date-bag");
    this.ID_FUNCTION_DATETIME_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "dateTime-one-and-only");
    this.ID_FUNCTION_DATETIME_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "dateTime-bag-size");
    this.ID_FUNCTION_DATETIME_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "dateTime-is-in");
    this.ID_FUNCTION_DATETIME_BAG = Utils.resolveURI(this.ID_FUNCTION, "dateTime-bag");
    this.ID_FUNCTION_ANYURI_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "anyURI-one-and-only");
    this.ID_FUNCTION_ANYURI_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "anyURI-bag-size");
    this.ID_FUNCTION_ANYURI_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "anyURI-is-in");
    this.ID_FUNCTION_ANYURI_BAG = Utils.resolveURI(this.ID_FUNCTION, "anyURI-bag");
    this.ID_FUNCTION_HEXBINARY_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-one-and-only");
    this.ID_FUNCTION_HEXBINARY_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-bag-size");
    this.ID_FUNCTION_HEXBINARY_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-is-in");
    this.ID_FUNCTION_HEXBINARY_BAG = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-bag");
    this.ID_FUNCTION_BASE64BINARY_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-one-and-only");
    this.ID_FUNCTION_BASE64BINARY_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-bag-size");
    this.ID_FUNCTION_BASE64BINARY_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-is-in");
    this.ID_FUNCTION_BASE64BINARY_BAG = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-bag");
    this.ID_FUNCTION_DAYTIMEDURATION_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-one-and-only");
    this.ID_FUNCTION_DAYTIMEDURATION_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-bag-size");
    this.ID_FUNCTION_DAYTIMEDURATION_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-is-in");
    this.ID_FUNCTION_DAYTIMEDURATION_BAG = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-bag");
    this.ID_FUNCTION_YEARMONTHDURATION_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-one-and-only");
    this.ID_FUNCTION_YEARMONTHDURATION_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-bag-size");
    this.ID_FUNCTION_YEARMONTHDURATION_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-is-in");
    this.ID_FUNCTION_YEARMONTHDURATION_BAG = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-bag");
    this.ID_FUNCTION_X500NAME_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "x500Name-one-and-only");
    this.ID_FUNCTION_X500NAME_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "x500Name-bag-size");
    this.ID_FUNCTION_X500NAME_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "x500Name-is-in");
    this.ID_FUNCTION_X500NAME_BAG = Utils.resolveURI(this.ID_FUNCTION, "x500Name-bag");
    this.ID_FUNCTION_RFC822NAME_ONE_AND_ONLY = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-one-and-only");
    this.ID_FUNCTION_RFC822NAME_BAG_SIZE = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-bag-size");
    this.ID_FUNCTION_RFC822NAME_IS_IN = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-is-in");
    this.ID_FUNCTION_RFC822NAME_BAG = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-bag");
    this.ID_FUNCTION_ANY_OF = Utils.resolveURI(this.ID_FUNCTION, "any-of");
    this.ID_FUNCTION_ALL_OF = Utils.resolveURI(this.ID_FUNCTION, "all-of");
    this.ID_FUNCTION_ANY_OF_ANY = Utils.resolveURI(this.ID_FUNCTION, "any-of-any");
    this.ID_FUNCTION_ALL_OF_ANY = Utils.resolveURI(this.ID_FUNCTION, "all-of-any");
    this.ID_FUNCTION_ANY_OF_ALL = Utils.resolveURI(this.ID_FUNCTION, "any-of-all");
    this.ID_FUNCTION_ALL_OF_ALL = Utils.resolveURI(this.ID_FUNCTION, "all-of-all");
    this.ID_FUNCTION_MAP = Utils.resolveURI(this.ID_FUNCTION, "map");
    this.ID_FUNCTION_X500NAME_MATCH = Utils.resolveURI(this.ID_FUNCTION, "x500Name-match");
    this.ID_FUNCTION_RFC822NAME_MATCH = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-match");
    this.ID_FUNCTION_STRING_REGEXP_MATCH = Utils.resolveURI(this.ID_FUNCTION, "string-regexp-match");
    // the following xpath-node functions are optional in 3.0 and are NOT included in this implementation. See
    // the Implementation Notes.
    // this.ID_FUNCTION_XPATH_NODE_COUNT = Utils.resolveURI(this.ID_FUNCTION, // "xpath-node-count");
    // this.ID_FUNCTION_XPATH_NODE_EQUAL = Utils.resolveURI(this.ID_FUNCTION, // "xpath-node-equal");
    // this.ID_FUNCTION_XPATH_NODE_MATCH = Utils.resolveURI(this.ID_FUNCTION, // "xpath-node-match");
    this.ID_FUNCTION_STRING_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "string-intersection");
    this.ID_FUNCTION_STRING_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "string-at-least-one-member-of");
    this.ID_FUNCTION_STRING_UNION = Utils.resolveURI(this.ID_FUNCTION, "string-union");
    this.ID_FUNCTION_STRING_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "string-subset");
    this.ID_FUNCTION_STRING_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "string-set-equals");
    this.ID_FUNCTION_BOOLEAN_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "boolean-intersection");
    this.ID_FUNCTION_BOOLEAN_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "boolean-at-least-one-member-of");
    this.ID_FUNCTION_BOOLEAN_UNION = Utils.resolveURI(this.ID_FUNCTION, "boolean-union");
    this.ID_FUNCTION_BOOLEAN_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "boolean-subset");
    this.ID_FUNCTION_BOOLEAN_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "boolean-set-equals");
    this.ID_FUNCTION_INTEGER_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "integer-intersection");
    this.ID_FUNCTION_INTEGER_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "integer-at-least-one-member-of");
    this.ID_FUNCTION_INTEGER_UNION = Utils.resolveURI(this.ID_FUNCTION, "integer-union");
    this.ID_FUNCTION_INTEGER_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "integer-subset");
    this.ID_FUNCTION_INTEGER_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "integer-set-equals");
    this.ID_FUNCTION_DOUBLE_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "double-intersection");
    this.ID_FUNCTION_DOUBLE_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "double-at-least-one-member-of");
    this.ID_FUNCTION_DOUBLE_UNION = Utils.resolveURI(this.ID_FUNCTION, "double-union");
    this.ID_FUNCTION_DOUBLE_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "double-subset");
    this.ID_FUNCTION_DOUBLE_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "double-set-equals");
    this.ID_FUNCTION_TIME_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "time-intersection");
    this.ID_FUNCTION_TIME_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "time-at-least-one-member-of");
    this.ID_FUNCTION_TIME_UNION = Utils.resolveURI(this.ID_FUNCTION, "time-union");
    this.ID_FUNCTION_TIME_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "time-subset");
    this.ID_FUNCTION_TIME_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "time-set-equals");
    this.ID_FUNCTION_DATE_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "date-intersection");
    this.ID_FUNCTION_DATE_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "date-at-least-one-member-of");
    this.ID_FUNCTION_DATE_UNION = Utils.resolveURI(this.ID_FUNCTION, "date-union");
    this.ID_FUNCTION_DATE_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "date-subset");
    this.ID_FUNCTION_DATE_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "date-set-equals");
    this.ID_FUNCTION_DATETIME_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "dateTime-intersection");
    this.ID_FUNCTION_DATETIME_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "dateTime-at-least-one-member-of");
    this.ID_FUNCTION_DATETIME_UNION = Utils.resolveURI(this.ID_FUNCTION, "dateTime-union");
    this.ID_FUNCTION_DATETIME_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "dateTime-subset");
    this.ID_FUNCTION_DATETIME_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "dateTime-set-equals");
    this.ID_FUNCTION_ANYURI_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "anyURI-intersection");
    this.ID_FUNCTION_ANYURI_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "anyURI-at-least-one-member-of");
    this.ID_FUNCTION_ANYURI_UNION = Utils.resolveURI(this.ID_FUNCTION, "anyURI-union");
    this.ID_FUNCTION_ANYURI_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "anyURI-subset");
    this.ID_FUNCTION_ANYURI_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "anyURI-set-equals");
    this.ID_FUNCTION_HEXBINARY_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-intersection");
    this.ID_FUNCTION_HEXBINARY_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-at-least-one-member-of");
    this.ID_FUNCTION_HEXBINARY_UNION = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-union");
    this.ID_FUNCTION_HEXBINARY_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-subset");
    this.ID_FUNCTION_HEXBINARY_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "hexBinary-set-equals");
    this.ID_FUNCTION_BASE64BINARY_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-intersection");
    this.ID_FUNCTION_BASE64BINARY_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-at-least-one-member-of");
    this.ID_FUNCTION_BASE64BINARY_UNION = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-union");
    this.ID_FUNCTION_BASE64BINARY_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-subset");
    this.ID_FUNCTION_BASE64BINARY_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "base64Binary-set-equals");
    this.ID_FUNCTION_DAYTIMEDURATION_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-intersection");
    this.ID_FUNCTION_DAYTIMEDURATION_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-at-least-one-member-of");
    this.ID_FUNCTION_DAYTIMEDURATION_UNION = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-union");
    this.ID_FUNCTION_DAYTIMEDURATION_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-subset");
    this.ID_FUNCTION_DAYTIMEDURATION_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "dayTimeDuration-set-equals");
    this.ID_FUNCTION_YEARMONTHDURATION_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-intersection");
    this.ID_FUNCTION_YEARMONTHDURATION_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-at-least-one-member-of");
    this.ID_FUNCTION_YEARMONTHDURATION_UNION = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-union");
    this.ID_FUNCTION_YEARMONTHDURATION_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-subset");
    this.ID_FUNCTION_YEARMONTHDURATION_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "yearMonthDuration-set-equals");
    this.ID_FUNCTION_X500NAME_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "x500Name-intersection");
    this.ID_FUNCTION_X500NAME_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "x500Name-at-least-one-member-of");
    this.ID_FUNCTION_X500NAME_UNION = Utils.resolveURI(this.ID_FUNCTION, "x500Name-union");
    this.ID_FUNCTION_X500NAME_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "x500Name-subset");
    this.ID_FUNCTION_X500NAME_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "x500Name-set-equals");
    this.ID_FUNCTION_RFC822NAME_INTERSECTION = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-intersection");
    this.ID_FUNCTION_RFC822NAME_AT_LEAST_ONE_MEMBER_OF = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-at-least-one-member-of");
    this.ID_FUNCTION_RFC822NAME_UNION = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-union");
    this.ID_FUNCTION_RFC822NAME_SUBSET = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-subset");
    this.ID_FUNCTION_RFC822NAME_SET_EQUALS = Utils.resolveURI(this.ID_FUNCTION, "rfc822Name-set-equals");

    /*
     * TODO: Declare all of the XML elements and attributes in use
     */

    /*
     * Profiles
     */
    this.ID_PROFILES = Utils.resolveURI(this.ID_XACML_1_0, XACML.PROFILES);
    this.ID_PROFILE = Utils.resolveURI(this.ID_XACML_1_0, XACML.PROFILE);

    /*
     * SAML 2.0 Profile of XACML, Version 2.0
     */
    this.ID_PROFILE_SAML2_0_V2 = Utils.resolveURI(this.ID_PROFILE, "saml2.0:v2");
    this.ID_PROFILE_SAML2_0_V2_POLICIES = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "policies");
    this.ID_PROFILE_SAML2_0_V2_ADVICESAML = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "adviceSAML");
    this.ID_PROFILE_SAML2_0_V2_AUTHZTOKEN = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "authzToken");
    this.ID_PROFILE_SAML2_0_V2_ATTRS_ALL = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "attrs:all");
    this.ID_PROFILE_SAML2_0_V2_SOAP = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "SOAP");
    this.ID_PROFILE_SAML2_0_V2_SOAP_AUTHZQUERY = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_SOAP, "authzQuery");
    this.ID_PROFILE_SAML2_0_V2_SOAP_ATTRASSERTION = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_SOAP, "attrAssertion");
    this.ID_PROFILE_SAML2_0_V2_AUTHZDECISION = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "authzDecision");
    this.ID_PROFILE_SAML2_0_V2_AUTHZDECISION_NOPOLICIES = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_AUTHZDECISION, "noPolicies");
    this.ID_PROFILE_SAML2_0_V2_AUTHZDECISION_WITHPOLICIES = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_AUTHZDECISION, "withPolicies");
    this.ID_PROFILE_SAML2_0_V2_AUTHZDECISIONWSTRUST = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "authzDecisionWSTrust");
    this.ID_PROFILE_SAML2_0_V2_AUTHZDECISIONWSTRUST_WITHPOLICIES = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_AUTHZDECISIONWSTRUST, "withPolicies");
    this.ID_PROFILE_SAML2_0_V2_AUTHZDECISIONWSTRUST_NOPOLICIES = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_AUTHZDECISIONWSTRUST, "noPolicies");
    this.ID_PROFILE_SAML2_0_V2_SCHEMA = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2, "schema");
    this.ID_PROFILE_SAML2_0_V2_SCHEMA_ASSERTION = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_SCHEMA, "assertion");
    this.ID_PROFILE_SAML2_0_V2_SCHEMA_PROTOCOL = Utils.resolveURI(this.ID_PROFILE_SAML2_0_V2_SCHEMA, "protocol");

    /*
     * XACML Profile for Role Based Access Control (RBAC) Version 1.0
     */
    this.ID_PROFILES_RBAC_CORE_HIERARCHICAL = Utils.resolveURI(this.ID_PROFILES, "rbac:core-hierarchical");
});