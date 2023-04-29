import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Amplify, Auth } from "aws-amplify";
import MainHeader from "@/components/header/mainheader";
import styles from "./loginstyle.module.css";
import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import loginVector from "../../../public/loginVector.jpg";
import CognitoConfig from "../utils/aws-cognito-export";
import { useAuth } from "../utils/userLoggedIn";
Amplify.configure(CognitoConfig);

interface LoginFormValues {
  email: string;
  password: string;
  type: string;
}
interface ForgetPasswordValues {
  email: string;
}
interface EmailVerificationValues {
  verificationCode: string;
  password: string;
  confirmPassword: string;
}
export default function Login() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("loginStep");
  const [userEmail, setUserEmail] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useAuth(setIsUserLoggedIn);

  const LoginInitialValues: LoginFormValues = {
    email: "",
    password: "",
    type: "patient",
  };

  const ForgetPasswordInitialValues: ForgetPasswordValues = {
    email: "",
  };

  const EmailVerificationInitialValues: EmailVerificationValues = {
    verificationCode: "",
    password: "",
    confirmPassword: "",
  };

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Inavlid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password Should be 8 characters")
      .required("Required"),
    userType: Yup.string()
      .oneOf(["doctor", "patient"], "Invalid user type")
      .required("Required"),
  });

  const ForgetPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
      .min(6, "Password Should be 6 characters")
      .required("Required"),
  });

  const EmailVerificationValidationSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .min(6, "Password Should be 6 characters")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password Should be 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), "Password should be match"])
      .required("Required"),
  });

  const SignInHandler = async (values: LoginFormValues) => {
    try {
      await Auth.signIn(values.email, values.password).then((response) => {
        console.log("user Logged In", response);
        router.replace("/dashboard");
      });
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  const ForgetPasswordHandler = async (values: ForgetPasswordValues) => {
    try {
      await Auth.forgotPassword(values.email).then((response) => {
        setCurrentStep("EmailVerificationStep");

        console.log("Password reset email sent successfully", currentStep);
      });
    } catch (error) {
      console.log("Error sending password reset email", error);
    }
  };

  const EmailVerificationHandler = async (values: EmailVerificationValues) => {
    try {
      await Auth.forgotPasswordSubmit(
        userEmail,
        values.verificationCode,
        values.confirmPassword
      ).then((response) => {
        setCurrentStep("loginStep");
      });
      console.log("Code verification successful");
    } catch (error) {
      console.log("Error verifying code", error);
    }
  };

  return (
    <>
      <MainHeader isUserLoggedIn={isUserLoggedIn} />
      <Row>
        {/* LoginForm */}
        <Col lg={6}>
          <div className={styles.LoginMainSection}>
            <h2>Login</h2>
            {/* Login Step */}
            {currentStep == "loginStep" ? (
              <>
                <Formik
                  initialValues={LoginInitialValues}
                  validationSchema={LoginValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values); // log the form values
                    SignInHandler(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className={styles.FieldContainer}>
                      <div className={styles.Field}>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                      </div>
                      <div className={styles.Field}>
                        <label htmlFor="userType">User Type</label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="userType"
                              value="doctor"
                            />
                            Doctor
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="userType"
                              value="patient"
                            />
                            Patient
                          </label>
                        </div>
                        <ErrorMessage name="userType" component="div" />
                      </div>
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => setCurrentStep("ForgetPasswordStep")}
                      >
                        Forget Password ?
                      </span>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <></>
            )}

            {currentStep == "ForgetPasswordStep" ? (
              <>
                <Formik
                  initialValues={ForgetPasswordInitialValues}
                  validationSchema={ForgetPasswordValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values); // log the form values
                    setUserEmail(values.email);
                    ForgetPasswordHandler(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className={styles.FieldContainer}>
                      <div className={styles.Field}>
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                      </div>
                      <button type="submit" disabled={isSubmitting}>
                        Send Code
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <></>
            )}

            {currentStep == "EmailVerificationStep" ? (
              <>
                <Formik
                  initialValues={EmailVerificationInitialValues}
                  validationSchema={EmailVerificationValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(values); // log the form values
                    EmailVerificationHandler(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className={styles.FieldContainer}>
                      <div className={styles.Field}>
                        <label htmlFor="verificationCode">Enter Code</label>
                        <Field type="text" name="verificationCode" />
                        <ErrorMessage name="verificationCode" component="div" />
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
                      <button type="submit" disabled={isSubmitting}>
                        Verify Code
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <></>
            )}
          </div>
        </Col>
        {/* LoginVector Part */}
        <Col lg={6}>
          <div className={styles.loginVectorPart}>
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
