import fhirClient from "./client/fhir";


fhirClient.read({
    resourceType: 'Practitioner',
    id: '123207',
}).then((MyPractitioner) => UpdatePractitioner(MyPractitioner))
    .catch((error) => console.log(JSON.stringify(error)));


async function UpdatePractitioner(MyPractitioner: fhir.Practitioner) {
    console.log("My Practitioner obtained");
    console.log(JSON.stringify(MyPractitioner));
    //
    // A little tricky because we need to download the photo
    // from some place
    // This is just some code to to that
    // We use bent as our image downloader
    //
    const bent = require('bent')
    const getBuffer = bent('buffer')
    let buffer = await getBuffer('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0')
    //After we have the photo in base64 we proceed 
    //by creating the photo element as an attachment element
    // contentType,data and size.

    const data = buffer.toString('base64');

    MyPractitioner.photo =
        [
            {
                "contentType": "image/png",
                "data": data,
                "size": data.size
            }
        ];

    console.log("My Practitioner edited");
    console.log(JSON.stringify(MyPractitioner));
    console.log("Updating");
    console.log("About to enter update");

    fhirClient.update({
        resourceType: 'Practitioner',
        id: '123207',
        body: MyPractitioner,
    }).then((data) => {
        console.log("Success");
        var NewVer = data.meta.versionId;
        console.log("Updated VersionId:" + NewVer);
    })
        .catch((error) => {
            console.log("Error");
            var errorText = JSON.stringify(error);
            console.log(errorText);
        });

}