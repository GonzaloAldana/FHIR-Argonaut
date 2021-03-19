//Micro Assignment S 23 - Processing a Document Bundle
//Code to read the JSON file
import fs from 'fs';
var path = require('path');

function processJSON() {
    var resourcePath = path.join(__dirname, '../', '/FHIR_RESOURCES/IPS_DOCUMENT.JSON');
    var contents = fs.readFileSync(resourcePath, 'utf8');
    //Code to parse the FHIR JSON into a js object
    var doc = JSON.parse(contents);
    //We need to extract the following elements: Patient Name, Identifier and Condition Code
    var PatientName = "";
    var PatientIdentifier = "";
    var PatientConditions = "";
    var entries = doc.entry;
    entries.forEach(entry => {

        if (entry.resource.resourceType == "Patient") {
            var pat = entry.resource;
            try {
                PatientName = pat.name[0].family + "," + pat.name[0].given[0];
            } catch (error) {
                PatientName = "Not a Valid Patient - Name or name mandatory component missing"
            }
            try {
                PatientIdentifier = pat.identifier[0].system + ":" + pat.identifier[0].value;
            } catch (error) {
                PatientName = "Not a Valid Patient - Identifier missing"

            }

        } else {
            if (entry.resource.resourceType == "Condition") {
                const cnd = entry.resource;
                try {
                    PatientConditions = PatientConditions + cnd.code.coding[0].code + " / ";
                } catch (error) {
                    PatientConditions = "Not a Valid Condition - Code Missing"
                }

            }
        }

    })
    console.log("Patient Name:" + PatientName);
    console.log("Patient Identifier:" + PatientIdentifier);
    console.log("Patient Conditions:" + PatientConditions);
}

export default processJSON;