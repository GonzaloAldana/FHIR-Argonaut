//Micro Assignment S 11 - CodeSystem Lookup
//Neither fhir-kit-client nor any of the other JS libraries
//support terminology operations
//at the time
//of publishing this course.
//To achieve the same result, we resorted to use a 
//generic http library
//
import axios from 'axios';
var urlFHIREndpoint = 'https://snowstorm-alpha.ihtsdotools.org/fhir/';
var ResourceClass = 'CodeSystem';
var OperationName = "$lookup"
var code = "73211009"
var system = "http://snomed.info/sct";
var Parameters = "code=" + code + "&" + "system=" + system;
var FullURL = urlFHIREndpoint + ResourceClass + "/" + OperationName + "?" + Parameters;

//We call the FHIR endpoint with our parameters
function validateCode(){
axios.get(FullURL)
    .then(response => {
        //We check the response status
        var data = response.data;
        { console.log(JSON.stringify(data)); }
    })
    //Any other problem, we failed
    .catch(error => {
        console.log(error);
    });
}

export default validateCode;