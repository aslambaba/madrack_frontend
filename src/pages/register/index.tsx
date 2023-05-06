import { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { useRouter } from "next/router";
import { Amplify, Auth } from "aws-amplify";
import MainHeader from "@/components/header/mainheader";
import styles from "./registerstyle.module.css";
import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import loginVector from "../../../public/loginVector.jpg";
import CognitoConfig from "../utils/aws-cognito-export";
import { useAuth } from "../utils/userLoggedIn";
import { CognitoIdentityServiceProvider } from "aws-sdk";

import { useMutation, gql } from "@apollo/client";

const PatientInput = {
  patient_id: String!,
  fullName: String!,
  fatherName: String,
  CNICNumber: String,
  type: String!,
  email: String!,
  phoneNumber: String!,
  address: String,
};
const DoctorInput = {
  name: String!,
  doctor_id: String!,
  CNICNumber: String,
  email: String!,
  type: String!,
  phoneNumber: String!,
  clinicAddress: String,
};
const Add_PATIENT = gql`
  mutation AddPatient($patient: PatientInput) {
    addPatient(patient: $patient)
  }
`;

const Add_DOCTOR = gql`
  mutation AddDoctor($doctor: DoctorInput) {
    addDoctor(doctor: $doctor)
  }
`;

Amplify.configure(CognitoConfig);
// AWS.config.update({
//   region: 'us-east-1',
//   accessKeyId: 'AKIAUCIGS7I7YSIXZ3LJ',
//   secretAccessKey: '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',
// });

interface RegisterFormValues {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  userType: string;
}

interface EmailVerification {
  email: string;
  verificationCode: string;
}
export default function Register() {
  let [emailVerificationStep, setEmailVerificationStep] = useState(false);
  let [user_type_of_currentUser, set_user_type_of_currentUser] = useState("");
  let [resendEmail, setResendEmail] = useState("");
  let [resendVerificationCode, setResendVerificationCode] = useState(false);
  let [username, setUsername] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState({
    username: "",
    groupname: "",
    status: false,
  });

  const [userData, setUserData] = useState<RegisterFormValues>({
    confirmPassword: "",
    email: "",
    fullname: "",
    gender: "",
    password: "",
    phone: "",
    userType: "",
  });

  const [addPatient, { loading, error }] = useMutation(Add_PATIENT);
  const [addDoctor, docStatus] = useMutation(Add_DOCTOR);

  useAuth(setIsUserLoggedIn);

  const initialValues: RegisterFormValues = {
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    userType: "",
  };

  const emailVerificationInitialValues: EmailVerification = {
    email: "",
    verificationCode: "",
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Required"),
    email: Yup.string().email("Inavlid email address").required("Required"),
    phone: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Password Should be 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Required"),
    userType: Yup.string()
      .oneOf(["Doctors", "Patient"], "Invalid user type")
      .required("Required"),
  });

  const emailValidationSchema = Yup.object({
    verificationCode: Yup.string().required("Verification code is required"),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      let respose = await Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          name: values.fullname,
          email: values.email,
          phone_number: values.phone,
          gender: values.gender,
          "custom:user_type": values.userType,
        },
      });
      set_user_type_of_currentUser(values.userType);
      setUserData({
        confirmPassword: values.confirmPassword,
        email: values.email,
        fullname: values.fullname,
        gender: values.gender,
        password: values.password,
        phone: values.phone,
        userType: values.userType,
      });
      if (respose) {
        setUsername(respose.userSub);
        setEmailVerificationStep(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const EmailVerifyhandleSubmit = async (values: EmailVerification) => {
    try {
      await Auth.confirmSignUp(values.email, values.verificationCode).then(
        async (response) => {
          console.log("Success Email Verified");
          const cognitoIdentityServiceProvider =
            new CognitoIdentityServiceProvider({ region: "us-east-1" });

          const userPoolId = "us-east-1_qXUjefA2V";
          let groupName = "";

          if (user_type_of_currentUser == "Patient") {
            groupName = "Patient";
            // Add Data To DynamoDB
            // console.log("Adding Patient");
            // await addPatient({
            //   variables: {
            //     patient_id: userData.email,
            //     fullName: userData.fullname,
            //     type: userData.userType,
            //     email: userData.email,
            //     phoneNumber: userData.phone,
            //   },
            // });
          }
          if (user_type_of_currentUser == "Doctors") {
            groupName = "Doctors";
            // console.log("Adding Doctor");
            // await addDoctor({
            //   variables: {
            //     doctor_id: userData.email,
            //     name: userData.fullname,
            //     type: userData.userType,
            //     email: userData.email,
            //     phoneNumber: userData.phone,
            //   },
            // });
          }

          // Define the parameters for the adminAddUserToGroup function
          const params = {
            UserPoolId: userPoolId,
            GroupName: groupName,
            Username: username,
          };

          cognitoIdentityServiceProvider.adminAddUserToGroup(
            params,
            (error, data) => {
              if (error) {
                console.error(error);
                throw new Error("Error adding user to group");
              } else {
                console.log(data);
              }
            }
          );
        }
      );
      setEmailVerificationStep(false);
    } catch (error) {
      console.log("eroor", error);
      setResendEmail(values.email);
      setResendVerificationCode(true);
    }
  };

  async function ResendCode() {
    setResendVerificationCode(false);
    try {
      await Auth.resendSignUp(resendEmail);
    } catch (err) {
      setResendVerificationCode(true);
    }
  }
  return (
    <>
      <MainHeader isUserLoggedIn={isUserLoggedIn.status} />
      <Row>
        {/* Registration Form */}
        <Col lg={6}>
          <div className={styles.RegisterMainSection}>
            <h2>Register</h2>

            {emailVerificationStep ? (
              /* Email Verification Section */

              <>
                <h4>Verify Email</h4>
                <Formik
                  initialValues={emailVerificationInitialValues}
                  validationSchema={emailValidationSchema}
                  onSubmit={EmailVerifyhandleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className={styles.FieldContainer}>
                      <div className={styles.Field}>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        {errors.email && touched.email && (
                          <div>{errors.email}</div>
                        )}
                      </div>

                      <div className={styles.Field}>
                        <label htmlFor="verificationCode">
                          Verification Code
                        </label>
                        <Field name="verificationCode" type="text" />
                        {errors.verificationCode &&
                          touched.verificationCode && (
                            <div>{errors.verificationCode}</div>
                          )}
                      </div>

                      <button type="submit">Verify</button>
                    </Form>
                  )}
                </Formik>
                {resendVerificationCode ? (
                  <div className={styles.ResendCodeSection}>
                    <span>Invalid verification code.</span>
                    <button onClick={ResendCode}>Resend Code</button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              /* Registration Section */
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values); // log the form values
                    setSubmitting(false);
                    handleSubmit(values);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className={styles.FieldContainer}>
                      <div className={styles.Field}>
                        <label htmlFor="fullname">Full Name</label>
                        <Field type="text" name="fullname" />
                        <ErrorMessage name="fullname" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="gender">Gender</label>
                        <Field as="select" id="gender" name="gender">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="phone">Phone Number</label>
                        <Field type="text" name="phone" />
                        <ErrorMessage name="phone" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <Field type="password" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="userType">User Type</label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="userType"
                              value="Doctors"
                            />
                            Doctor
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="userType"
                              value="Patient"
                            />
                            Patient
                          </label>
                        </div>
                        <ErrorMessage name="userType" component="div" />
                      </div>
                      <button type="submit" disabled={isSubmitting}>
                        Register
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </Col>
        {/* RegisterVector Part */}
        <Col lg={6}>
          <div className={styles.RegisterVectorPart}>
            <Image
              src={loginVector}
              height={500}
              width={500}
              alt="Madrack Health"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
