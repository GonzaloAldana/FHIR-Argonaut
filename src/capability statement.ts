import fhirClient from "./client/fhir";

function getCapabilityStatement() {
    fhirClient.capabilityStatement()
        .then((capabilityStatement) => {
            const CapabilityTool = require('fhir-kit-client/lib/capability-tool');
            const capabilities = new CapabilityTool(capabilityStatement);

            console.log(capabilities);
            const conditionalUpdateSupport = capabilities.capabilityContents({
                resourceType: 'Patient',
                capabilityType: 'conditionalUpdate'
            });
            console.log("a) Can this server do conditional updates on Patient?");
            console.log(conditionalUpdateSupport);
            
            //b) Which interactions does this server support on Practitioner?
            const supportedPractitionerInteractions =
                capabilities.interactionsFor({ resourceType: 'Practitioner' });
            console.log("b) Which interactions does this server support on Practitioner?");
            console.log(supportedPractitionerInteractions);

            //c) Can this server search Patient by birthdate?
            const patientBDSearchSupport = capabilities.resourceSearch('Patient', 'birthdate');
            console.log("c) Can this server search Patient by birthDate?");
            console.log(patientBDSearchSupport);

            //d) Which search parameters does this server support for Observation?
            const ObservationSearchParam = capabilities.searchParamsFor({ resourceType: 'Observation' });
            console.log("Which search parameters does this server support for Observation?");
            console.log(ObservationSearchParam);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
        });
}

export default getCapabilityStatement;