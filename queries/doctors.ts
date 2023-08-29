import { gql } from "@apollo/client";

export const GetDoctorRecord = gql`
  query GetDoctorRecord($doctorId: String) {
    getDoctorRecord(doctor_id: $doctorId) {
      _id
      name
      doctor_id
      CNICNumber
      email
      type
      phoneNumber
      clinicAddress
      degree {
        _id
        degreeName
        instituteName
        passingYear
      }
      experience {
        _id
        positionName
        hospitalName
      }
    }
  }
`;
