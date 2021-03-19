import fhirClient from "./client/fhir";

function searchPatient() {
    // Search for all patients with last (family) name exactly = "Smith," gender=male, born after 05-May-1965
    const searchCriteria = { _count: '10', family: 'Smith', gender: 'male', birthdate: 'ge1965-05-05' }

    // Search for the patient with identifier [system] http://hospital.gov/patients [value] 9999999 (Medical Record Number)
    // searchCriteria = { _count: MaxPerPage, identifier: "http://hospital.gov/patients|9999999" }


    fhirClient
        .search({
            resourceType: 'Patient',
            searchParams:
                searchCriteria
        })
        .then((response) => {
            console.log(response);
            return response;
        })
        .then((response: (fhir.Bundle & { type: "searchset" })) => {
            console.log(response);
            return fhirClient.nextPage({ bundle: response });
        })
        .then((response: (fhir.Bundle & { type: "searchset" })) => {
            console.log(response);
            return fhirClient.prevPage({ bundle: response });
        })
        .catch((error) => {
            console.error(error);
        });
}

export default searchPatient;