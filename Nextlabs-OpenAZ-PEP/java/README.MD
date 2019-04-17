# Nextlabs OpenAZ PEP Java SDK


## Introduction

---

This document provides a quick guidance on how to use NextLabs OpenAZ SDK to construct and send a request to a NextLabs Java 
Policy Controller REST Interface and how to process its response.

## Getting Started

---

1. Download the Nextlabs-OpenAZ-PEP-xx.zip
2. Unzip the downloaded package
3. Open the unziped folder and goto java folder, which has the required binaries and samples for java api
   * `nextlabs-openaz-pep.jar` - SDK library file
   * `libs` folder has all the dependancies for the SDK
   * `sample_code` has sample java file and sample configuration file
4. JDK 1.7+ is required

### Create a Sample Client

---

1. Create a java project using your favorite IDE
2. Add `nextlabs-openaz-pep.jar` and other provided sdk dependancy jars to your classpath
3. Create a java class or copy the Java sample from the provided sample_code
4. Required imports

  ```java
  import java.util.Properties;

  import org.apache.openaz.pepapi.Action;
  import org.apache.openaz.pepapi.PepAgent;
  import org.apache.openaz.pepapi.PepAgentFactory;
  import org.apache.openaz.pepapi.PepResponse;
  import org.apache.openaz.pepapi.Resource;
  import org.apache.openaz.pepapi.Subject;
  import org.apache.openaz.pepapi.std.StdPepAgentFactory;
  import org.apache.openaz.xacml.util.XACMLProperties;

  import com.nextlabs.openaz.pepapi.Application;
  import com.nextlabs.openaz.utils.Constants;
  ```
5. Following property configuration is required to connect with remote PDP

  ```java
  Properties xacmlProperties = new Properties();

  //The host of REST PDP server (Java Policy Controller)
  xacmlProperties.setProperty(Constants.PDP_REST_HOST, "<pdp_rest_host>");

  // The port on which the REST Service is listening on the server
  xacmlProperties.setProperty(Constants.PDP_REST_PORT, "443");

  // Whether the REST Service is over https (true or false)
  xacmlProperties.setProperty(Constants.PDP_REST_HTTPS, "true");

  // The authentication settings to connect to the REST Service (valid values: NONE, OAUTH2)
  xacmlProperties.setProperty(Constants.PDP_REST_AUTH_TYPE, "OAUTH2");

  // The Oauth2 Authoriztion Grant Type (currently valid values: client_credentials, default is client_credentials)
  xacmlProperties.setProperty(Constans.PDP_REST_OAUTH2_TOKEN_GRANT_TYPE, "client_credentials");

  // The Client ID when using Oauth2 Client Credentials Grant
  xacmlProperties.setProperty(Constants.PDP_REST_OAUTH2_CLIENT_ID, "<CLIENT_ID>");

  // The Client Secret when using Oauth2 Client Credentials Grant
  xacmlProperties.setProperty(Constants.PDP_REST_OAUTH2_CLIENT_SECRET, "<CLIENT_SECRET>");

  // PDP EngineFactory class, do no need to change this value
  xacmlProperties.setProperty(XACMLProperties.PROP_PDPENGINEFACTORY, "com.nextlabs.openaz.pdp.PDPEngineFactoryImpl");

  // Client will connect to server using provided REST based PDP engine, set to "com.nextlabs.openaz.pdp.RestPDPEngine"
  xacmlProperties.setProperty(Constants.ENGINE_NAME, "com.nextlabs.openaz.pdp.RestPDPEngine");

  // Mapper classes are being used for internal mappings, no need to change# Mapper classes used internally, no need to change
  xacmlProperties.setProperty("pep.mapper.classes",
    "com.nextlabs.openaz.pepapi.RecipientMapper,com.nextlabs.openaz.pepapi.DiscretionaryPoliciesMapper,com.nextlabs.openaz.pepapi.HostMapper,com.nextlabs.openaz.pepapi.ApplicationMapper");  
  ```

6. Initialize the PEP Agent

  ```java
  PepAgentFactory pepAgentFactory = new StdPepAgentFactory(xacmlProperties);
  PepAgent pepAgent = pepAgentFactory.getPepAgent();
  ```

7. Create a Subject

  ```java
  Subject user = Subject.newInstance("amilasilva");
  user.addAttribute("citizenship", "USA"); // add attribute to subject
  ```

