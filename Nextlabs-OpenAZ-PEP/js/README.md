# NextLabs OpenAz Quick Start

## Introduction

---

This document provides a quick guidance on how to use NextLabs OpenAZ API to construct and send a request to a NextLabs Java Policy Controller REST Interface and how to process its response.

## Installation

---
To use NextLabs OpenAZ in any client project

* Copy/clone the project to your local disk
* Specify NextLabs OpenAZ as a dependency in the Client project package.json using local path.

  ```javascript
  "dependencies": {
    "nextlabs-openaz":"path/to/project",
    ...other dependencies...
  }
  ```

* Install the module

  `npm install`

* To use the module

  ```javascript
  var nextlabsopenaz = require("nextlabs-openaz");
  ```

## Sample Client (details will be changed based on the sample policy)

NextLabs OpenAz comes with a sample client project to help developer quickly get started using the API. The client creates several sample requests and sends them to the Policy Controller and then processes the responses. The details of the request follows a pre-designed set of policies to ensure a specific evaluation results. Open the **Client.js** to start working with the client. 

The following section would provide step-by-step guide on the **Client.js** with code references. For full documentation of the API used, please refer to the **NextLabs OpenAz Documentation** below

First, the client needs to setup its dependencies.

```javascript
// NextLabs OpenAz API
var nextlabsopenaz = require("nextlabs-openaz");

// NextLabsPEPAgent
var NextLabsPEPAgent = nextlabsopenaz.NextLabsPEPAgent;

// Categories dependencies
var Subject = nextlabsopenaz.Subject;
var Resource = nextlabsopenaz.Resource;
var Action = nextlabsopenaz.Action;
var Application = nextlabsopenaz.Application;
var Environment = nextlabsopenaz.Environment;
var Host = nextlabsopenaz.Host;
var DiscretionaryPolicies = nextlabsopenaz.DiscretionaryPolicies;
var Recipient = nextlabsopenaz.Recipient;
var NamedAttribute = nextlabsopenaz.NamedAttribute;

// Response dependencies
var Obligation = nextlabsopenaz.Obligation;
var PEPResponse = nextlabsopenaz.PEPResponse;

```

Among the dependencies:

* The first dependency is the API itself.
* The second dependency is the NextLabs NodeJS implementation of the OpenAz interface called NextLabsPEPAgent. NextLabsPEPAgent provides methods for client to send request to the Policy Controller to get back the evaluation in return.
* *Categories dependencies* provides means to create different OpenAz objects to be passed in the request
* *Response dependencies* provides means to process the evaluation returned from the Policy Controller

Generally for a NextLabsOpenAz request, a Subject, a Resource and an Action are required. In other words, we want to allow or deny when someone (subject) is trying to do something (action) on something (resource).

In this client, we want to decide whether **John** can **EDIT** the document **C:/test.docx**.

First, we need to create a new Subject object.

```javascript
var mySubject = new Subject("John");
```

Then we create a new Resource object with resource type

```javascript
var resource = new Resource("C:/test.docx");
# for Resource, set the resource type is mandatory
resource.addAttribute(NextLabsXACML.ID_RESOURCE_RESOURCE_TYPE, "support_tickets");
```

Then we need to create the EDIT action

```javascript
var action = new Action("EDIT");
```

... to be finished

# NextLabs OpenAz Documentation

## Categories

---

OpenAz request is constructed from a number of objects called category. NextLabs OpenAz request supports the following categories:

* Subject
* Resource
* Action
* Application
* Host
* Environment
* Recipient
* DiscretionaryPolicies
* NamedAttribute

To use a category:

`<variable> = nextlabsopenaz.<category_name>`

For example, for subject:

```javascript
var Subject = nextlabsopenaz.Subject;
```

### Category

The following details apply to all categories.

#### Instantiate

To instantiate a new object of a category, some categories require no argument to be passed in the constructor while others do. Most of the cases the required argument would be the identifier of the object. Please refer to each category details below.

#### addAttribute(attributeId, value)

Adds a new attribute to the category object.

* `attributeId`: the identifier of the attribute, e.g. citizenship
* `value`: the value of the attribute

For example, to add a new attribute to a Subject object

```javascript
subject.addAttribute("attr","value");
```

#### getAttribute(attributeId)

Gets the value of the supplied attribute.

* `attributeId`: the identifier of the attribute

  ```javascript
  var value = subject.getAttribute("attr");
  ```

#### getAttributesMap()

Returns a map containing the attributes of the category object. 

### Details on each Category

This section gives more details on each category besides the general aforementioned details supported by all categories. 

#### Subject

To create a new subject category, an identifier is required.

```javascript
var subject = new Subject("john");
```


#### Resource

To create a new resource category, an identifier is required.

```javascript
var resource = new Resource("C:/text");
```

