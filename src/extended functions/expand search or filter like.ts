import axios from 'axios';

var urlFHIREndpoint = 'https://snowstorm-alpha.ihtsdotools.org/fhir/';
var ResourceClass = 'ValueSet';
var OperationName = "$expand"
var url = "http://snomed.info/sct"
var filter = "";


//Search for all the concepts related to diabetes – 73211009 – (relationship: is-a).
/* var url= "http://snomed.info/sct?fhir_vs=isa/73211009" */



// Search for all the concepts in the General Practice Reference Set (450970008). Extra filter: pain.
url = "http://snomed.info/sct?fhir_vs=ecl/^450970008"
filter = "pain";


var Parameters = "url=" + url
if (filter != "") { Parameters = Parameters + "&" + "filter=" + filter; }
var FullURL = urlFHIREndpoint + ResourceClass + "/" + OperationName + "?" + Parameters;

// This function is usefull to fill combobox

//We call the FHIR endpoint with our parameters

function fillComboBox() {
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

export default fillComboBox;