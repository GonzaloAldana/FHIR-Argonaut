//Micro Assignment S 09 - Execute $everything on Patient 72191
//Neither fhir-kit-client nor any of the other JS libraries
//support extended operations ($operation) at the time
//of publishing this course.
//To achieve the same result, we resorted to use a 
//generic http library
//
import axios from 'axios';
var urlFHIREndpoint = 'http://fhir.hl7fundamentals.org/r4/';
var ResourceClass = 'Patient';
var ResourceId = '72191';
var Operation = '$everything';
var FullURL = urlFHIREndpoint + ResourceClass + "/" + ResourceId + "/" + Operation
var params =
{
    start: '2019-12-01',
    end: '2020-03-31'
}
function getExtendedOperations() {
    axios.get(FullURL,
        { params }
    )
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}
export default getExtendedOperations;