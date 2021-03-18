import Client from "fhir-kit-client";


const authinfo = "user:password";
let buff = Buffer.from(authinfo);
let base64data = buff.toString('base64');

const fhirClient: Client = new Client({
    baseUrl: 'http://fhir.hl7fundamentals.org/r4',
    customHeaders: {
        "Authorization": "Basic " + base64data,
        "Content-Type": "application/fhir+json application/fhir+xml",
        "Accept": "application/fhir+json application/fhir+xml"
    }
});

fhirClient.bearerToken = "prueba de token";

fhirClient.read({
    resourceType: 'Patient',
    id: '17343',
}).then(data => console.log(data))
    .catch((err) => console.log(err));

fhirClient.vread({
    resourceType: 'Patient',
    id: '17343', version: '1',
}).then(data => console.log(data))
    .catch((err) => console.log(err));

fhirClient.resolve(
    { reference: 'http://fhir.hl7fundamentals.org/r4/Patient/17343' }).then(data => console.log(data))
    .catch((err) => console.log(err));

console.log('I am just a skeleton, so I do nothing!')