8. Create an Action

  ```java
  Action action = Action.newInstance("OPEN"); // Action instance containing a single action
  ```

9. Create a Resource
  
  For a resource, a mandatory attribute is "urn:nextlabs:names:evalsvc:1.0:resource:resource-type". The value should be the Policy Model's short name.
  There's a Constant class: `com.nextlabs.openaz.utils.Constants` which contains the attribute key as `ID_RESOURCE_RESOURCE_TYPE`.

  ```java
  Resource resource = Resource.newInstance("Sample.doc");
  resource.addAttribute(Constants.ID_RESOURCE_RESOURCE_TYPE.stringValue(), "support_tickets");
  resource.addAttribute("classification", "secret"); // add attribute to resource
  ```

10. Create an Application

  ```java
  Application application = Application.newInstance("dummyApp");
  ```

11. Create an Environment

  ```java
  Environment environment = Environment.newInstance();
  environment.addAttribute("classification", "secret");
  ```

12. Make a single authorizaiton request using above categories

  ```java
  // pepAgent.decide(Object... objects); Order of parameters doesn't matter
  // only user, action, resource is mandatory, application and environment are optional
  PepResponse pepResponse = pepAgent.decide(user, action, resource, application, environment);
  ```

#### Complete REST sample client java

---

```java
import java.util.Properties;

import org.apache.openaz.pepapi.Action;
import org.apache.openaz.pepapi.PepAgent;
import org.apache.openaz.pepapi.PepAgentFactory;
import org.apache.openaz.pepapi.PepResponse;
import org.apache.openaz.pepapi.Resource;
import org.apache.openaz.pepapi.Subject;
import org.apache.openaz.pepapi.std.StdPepAgentFactory;
import org.apache.openaz.xacml.util.XACMLProperties;

import com.nextlabs.openaz.pepapi.Application;
import com.nextlabs.openaz.utils.Constants;

public class RestSampleClient {

  public static void main(String[] args) {
    Properties xacmlProperties = new Properties();

    //The host of REST PDP server (Java Policy Controller)
    xacmlProperties.setProperty(Constants.PDP_REST_HOST, "jpc-cloud.platform.nextlabs.solutions");

    // The port on which the REST Service is listening on the server
    xacmlProperties.setProperty(Constants.PDP_REST_PORT, "443");

    // Whether the REST Service is over https (true or false)
    xacmlProperties.setProperty(Constants.PDP_REST_HTTPS, "true");

    // The authentication settings to connect to the REST Service (valid values: NONE, OAUTH2)
    xacmlProperties.setProperty(Constants.PDP_REST_AUTH_TYPE, "OAUTH2");

    // The Oauth2 Authoriztion Grant Type (currently valid values: client_credentials, default is client_credentials)
    xacmlProperties.setProperty(Constans.PDP_REST_OAUTH2_TOKEN_GRANT_TYPE, "client_credentials");

    // The Client ID when using Oauth2 Client Credentials Grant
    xacmlProperties.setProperty(Constants.PDP_REST_OAUTH2_CLIENT_ID, "apiclient");

    // The Client Secret when using Oauth2 Client Credentials Grant
    xacmlProperties.setProperty(Constants.PDP_REST_OAUTH2_CLIENT_SECRET, "<CLIENT_SECRET>");

    // PDP EngineFactory class, do no need to change this value
    xacmlProperties.setProperty(XACMLProperties.PROP_PDPENGINEFACTORY, "com.nextlabs.openaz.pdp.PDPEngineFactoryImpl");

    // Client will connect to server using provided REST based PDP engine, set to "com.nextlabs.openaz.pdp.RestPDPEngine"
    xacmlProperties.setProperty(Constants.ENGINE_NAME, "com.nextlabs.openaz.pdp.RestPDPEngine");

    // Mapper classes are being used for internal mappings, no need to change# Mapper classes used internally, no need to change
    xacmlProperties.setProperty("pep.mapper.classes",
        "com.nextlabs.openaz.pepapi.RecipientMapper,com.nextlabs.openaz.pepapi.DiscretionaryPoliciesMapper,com.nextlabs.openaz.pepapi.HostMapper,com.nextlabs.openaz.pepapi.ApplicationMapper");

    PepAgentFactory pepAgentFactory = new StdPepAgentFactory(xacmlProperties);
    PepAgent pepAgent = pepAgentFactory.getPepAgent();

    Subject user = Subject.newInstance("App_user1");
    user.addAttribute("citizenship", "us");

    Action action = Action.newInstance("Open");

    Resource resource = Resource.newInstance("Sample.doc");
    resource.addAttribute(Constants.ID_RESOURCE_RESOURCE_TYPE.stringValue(), "support_tickets");
    resource.addAttribute("classification", "secret");

    PepResponse pepResponse = pepAgent.decide(user, action, resource);
    System.out.println("Allowed: " + pepResponse.allowed());
  }
}
```

