import fhirClient from "./client/fhir";


const newPractitioner: fhir.Practitioner = {

    "resourceType": "Practitioner",
    "identifier": [
        {
            "system": "(http://canada.gov/cpn",
            "value": "51922"
        }
    ],
    "active": true,
    "name": [
        {
            "family": "Dellacroix",
            "given": [
                "Madeleine"
            ]
        }
    ],
    "telecom": [
        {
            "system": "phone",
            "value": "613-555-0192 "
        },
        {
            "system": "email",
            "value": "qcpamxms9dq@groupbuff.com"
        }
    ],
    "address": [
        {
            "line": [
                "3766 Papineau Avenue"
            ],
            "city": "Montreal",
            "state": "Quebec",
            "postalCode": "H2K 4J5",
            "country": "Canada"
        }
    ],
    "qualification": [
        {
            "code": {
                "coding": [
                    {
                        "system": "http://canada.gov/cpnq",
                        "code": "OB/GYN"
                    }
                ]
            }
        }
    ]
};

fhirClient.create({
    resourceType: 'Practitioner',
    body: newPractitioner,
}).then((data) => {
    var NewId = data.id;
    console.log("Id:" + NewId);
})
    .catch((error) => {
        var errorText = JSON.stringify(error);
        console.log(errorText)
    });