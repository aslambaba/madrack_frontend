import { gql } from "@apollo/client";


export const Add_DOCTOR = gql`
  mutation AddDoctor(
    $name: String!
    $doctor_id: String!
    $email: String!
    $type: String!
    $phoneNumber: String!
  ) {
    addDoctor(
      doctor: {
        name: $name
        doctor_id: $doctor_id
        email: $email
        type: $type
        phoneNumber: $phoneNumber
      }
    )
  }
`;

export const Update_Doctor = gql`
  mutation UpdateDoctor(
    $name: String!
    $doctor_id: String!
    $CNICNumber: String
    $email: String!
    $type: String!
    $phoneNumber: String!
    $clinicAddress: String
    $degree: [DegreeInput]
    $experience: [ExperienceInput]
  ){
    updateDoctor(
      doctor: {
        name: $name
        doctor_id: $doctor_id
        CNICNumber: $CNICNumber
        email: $email
        type: $type
        phoneNumber: $phoneNumber
        clinicAddress: $clinicAddress
        degree: $degree
        experience: $experience
      }
    )
  }
`;
