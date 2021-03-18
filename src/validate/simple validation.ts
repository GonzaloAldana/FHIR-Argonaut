import axios from 'axios';
import fs from 'fs';
var path = require('path');

// You need to copy the XML file to the build folder


var contents = fs.readFileSync(path.join(__dirname, '../', '/FHIR_RESOURCES/PATIENT.XML'), 'utf8');
var urlFHIREndpoint = 'http://fhir.hl7fundamentals.org/r4';
var urlFHIREndpoint = 'http://fhir.hl7fundamentals.org/r4';
var ResourceClass = "Patient";
var OperationName = "$validate";
var FullURL = urlFHIREndpoint + "/" + ResourceClass + "/" + OperationName;


function validateXMLPatiend() {
  //We call the FHIR endpoint with our parameters
  axios.post(
    FullURL, contents,
    {
      headers: {
        "Content-Type": "application/fhir+xml",
        "Accept": "application/fhir+json"
      }
    }
  )
    .then(response => {
      //We check the response status
      var data = response.data;
      { console.log(JSON.stringify(data)); }
    })
    //Any other problem, we failed
    .catch(error => {
      var message = error;
      console.log(message.response.data.text);
    });
}

export default validateXMLPatiend;