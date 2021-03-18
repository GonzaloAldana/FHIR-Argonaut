import { create } from "node:domain";
import fhirClient from "../client/fhir";


function FillAllergy(m_status: fhir.AllergyIntoleranceClinicalStatus,
    m_type: fhir.AllergyIntoleranceType,
    m_category: fhir.AllergyIntoleranceCategory,
    m_criticality: fhir.AllergyIntoleranceCriticality,
    m_code: fhir.code,
    m_text: string,
    m_patientref: string,
    m_onsetAge: string) {
    var aint: fhir.AllergyIntolerance = {} as fhir.AllergyIntolerance;
    //We will try to do it in the most fluent way
    aint = {
        resourceType: "AllergyIntolerance",
        clinicalStatus: m_status,
        verificationStatus: 'confirmed',
        type: m_type,
        category: [
            m_category
        ],
        criticality: m_criticality,
        code: {
            coding: [{
                system: "http://hl7.org/fhir/ValueSet/substance-code",
                code: m_code,
                display: m_text
            }],
            text: m_text
        },
        patient: {
            reference: "Patient/" + m_patientref
        },
        onsetAge: {
            value: 10,
            code: "Y",
            unit: "Y"
        },
        text: {
            status: "generated",
            div: "<div xmlns='http://www.w3.org/1999/xhtml'>" +
                m_type + ": (" + m_category + "," + m_criticality + "): " + m_text + "<br/>" +
                "On Set Age: " + m_onsetAge + " yo" + "<br/></div>"
        }

    };

    return aint;
}
/*
AllergyIntolerance 
ClinicalStatus: active
type: allergy
category: food
criticality: high
patient: Patient/49293
code: 91935009 (http://hl7.org/fhir/ValueSet/substance-code): Allergy to Peanuts
onSet: 10 years old (Age)
*/
var aint = FillAllergy("active", "allergy", "food", "high", "91935009", "Allergy to peanuts", "109", "10");

function createAllergyIntolerance() {
    fhirClient.create({
        resourceType: 'AllergyIntolerance',
        body: aint,
    }).then((dataO) => {
        console.log("Allergy Intolerance Id:" + dataO.id)
    })
        .catch((error) => {
            var errorText = JSON.stringify(error);
            console.log(errorText)
        });
}

export default createAllergyIntolerance;