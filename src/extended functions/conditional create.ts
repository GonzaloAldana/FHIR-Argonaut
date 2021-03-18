import axios from 'axios';

var urlFHIREndpoint = 'http://fhir.hl7fundamentals.org/r4/';
var ResourceClass = 'Practitioner';
var SearchParameters = 'identifier=http://central.practitioner.id/ident|77777';
var FullURL = urlFHIREndpoint + ResourceClass + "?" + SearchParameters;
const newPractitioner = { 'example': 'example' }

// insert if not exists
//We call the FHIR endpoint with our parameters
axios.put(FullURL, newPractitioner)
  .then(response => {
    //We check the response status
    var status = response.status;
    //201: Created    ,  200: OK (Found)
    if (status == 201) { console.log("Created " + response.data.id) }
    else { console.log("Existing " + response.data.id) }
  })
  //Any other problem, we failed, like in 412.Precondition Failed
  .catch(error => {
    console.log(error.response.statusText);
  });