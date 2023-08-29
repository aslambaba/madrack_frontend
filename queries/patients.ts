import { gql } from "@apollo/client";

export const getAllPatients = gql`
  query GetPatientRecord {
    getAllPatients {
      _id
      patient_id
      fullName
      fatherName
      CNICNumber
      type
      email
      phoneNumber
      address
    }
  }
`;
export const getPatientRecord = gql`
  query GetPatientRecord($patientId: String) {
    getPatientRecord(patient_id: $patientId) {
      _id
      patient_id
      fullName
      fatherName
      CNICNumber
      type
      email
      phoneNumber
      address
      disease {
        _id
        diseaseName
        description
        status
        startDate
        endDate
        doctors {
          _id
          doctorName
          hospitalName
          startDate
          endDate
          doctorDescription
        }
      }
    }
  }
`;
export const getPatientRecordByEmail = gql`
  query GetPatientRecordByEmail($email: String) {
    getPatientRecordByEmail(email: $email) {
      _id
      patient_id
      fullName
      fatherName
      CNICNumber
      type
      email
      phoneNumber
      address
      disease {
        _id
        diseaseName
        description
        status
        startDate
        endDate
        doctors {
          _id
          doctorName
          hospitalName
          startDate
          endDate
          doctorDescription
        }
      }
    }
  }
`;
