import fhirClient from "./client/fhir";


fhirClient.delete({
    resourceType: 'Practitioner',
    id: '123207',
}).then((data) => {
    var NewId = data.id;
    console.log("Id:" + NewId);
})
    .catch((error) => {
        var errorText = JSON.stringify(error);
        console.log(errorText)
    });
