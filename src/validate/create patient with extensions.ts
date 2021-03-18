//Micro Assignment S 18 - Populate the FHIR Argonaut extensions for the Patient resource

import fhirClient from "../client/fhir";

//This is our base patient, without extensions

var MyPatient: fhir.Patient = {
    resourceType: "Patient",
    identifier: [{
        use: "usual",
        type: {
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                code: "MR",
                display: "Medical Record Number"
            }],
            text: "Medical Record Number"
        },
        system: "http://hospital.smarthealthit.org",
        value: "1032702"
    }],
    active: true,
    name: [{
        family: "Shaw",
        given: [
            "Amy",
            "V."
        ]
    }],
    telecom: [{
        system: "phone",
        value: "555-555-5555",
        use: "home"
    },
    {
        system: "email",
        value: "amy.shaw@example.com"
    }
    ],
    gender: "female",
    birthDate: "2007-02-20",
    address: [{
        line: [
            "49 Meadow St"
        ],
        city: "Mounds",
        state: "OK",
        postalCode: "74047",
        country: "US"
    }]
};
//Here we create a simple extension for US-CORE-birthsex
var extBirthSex = {

    url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
    valueCode: "F"
};

//Here we create a complex extension for US-CORE Race   
var extRace = {
    url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
    extension: [{
        url: "ombCategory",
        valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: "2135-2",
            display: "Hispanic or Latino"
        }
    },
    {
        url: "detailed",
        valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: "2180-0",
            display: "Dominican"
        }
    },
    {
        url: "text",
        valueString: "Hispanic or Latino"
    }
    ]
};

//Here we create a complex extension for US-CORE Ethnicity 
var extEthnicity = {
    url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
    extension: [{
        url: "ombCategory",
        valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: "2135-2",
            display: "Hispanic or Latino"
        }
    },
    {
        url: "detailed",
        valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: "2180-0",
            display: "Dominican"
        }
    },
    {
        url: "detailed",
        valueCoding: {
            system: "urn:oid:2.16.840.1.113883.6.238",
            code: "2148-5",
            display: "Mexican"
        }
    },
    {
        url: "text",
        valueString: "Hispanic or Latino"
    }
    ]
};

//Here we create the extension element in our Patient resource, and add the extensions
MyPatient.extension = [];
MyPatient.extension.push(extRace);
MyPatient.extension.push(extEthnicity);
MyPatient.extension.push(extBirthSex);



//Saving the resource in our server to see how it comes back

fhirClient.create({
    resourceType: 'Patient',
    body: MyPatient,
}).then((data) => {
    var NewId = data.id;
    console.log(JSON.stringify(data));
})
    .catch((error) => {
        var errorText = JSON.stringify(error);
        console.log(errorText)
    });