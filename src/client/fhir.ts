import Client from 'fhir-kit-client';

const authinfo = "user:password";
let buff = Buffer.from(authinfo);
let base64data = buff.toString('base64');


const fhirClient: Client = new Client({
    baseUrl: 'http://fhir.hl7fundamentals.org/r4',
    customHeaders: {
        "Content-Type": "application/fhir+json",
        "Accept": "application/fhir+json",
        "Authorization": "Basic " + base64data
    }
});

fhirClient.bearerToken = "prueba de token";

export default fhirClient;