### Create PEP Agent using externalized configuration file

---

1) create file with following properties

```ini
# The host of CloudAz server eg: saas-jpc.cloudaz.com
nextlabs.cloudaz.host=jpc-cloud.platform.nextlabs.solutions
# The port on which the CloudAz service is listening on the server
nextlabs.cloudaz.port=443
# Whether the CloudAz service is over https (true or false)
nextlabs.cloudaz.https=true
# The authentication settings to connect to the CloudAz service
# The authentication type (currently valid values: NONE, OAUTH2)
nextlabs.cloudaz.auth_type=OAUTH2
# The Oauth2 Authorization Grant Type (currently valid values: client_credentials, default is client_credentials)
nextlabs.cloudaz.oauth2.grant_type=client_credentials
# The Client ID when using Oauth2 Client Credentials Grant
nextlabs.cloudaz.oauth2.client_id=apiclient
# The Client Secret when using Oauth2 Client Credentials Grant
nextlabs.cloudaz.oauth2.client_secret=<CLIENT_SECRET>
# PDPEngineFactory class, no need to change this
xacml.pdpEngineFactory=com.nextlabs.openaz.pdp.PDPEngineFactoryImpl
# PDPEngine class, when using REST to connect to server, set to "com.nextlabs.openaz.pdp.RestPDPEngine"
nextlabs.pdp.engine.name=com.nextlabs.openaz.pdp.RestPDPEngine
# Mapper classes used internally, no need to change# Mapper classes used internally, no need to change
pep.mapper.classes=com.nextlabs.openaz.pepapi.RecipientMapper,com.nextlabs.openaz.pepapi.DiscretionaryPoliciesMapper,com.nextlabs.openaz.pepapi.HostMapper,com.nextlabs.openaz.pepapi.ApplicationMapper
```

2) Load configuration file from external path

  ```java
  import org.apache.openaz.pepapi.std.StdPepAgentFactory;
  import org.apache.openaz.pepapi.PepAgent;

  String configPath = "/path/to/propertiesFile";
  PepAgentFactory pepAgentFactory = new StdPepAgentFactory(configPath);
  PepAgent pepAgent = pepAgentFactory.getPepAgent();
  ```

## Response handling

---

`org.apache.openaz.pepapi.PepResponse` will receive the reponse returned by the PDP after evaluating the request based on the `decide()` or `builkDecide()` methods.

* Single decide will returns a corresponding single PepResponse

  ```java
  PepResponse pepResponse = pepAgent.decide(user, action, resource);
  ```

* Bulk decide will return a list of PepResponses

  ```java
  List<PepResponse> responses = pepAgent.bulkDecide(resources, user, action);
  ```

### Important methods in `PepResponse`

* pepResponse.allowed() - Returns the decision associated with the current result.
  * `true`: decision returned is Permit
  * `false`: decision returned is Deny
  * `throw PepException`: decision returned is Indeterminate or response is invalid.

* pepResponse.getObligations() - Return the set of `org.apache.openaz.pepapi.Obligation` s associated with the current result indexed by ObligationId.
  ```java
  Map<String, Obligation> obligationMap = pepResponse.getObligations();
  ```

* `org.apache.openaz.pepapi.Obligation` - This interface provides access to an Obligation object implementation that contains a set of zero  or more Attributes.
  * String getId() - Id for this Obligation.
  * Map<String, Object[]> getAttributeMap() - Returns a Map of Obligation Attribute name, object-value-array pairs, indexed by name, 
       where name is the AttributeId and the value is an array of one or more Object values of the `attribute`
       (where an array with length > 1 indicates a multi-valued attribute).



## Advanced Authorization Requests

---

Following methods are available to make a authorizaiton call.

* PepResponse decide(Object[] objects)

  decide method will makes a single authorizaiton call to PDP and return the reponse. A valid request
  should contain at least one Subject, one Action, and one Resource


