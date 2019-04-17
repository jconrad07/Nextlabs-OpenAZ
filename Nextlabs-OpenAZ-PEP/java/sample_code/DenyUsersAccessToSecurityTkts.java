import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.LogManager;

import org.apache.openaz.pepapi.Action;
import org.apache.openaz.pepapi.Environment;
import org.apache.openaz.pepapi.Obligation;
import org.apache.openaz.pepapi.PepAgent;
import org.apache.openaz.pepapi.PepAgentFactory;
import org.apache.openaz.pepapi.PepResponse;
import org.apache.openaz.pepapi.Resource;
import org.apache.openaz.pepapi.Subject;
import org.apache.openaz.pepapi.std.StdPepAgentFactory;
import org.apache.openaz.xacml.api.Decision;

import com.nextlabs.openaz.utils.Constants;


/**
 * This is a sample request for user Chris Webber.
 * Chris Webber attributes are: 
 *     Subject_id (unique identifier) = chris.webber
 *     department  = IT, 
 *	   role = Support Representative
 *     assigned_prod_area = Exchange Email
 *     Authorization Request is to access tickets categorized as Security vulnerability
 * Environment attributes are:
    authentication_type = multifactor
	
 * support ticket(Resource) attributes are:
 *    Resource_id (unique identifier) = Ticket:2206
 *    Description = Heartbleed critical patch update has not been applied
 *    assigned_to = homer.simpson
 *    created_by = barney.gumble
 *
 *  The result of this request is Deny. 
 *  CloudAz PDP matches this request "Deny access to Security Vulnerabilities if not Created By or Assigned To the User" 
 *     
 * @author Amila Silva
 *
 */
public class DenyUsersAccessToSecurityTkts {

