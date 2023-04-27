import MainHeader from "@/components/header/mainheader";
import styles from "./loginstyle.module.css";
import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from 'next/image'
import loginVector from "../../../public/loginVector.jpg"
interface LoginFormValues {
  email: string,
  password: string,
  type: string
}

export default function Login() {

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    type: 'patient'
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Inavlid email address").required('Required'),
    password: Yup.string().min(8, "Password Should be 8 characters").required('Required'),
    userType: Yup.string().oneOf(['doctor', 'patient'], 'Invalid user type').required('Required'),
  })


  return (
    <>
      <MainHeader />
      <Row>
        {/* LoginForm */}
        <Col lg={6}>
          <div className={styles.LoginMainSection}>
            <h2>Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values); // log the form values
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className={styles.FieldContainer}>
                  <div className={styles.Field}>
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email"  />
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
                        <Field type="radio" name="userType" value="doctor" />
                        Doctor
                      </label>
                      <label>
                        <Field type="radio" name="userType" value="patient" />
                        Patient
                      </label>
                    </div>
                    <ErrorMessage name="userType" component="div" />
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}

            </Formik>
          </div>
        </Col>
        {/* LoginVector Part */}
        <Col lg={6}>
          <div className={styles.loginVectorPart}>
                <Image src={loginVector} height={500} width={500} alt="Madrack Health"/>
          </div>
        </Col>
      </Row>
    </>
  );
}