To set resource type (resource type should be the **policy model**'s short name. This attribute is **mandatory**.)

```javascript
resource.addAttribute(NextLabsXACML.ID_RESOURCE_RESOURCE_TYPE, "support_tickets")
```

A helper method is also provided for convenience:

```javascript
resource.setResourceType("support_tickets");
```

#### Action

To create a new action category, an identifier is required.

```javascript
var action = new Action("EDIT");
```

#### Application

To create a new application category, an identifier is required.

```javascript
var application = new Application("MSWord");
```

#### Environment

To create a new environment category, no identifier is required.

```javascript
var environment = new Environment();
```

#### NamedAttribute

To create a new named attribute, an identifier is required, which would be the name of the named attribute.

```javascript
var random = new NamedAttribute("random");
```

#### DiscretionaryPolicies (Policy on Demand)

To create a new policy on demand category, the policies should be passed in during the instantiation.

```javascript
var policy = new DiscretionaryPolicies("some policies");
```

#### Host

To create a new host category, several options are supported.

```javascript
// default localhost
var host = new Host();

// using host name
var host1 = new Host("MyHost");

// using inet address by providing an integer value of the IP address
var host2 = new Host(0x7f000001);
```

#### Recipient

To create a new recipient category, several options are supported

```javascript
// single recipient with id and email
var recipient = new Recipient("abc@gmail.com", "abc");

// multiple recipients with email addresses
var recipient2 = new Recipient("abc@gmail.com", "def@gmail.com");
```

## NextLabsPEPAgent

---

### Configure NextLabsPEPAgent

To use the agent

```javascript
var NextLabsPEPAgent = nextlabsopenaz.NextLabsPEPAgent;
```

To connect to NextLabs Java Policy Controller REST Interface, the following parameters are relevant:

#### Required

* nextlabs.cloudaz.host: the host of the machine where Nextlabs Policy Controller is installed
* nextlabs.cloudaz.auth_type: `NONE` or `OAUTH2`, default is `NONE`

#### Optional

* nextlabs.cloudaz.https: `true` or `false`, default is `false`
* nextlabs.cloudaz.port: if nextlabs.cloudaz.https is `true`, defaut if 443; if nextlabs.cloudaz.https is false, default is 58080
* nextlabs.cloudaz.resource_path: default is `/dpc/authorization/pdp`
* nextlabs.cloudaz.oauth2.grant_type: optional when authentication type is `OAUTH2`, valid and default value: `client_credentials`
* nextlabs.cloudaz.oauth2.client_id: required when authentication type is `OAUTH2` and nextlabs.cloudaz.oauth2.grant_type is `client_credentials`
* nextlabs.cloudaz.oauth2.client_secret: required when authentication type is `OAUTH2` and nextlabs.cloudaz.oauth2.grant_type is `client_credentials`

```javascript
var options = {
    "nextlabs.cloudaz.host":'my_host',
    "nextlabs.cloudaz.https": true,
    "nextlabs.cloudaz.port": "443",
    "nextlabs.cloudaz.auth_type": "OAUTH2",
    "nextlabs.cloudaz.oauth2.grant_type": "client_credentials",
    "nextlabs.cloudaz.oauth2.client_id": "<CLIENT_ID>",
    "nextlabs.cloudaz.oauth2.client_secret": "<CLIENT_SECRET>"
};

var agent = new NextLabsPEPAgent(options);
```

### Send Request to Policy Controller

#### decide()

Sends a single request

* Receives a dynamic list of categories and returns a promise.
* Returns a promise which would resolve to a single `PEPResponse` object.

```javascript
var promise = agent.decide(subject, resource, action);

promise.then(function(result) {
   // result is an object of PEPResponse
   // TODO process the response
}
```

##### Mandatory categories (at least one object of the category must be passed in)

* Subject
* Resource
* Action

If multiple objects of the same category are passed in, the request would ultimately have a single object of that category with the ID of the first object of that category and the combined list of attributes of all objects of that category. If two attributes have the same name, the latest value would be registered.

For example:

```javascript
var subject = new Subject("john");
var subject1 = new Subject("mark");
var subject2 = new Subject("jake");

subject.addAttribute("attr", "value");
subject1.addAttribute("attr1", "value1");
subject2.addAttribute("attr1", "value2");

agent.decide(subject, subject1, subject2, resource, action);
```

The above code would internally produce a subject category with the following attributes:

```javascript
{
    "subject-id": "john",
    "attr":"value",
    "attr1":"value2"
}
```

#### bulkDecide()

Sends a multi-query request

* Expects the first argument to be an array of objects of the multiple category (called associations), following by the rest of the category objects.
* Returns a promise which would resolve to an array of `PEPResponse` objects following the order of the associations.

```javascript
var promise = agent.bulkDecide([resource,resource1], subject, action);

promise.then(function(result) {
   result.forEach(function(r, index) {
      // r is an object of PEPResponse 
      // TODO process response
   });
});
```

## PEPResponse

---

#### allowed()

Returns a `boolean` value representing the decision of the evaluation.

* `true`: decision returned is `Permit`
* `false`: decision returned is `Deny`
* `Invalid response from PDP` _exception_: invalid response
* _Other exceptions_: decicion returned is `Indeterminate` with message

#### getObigations()

Returns a `Map` containing the obligations returned by the Policy Controller.

```javascript
var promise = agent.decide(subject, resource, action);

promise.then(function(result) {
   var obligations = result.getObligations();
   obligations.forEach(function(obl, id) {
       //obl is an object of Obligation
       // TODO process obligation
   });
}
```

#### getWrappedResult()

Returns the raw object representing the response.

## Obligation

---

#### getId() 

Returns the obligation id

#### getAttributeMap()

Returns a `Map` containing the attributes of the obligation.

```javascript
var attributeMap = obl.getAttributeMap();
attributeMap.forEach(function(value, key) {
    //TODO process attribute 
});
```
