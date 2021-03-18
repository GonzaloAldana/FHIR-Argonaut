import fhirClient from "./client/fhir";


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