import fhirClient from "../client/fhir";

/*
[use] Official [Prefix] Ms. [Given] Eve [Family] Everywoman, [Suffix] III 
Photo: data (base64): iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgAAIAAAUAAXpeqz8=
Identifiers
[system] http://hospital.gov/patients [value] 9999999 (Medical Record Number)
[system] http://citizens-id.gov/citizens [value] 69999999-I (National Identifier)
Address: 9999 Patient Street, Ann Arbor, MI (90210), USA
Phone # : (777) 555-9999
e-mail Address: eve@everywoman.com
Gender: Female
Active: No
Deceased on: Feb 13, 2019 10:30:00
Marital Status: Widower
Born on: July 23, 1968
Preferred Language: English (USA). Also speaks Spanish
Organization in Charge: Ann Arbor General Hospital (www.aagh.org) – 9999 General Hospital Street, Ann Arbor, MI (90210), USA
Observation: Lab – Fasting Serum Glucose Value: 6,3 mmol/L, Jan 20 20 07:00:00 EST / LOINC Code: 14771-0 (http://loinc.org)


*/
var p: fhir.Patient = new Object;

p.resourceType = 'Patient';

p.identifier = [{
    use: "official",
    system: "http://citizens-id.gov/citizens",
    value: "69999999-I"
},
{
    system: "http://hospital.gov/patients",
    value: "9999999"
}
];

p.active = false;
p.name = [{
    use: "official",
    family: "Everywoman",
    given: [
        "Eve"
    ],
    prefix: [
        "Ms."
    ],
    suffix: [
        "III"
    ]
}];

p.telecom = [{
    system: "phone",
    value: "(777) 555-9999"
},
{
    system: "email",
    value: "eve@everywoman.com"
}
];

p.gender = "female";
p.birthDate = "1968-07-23";
p.deceasedDateTime = "2019-02-13T10:30:00-03:00";
p.address = [{
    line: [
        "9999 Patient Street"
    ],
    city: "Ann Arbor",
    state: "MI",
    postalCode: "90210",
    country: "USA"
}];
p.maritalStatus = {
    coding: [{
        system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
        code: "W"
    }]
};
p.photo = [{
    contentType: "application/jpeg",
    data: "aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBQzBsRVFWUjRuR05nQUFJQUFBVUFBWHBlcXo4PQ=="
}];
p.communication = [{
    language: {
        coding: [{
            system: "urn:ietf:bcp:47",
            code: "en-US"
        }]
    },
    preferred: true
},
{
    language: {
        coding: [{
            system: "urn:ietf:bcp:47",
            code: "en-US"
        }]
    },
    preferred: false
}
];
p.managingOrganization = {
    identifier: {
        system: "http://npi.org/identifiers",
        value: "999999"
    },
    display: "Ann Arbor General Hospital"
}
var DivNarrative =
    "<div xmlns='http://www.w3.org/1999/xhtml'>" +
    "Name:" + p.name[0].family + "," + p.name[0].given[0] + "<br/>" +
    "Identifier:" + p.identifier[0].system + "-" + p.identifier[0].value + "<br/>" +
    "Gender:" + p.gender + "<br/>" +
    "BirthDate:" + p.birthDate + "<br/>" +
    "Active:" + p.active + "<br/>" +
    "Managing Org:" + p.managingOrganization.display + "<br/>" +
    "Address:" + p.address[0].line[0] + " " +
    p.address[0].state + " " +
    p.address[0].city + " (" +
    p.address[0].postalCode + ") " +
    p.address[0].country +
    "<br/>" +
    "Telecom:" + p.telecom[0].system + "-" + p.telecom[0].value + "<br/>" +
    "</div>";

p.text = {
    status: "generated",
    div: DivNarrative
};

function createPatient() {
    fhirClient.create({
        resourceType: 'Patient',
        body: p,
    }).then((data: fhir.Patient) => {
        var NewId = data.id;
        console.log(data)
        var o: fhir.Observation = {} as fhir.Observation;
        o.status = 'registered';
        o.code = {};
        o.resourceType = "Observation";

        o.subject = {
            display: data.name[0].given[0] + " " + data.name[0].family,
            reference: "Patient/" + NewId
        };

        o.issued = "2020-01-20T07:00:00";
        o.valueQuantity = {
            value: 6.3,
            unit: "mmol/L",
            system: "http://unitsofmeasure.org/",
            code: "mmol/L"
        };
        o.code = {
            coding: [{
                system: "http://loinc.org",
                code: "14771-0",
                display: "Fasting Serum Glucose"
            }]

        };
        var NarrativeObs =
            "<div xmlns='http://www.w3.org/1999/xhtml'>" +
            "Code:" + o.code.coding[0].system + ":" + o.code.coding[0].code + ":" + o.code.coding[0].display + "<br/>" +
            "Value:" + o.valueQuantity.value + " " + o.valueQuantity.unit + "<br/>" +
            "Subject:" + o.subject.display + "<br/>" +
            "Issued:" + o.issued + "<br/>" +
            "</div>";

        o.text = {
            status: "generated",
            div: NarrativeObs
        };
        fhirClient.create({
            resourceType: 'Observation',
            body: o,
        }).then((dataO) => {
            console.log("Observation Id:" + dataO.id)
        })
            .catch((error) => {
                var errorText = JSON.stringify(error);
                console.log(errorText)
            })

    })
        .catch((error) => {
            var errorText = JSON.stringify(error);
            console.log(errorText)
        });
}

export default createPatient;