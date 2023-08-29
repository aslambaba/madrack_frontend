import { gql } from "@apollo/client";
export const Add_PATIENT = gql`
  mutation AddPatient(
    $patient_id: String!
    $fullName: String!
    $type: String!
    $email: String!
    $phoneNumber: String!
  ) {
    addPatient(
      patient: {
        patient_id: $patient_id
        fullName: $fullName
        type: $type
        email: $email
        phoneNumber: $phoneNumber
      }
    )
  }
`;
export const Update_Patient = gql`
  mutation updatePatient($patient_id: String!, $disease: [DiseaseInput]) {
    updatePatient(patient: { patient_id: $patient_id, disease: $disease })
  }
`;

export const Update_Patient_Info = gql`
  mutation UpdatePatientInfo(
    $patient_id: String!
    $fullName: String!
    $fatherName: String!
    $type: String!
    $email: String!
    $phoneNumber: String!
    $CNICNumber: String,
    $address: String,
  ) {
    updatePatientInfo(patient: {
      patient_id: $patient_id
      fullName: $fullName
      fatherName: $fatherName
      type: $type
      email: $email
      phoneNumber: $phoneNumber
      CNICNumber: $CNICNumber
      address: $address
    })
  }
`;
export const Delete_Patient = gql`
  mutation Mutation($patientId: String) {
    deletePatient(patient_id: $patientId)
  }
`;
