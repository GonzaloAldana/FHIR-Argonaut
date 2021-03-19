//Micro Assignment S 21 - Adding a contained asserter to an AllergyIntollerance resource
//

import fhirClient from "../client/fhir";

var pra: fhir.Practitioner = {

    "resourceType": "Practitioner",
    //Step 1: Set a valid XML ID for the resource
    "id": "MyPractitioner",
    "identifier": [{
        "system": "http://physicians-id.gov/physicians",
        "value": "8888888"
    }],
    "active": true,
    "name": [{
        "family": "Practitio",
        "given": [
            "Thomas"
        ]
    }],
    "telecom": [{
        "system": "phone",
        "value": "(555) 666-6777"
    },
    {
        "system": "email",
        "value": "practitio@everymail.com"
    },

    ],
    "address": [{
        "line": [
            "4321 Med Street"
        ],
        "city": "New York",
        "state": "NY",
        "postalCode": "90210",
        "country": "USA"
    }]
};



// Allergies

var almenarrative: fhir.Narrative = {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml">ALLERGY - MEDICATION - CRITICALITY -HIGH -PENICILLIN</div>'
};

// resource AllergyIntolerance: Allergy to Penicillin
var peni: fhir.AllergyIntolerance = {
    resourceType: "AllergyIntolerance",
    //Step 2: Include the contained resource in the contained element
    contained: [pra],
    type: "allergy",
    category: ['medication'],
    criticality: "high",
    patient: { reference: "Patient/123700", display: "Everywoman Eve" },
    code: { coding: [{ system: "http://snomed.info/sct.org", code: "373270004", display: "Substance with penicillin structure and antibacterial mechanism of action (substance)" }] },
    text: almenarrative,
    //Step 3: Reference the contained resource in an element
    asserter: { reference: "#" + pra.id },
    verificationStatus: 'unconfirmed'

};

fhirClient.create({
    resourceType: 'AllergyIntolerance',
    body: peni,
}).then((data) => {
    var NewId = data.id;
    console.log("Id:" + NewId);
})
    .catch((error) => {
        var errorText = JSON.stringify(error);
        console.log(errorText)
    });