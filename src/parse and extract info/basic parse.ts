//Micro Assignment S 17 - Extract Information from a IPS Observation
//Code to read the observation file
import fs from 'fs';
var path = require('path');

function parseXMLObservation() {
    var resourcePath = path.join(__dirname, '../', '/FHIR_RESOURCES/OBSERVATION.XML');
    var contents = fs.readFileSync(resourcePath, 'utf8');
    //Code to parse the FHIR XML into a js object
    var Fhir = require('fhir').Fhir;
    var fhir = new Fhir();
    var ob = fhir.xmlToObj(contents);
    //We need to extract the following elements: text – status – category – code – date/time - value
    var catCode = "";
    var catSystem = "";
    var statusCode = "";
    var obsCode = "";
    var obsSystem = "";
    var obsDate = "";
    var obsValue = "";
    if (ob.status) {
        // Status Code
        statusCode = ob.status;
        // Category
        catSystem = ob.category[0].coding[0].system;
        catCode = ob.category[0].coding[0].code;
        // Code
        obsSystem = ob.code.coding[0].system;
        obsCode = ob.code.coding[0].code;
        console.log(obsCode);
        // Date- Time
        obsDate = ob.effectiveDateTime;
        // Value
        if (ob.valueCodeableConcept) {
            obsValue = ob.valueCodeableConcept.coding[0].code;

        };
        //Narrative
        var sText = ob.text.div;
        console.log("OBSERVATION");
        console.log("**Category Code**");
        console.log("Code:");
        console.log(catCode);
        console.log("System:");
        console.log("Code:");
        console.log(catSystem);
        console.log("**Observation Code**");
        console.log("Code:");
        console.log(obsCode);
        console.log("System:");
        console.log(obsSystem);
        console.log("**Value**");
        console.log(obsValue);
        console.log("**Date/Time**");
        console.log(obsDate);
        console.log("**Status Code**");
        console.log(statusCode);
        console.log("**Text**");
        console.log(sText);

    }
}

export default parseXMLObservation;