* List<PepResponse> bulkDecide(List<?> associations, Object... paramArrayOfObject)

  bulkDecide method can be used to make a multiple authorization requests to the PDP using a single call to the server.

  * If a single subject performing a single action on multiple resources
        First argument should be list of resources and remainings would be subject, action, etc
  * If multiple subjects performing a single action on a single resource
        First argument should be list of subjects and remainings would be action, resource, etc

### Example : App_user1 is trying to open multiple files

---

```java
Subject user = Subject.newInstance("app_user1");
user.addAttribute("country", "USA");

Action action = Action.newInstance("Open");

List<Resource> resources = new ArrayList<Resource>();
Resource res1 = Resource.newInstance("Sample1.doc");
res1.addAttribute(Constants.ID_RESOURCE_RESOURCE_TYPE.stringValue(), "support_tickets");
Resource res2 = Resource.newInstance("Sample2.doc");
res2.addAttribute(Constants.ID_RESOURCE_RESOURCE_TYPE.stringValue(), "support_tickets");
Resource res3 = Resource.newInstance("Sample3.doc");
res3.addAttribute(Constants.ID_RESOURCE_RESOURCE_TYPE.stringValue(), "support_tickets");
resources.add(res1);
resources.add(res2);
resources.add(res3);

List<PepResponse> responses = pepAgent.bulkDecide(resources, user, action);

for(PepResponse res: responses) {
    System.out.println("Authorization decision: " + res.allowed());
}
```

### Available Request Categories

---

These classes represent the components in authorizaiton request, such as Subject, Action, Resource, etc. Following request categories
    are available for authorizaiton call
* OpenAZ provided categories
  * org.apache.openaz.pepapi.Action
  * org.apache.openaz.pepapi.Subject
  * org.apache.openaz.pepapi.Resource
  * org.apache.openaz.pepapi.Environment

* Nextlabs specific categories
  * com.nextlabs.openaz.pepapi.Application
  * com.nextlabs.openaz.pepapi.Host
  * com.nextlabs.openaz.pepapi.Recipient
  * com.nextlabs.openaz.pepapi.DiscretionaryPolicies



## NextLabs specific request categories

---

### Application

`com.nextlabs.openaz.pepapi.Application` represents the application from which the authorizaiton comes. Application doesn't support additional attributes.

### Host

`com.nextlabs.openaz.pepapi.Host` represents the host details of the authorizaiton request maker. IP address or hostname is required to make this category.
 Host doesn't support additional attributes.

```java
  // with hostname
  Host host = Host.newInstance("amlia.nextlabs.com");

  // with IP address - IP address in integer format
  Host host = Host.newInstance(12345454);
```

### Recipient

`com.nextlabs.openaz.pepapi.Recipient` represents the email recipient/s in authorizaiton request. Recipient supports additional attributes.
API requires `email` attribute as a name for a recipient email address. 

* Single recipient - Sending an email to single recipient with additional attributes

  ```java
  // create a sigle recipient with recipient id
  Recipient recipient = Recipient.newInstance("recipient_id");
  recipient.addAttribute("email", "amilasilva@nextlabs.com");
  recipient.addAttribute("country", "LK");
  ```

* Multiple recipients - Sending an email to multiple recipients

  ```java
  // create a recipient object with multiple recipients
  Recipient recipient = Recipient.newInstance("alex@gmail.com", "amilasilva@nextlabs.com", "user2@nextlabs.com");
  ```

### DiscretionaryPolicies

`com.nextlabs.openaz.pepapi.DiscretionaryPolicies` represents Nextlabs specific *Policy on Demand* feature. During the authorizaiton request PEP can send a
policy along with other request details and if wanted it can force to enforce only against this given policy otherwise it will evaluate against
this inline policy and deployed policies 

* DiscretionaryPolicies with a policy pql - Given policy always enforce along with other deployed policies

  ```java
  DiscretionaryPolicies discretinaryPolicy = DiscretionaryPolicies.newInstance(String policyPQL)
  ```

* DiscretionaryPolicies with a policy pql and ignorePDPPolicies flag - Given policy always enforce against the request and PDP deployed policies are being ignored

```java
  DiscretionaryPolicies discretinaryPolicy = DiscretionaryPolicies.newInstance(String policyPQL, boolean ignorePDPPolicies)
```
