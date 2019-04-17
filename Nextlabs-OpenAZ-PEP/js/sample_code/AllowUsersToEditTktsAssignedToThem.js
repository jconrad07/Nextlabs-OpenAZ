"use strict";

/**
 * This is a sample request for user Chris Webber.
 * Chris Webber attributes are: 
 *     Subject_id (unique identifier) = chris.webber
 *     roles  = Support Representative, 
 *     assigned_prod_area  = Exchange Email, 
 *     Authorization Request is to Edit support tickets that belong to their product area
 *
 * support ticket(Resource) attributes are:
 *    Resource_id (unique identifier) = support_102
 *    prod_name = Exchange Email
 *     
 * This request should match with "Allow Support Representatives to Edit tickets that are in their product area" policy and will
 *  result an allow.
 *     
 * @author Amila Silva
 *
 */
var assert = require('assert');
var nextlabsopenaz = require("nextlabs-openaz");
var NextLabsPEPAgent = nextlabsopenaz.NextLabsPEPAgent;
var PEPResponse = nextlabsopenaz.PEPResponse;
var Subject = nextlabsopenaz.Subject;
var Resource = nextlabsopenaz.Resource;
var Action = nextlabsopenaz.Action;
var Environment = nextlabsopenaz.Environment;
var XACML3 = nextlabsopenaz.XACML3;
var NextLabsXACML = nextlabsopenaz.NextLabsXACML;
var Decision = nextlabsopenaz.Decision;

/*
 * Setting up a pepagent, this involves establishing a secure connection
 * with PDP
 */
var openazProperties = require("./config/openaz-pep.json");
var agent =  new NextLabsPEPAgent(openazProperties);

/*
 * Build a Subject object with subject id(unique id for subject). This
 * will typically be a sid(windowsSid/unixId) or email. This is matched
 * up against the contents of the policies, is a vital part of policy
 * evaluation, and is thus required. Additional attributes can be
 * populated using addAttribute
 */
var user = new Subject("chris.webber@hdesk.com");
user.addAttribute("user_id", "chris.webber");
user.addAttribute("department", "IT");
user.addAttribute("roles", "Support Representative");
user.addAttribute("assigned_prod_area", "Exchange Email")

/*
 * Build an Action object with action short name, Action short name
 * should match with the action from respective policy model action.
 */
var action = new Action("EDIT_TKTS");

/*
 * Build a Resource object with resource id(This will typically be the
 * name of the resource e.g. ./foo.txt) and populate all the available
 * resource attributes
 */
var resource = new Resource("Ticket:1103");
resource.addAttribute(NextLabsXACML.ID_RESOURCE_RESOURCE_TYPE, "support_tickets")
resource.addAttribute("ticket_id", "1103");
resource.addAttribute("priority", "P0");
resource.addAttribute("severity", "Complete Loss of Service");
resource.addAttribute("prod_name", "Exchange Email");
resource.addAttribute("category", "Authentication");
resource.addAttribute("assigned_to", "homer.simpson");
resource.addAttribute("created_by", "barney.gumble");
resource.addAttribute("description", "Users are unable to login into email");

/*
 * Build a Environment object with environment attributes.
 */
var environment = new Environment();
environment.addAttribute("authentication_type", "multifactor");

/*
 * Submit the authorization request with subject, actions, resource and
 * application details to get the decision
 */
agent.decide(user, resource, action, environment).then(function(result) {
	assert(result instanceof PEPResponse);
  console.log("");
  console.log("***********************************************************************");
  console.log(" Matching Policy : Allow Users in IT to Edit and Reassign Tickets in their Product Area");
  console.log("-----------------------------------------------------------------------");
  console.log("    Subject attributes:");
  console.log("            subject-id : " + user.getAttribute(XACML3.ID_SUBJECT_SUBJECT_ID));
  user.getAttributesMap().forEach(function(value, key) {
    if(key != XACML3.ID_SUBJECT_SUBJECT_ID) {
      console.log("            " + key + " : " + value);
    }
  });
  console.log("");
  console.log("    Action  : " + action.getAttribute(XACML3.ID_ACTION_ACTION_ID));
  console.log("");
  console.log("    Resource attributes:");
  console.log("            resource-id : " + resource.getAttribute(XACML3.ID_RESOURCE_RESOURCE_ID));
  resource.getAttributesMap().forEach(function(value, key) {
    if(key != XACML3.ID_RESOURCE_RESOURCE_ID) {
      console.log("            " + key + " : " + value);
    }
  });
  console.log("");
  console.log("    Environment attributes:");
  environment.getAttributesMap().forEach(function(value, key) {
    console.log("            " + key + " : " + value);
  });
  console.log("");
  
  var decision = result.getWrappedResult().Decision;

  var effectValue = decision === Decision.PERMIT ? "Allow" : decision;
  
  console.log("    Response :"); 
  console.log("            Effect: " + effectValue + " ");

	var obligations = result.getObligations();

  if(obligations.size > 0) {
    console.log("            Obligations: ");
  }

  obligations.forEach(function(obligation, key) {
    console.log("                 " + key + ": ");

    var attributes = obligation.getAttributeMap();

    /*
     * Print each obligation's attributes as a key values
     */
    attributes.forEach(function(values, name) {
      console.log("                     " + name + ": " + values);
    });

    var ticketId = attributes.get('ticket_id')[0];
    var assignedTo = attributes.get('assigned_to')[0];
    var processedMsg = String(attributes.get('message')[0]).replace("${ticket_id}", ticketId).replace("${assigned_to}", assignedTo);
    console.log("                     updated message: " + processedMsg);
    console.log("               ");
  });

  console.log("               ");
  console.log("-----------------------------------------------------------------------");
  console.log("");
  console.log("");
}).catch(function(error) {
	console.log(error);
});