	public static void main(String[] args) throws Exception {
		LogManager.getLogManager().reset();

		/*
		 * Setting up a pepagent, this involves establishing a secure connection
		 * with PDP
		 */
		String configPath = DenyUsersAccessToSecurityTkts.class.getResource("/openaz-pep.properties").toURI().getPath();
		PepAgentFactory pepAgentFactory = new StdPepAgentFactory(configPath);
		PepAgent pepAgent = pepAgentFactory.getPepAgent();

		/*
		 * Build a Subject object with subject id(unique id for subject). This
		 * will typically be a sid(windowsSid/unixId) or email. This is matched
		 * up against the contents of the policies, is a vital part of policy
		 * evaluation, and is thus required. Additional attributes can be
		 * populated using addAttribute
		 */

		Subject user = Subject.newInstance("chris.webber@hdesk.com");
		user.addAttribute("user_id", "chris.webber");
		user.addAttribute("department", "IT");
		user.addAttribute("roles", "Support Representative");
		user.addAttribute("assigned_prod_area", "Exchange Email");

		/*
		 * Build an Action object with action short name, Action short name
		 * should match with the action from respective policy model action.
		 */
		Action action = Action.newInstance("VIEW_TKTS");

		/*
		 * Build a Resource object with resource id(This will typically be the
		 * name of the resource e.g. ./foo.txt) and populate all the available
		 * resource attributes
		 */
		Resource resource = Resource.newInstance("Ticket:2206");
		resource.addAttribute(Constants.ID_RESOURCE_RESOURCE_TYPE.stringValue(), "support_tickets");
		resource.addAttribute("ticket_id", "2206");
		resource.addAttribute("priority", "P0");
		resource.addAttribute("severity", "Major Loss of Service");
		resource.addAttribute("prod_name", "Exchange Email");
		resource.addAttribute("category", "security");
		resource.addAttribute("assigned_to", "homer.simpson");
		resource.addAttribute("created_by", "barney.gumble");
		resource.addAttribute("description", "Heartbleed critical patch update has not been applied");

		/*
		 * Build a Environment object with environment attributes.
		 */
		Environment environment = Environment.newInstance();
		environment.addAttribute("authentication_type", "multifactor");
		
		/*
		 * Submit the authorization request with subject, actions, resource,
		 * application and environment details to get the decision
		 */
		PepResponse pepResponse = pepAgent.decide(user, action, resource, environment);

		System.out.println("");
		System.out.println("***********************************************************************");
		System.out.println(
				" Matching Policy : Deny access to Security Vulnerabilities if not Created By or Assigned To the User");
		System.out.println("-----------------------------------------------------------------------");
		System.out.println("    Subject attributes:");
		System.out.println("            subject-id : " + user.getSubjectIdValue());
		for (Map.Entry<String, Object[]> entry : user.getAttributeMap().entrySet()) {
			if (entry.getKey().equals(Subject.SUBJECT_ID_KEY))
				continue;
			System.out.println("            " + entry.getKey() + " : " + entry.getValue()[0]);
		}
		System.out.println("");

		System.out.println("    Action : " + action.getActionIdValue());
		System.out.println("");

		System.out.println("    Resource attributes: ");
		System.out.println("            resource-id : " + resource.getResourceIdValue());
		for (Map.Entry<String, Object[]> entry : resource.getAttributeMap().entrySet()) {
			if (entry.getKey().equals(Resource.RESOURCE_ID_KEY))
				continue;
			System.out.println("            " + entry.getKey() + " : " + entry.getValue()[0]);
		}
		System.out.println("");
		
		System.out.println("    Environment attributes: ");
		for (Map.Entry<String, Object[]> entry : environment.getAttributeMap().entrySet()) {
			System.out.println("            " + entry.getKey() + " : " + entry.getValue()[0]);
		}
		System.out.println("");

		/*
		 * pepResponse.allowed() will return a boolean value depending on NotApplicableBehavior set to pepConfig
		 * 
		 * To Get the direct response decision, use .getWrappedResult().getDecision()
		 */
		Decision decision = pepResponse.getWrappedResult().getDecision();
		String effectValue = (decision == Decision.PERMIT) ? "Allow" : decision.toString();
		
		System.out.println("    Response : ");
		System.out.println("            Effect: " + effectValue + " ");

		/*
		 * Following section will print all the obligations and its attributes
		 * if any obligations are available for the authorization request
		 * decision.
		 * 
		 */
		if (!pepResponse.getObligations().isEmpty()) {
			System.out.println("            Obligations: ");
			Iterator<Entry<String, Obligation>> obligationEntryIter = pepResponse.getObligations().entrySet()
					.iterator();

			while (obligationEntryIter.hasNext()) {
				Entry<String, Obligation> obligationEntry = obligationEntryIter.next();
				System.out.println("                 " + obligationEntry.getKey() + " : ");

				/*
				 * Print each obligation's attributes as a key values
				 */
				Map<String, Object[]> attributeMap = obligationEntry.getValue().getAttributeMap();
				Iterator<Entry<String, Object[]>> attrMapIter = attributeMap.entrySet().iterator();

				while (attrMapIter.hasNext()) {
					Entry<String, Object[]> attrMapEntry = attrMapIter.next();
					System.out.print("                  	  " + attrMapEntry.getKey() + ": ");
					for (int j = 0; j < attrMapEntry.getValue().length; j++) {
						System.out.print("\"" + attrMapEntry.getValue()[j] + "\"");
						if (j < attrMapEntry.getValue().length - 1) {
							System.out.print(", ");
						}
					}

					if (attrMapIter.hasNext()) {
						System.out.println(",");
					}
				}
				// System.out.print("] }");
				if (obligationEntryIter.hasNext()) {
					System.out.println(", ");
				}
				
				String message = "" + attributeMap.get("message")[0];
				String ticketId = "" + attributeMap.get("ticket_id")[0];
				String assignedTo = "" + attributeMap.get("assigned_to")[0];
				String updatedMsg = message.replace("${ticket_id}", ticketId).replace("${assigned_to}", assignedTo);
				System.out.println("\n                  	  updated message : " + updatedMsg);
			}
			System.out.println("");
			System.out.println("                ");
			System.out.println("              ");
		}

		System.out.println("-----------------------------------------------------------------------");
		System.out.println("");
		System.out.println("");

		// List<Resource> resources = new ArrayList<Resource>();
		// resources.add(Resource.newInstance("support_ticket1"));
		// resources.add(Resource.newInstance("support_ticket2"));
		// resources.add(Resource.newInstance("support_ticket3"));
		//
		// List<PepResponse> responses = pepAgent.bulkDecide(resources, user,
		// action, application);
		// for(PepResponse res: responses) {
		// System.out.println("\t Response [ Allowed: " + res.allowed() + " ]");
		// System.out.println("\t [ Obligations: " + res.allowed() + " ]");
		// }

	}

}
