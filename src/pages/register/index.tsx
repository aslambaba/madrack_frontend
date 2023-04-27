import MainHeader from "@/components/header/mainheader";
import styles from "./registerstyle.module.css";
import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from 'next/image'
import loginVector from "../../../public/loginVector.jpg"


interface LoginFormValues {
  fullname: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  gender: string,
  userType: string
}

export default function Register() {

  const initialValues: LoginFormValues = {
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    userType: ''
  }

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Required"),
    gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required("Required"),
    email: Yup.string().email("Inavlid email address").required('Required'),

    password: Yup.string().min(8, "Password Should be 8 characters").required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password must match').required('Required'),
    userType: Yup.string().oneOf(['doctor', 'patient'], 'Invalid user type').required('Required'),
  })


  return (
    <>
      <MainHeader />
      <Row>
        {/* Registration Form */}
        <Col lg={6}>
          <div className={styles.RegisterMainSection}>
            <h2>Register</h2>
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
                    <label htmlFor="fullname">Full Name</label>
                    <Field type="text" name="fullname"  />
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
                    <Field type="email" name="email"  />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div className={styles.Field}>
                    <label htmlFor="phone">Phone Number</label>
                    <Field type="text" name="phone"  />
                    <ErrorMessage name="phone" component="div" />
                  </div>
                  <div className={styles.Field}>
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <div className={styles.Field}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field type="password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" />
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
                    Register
                  </button>
                </Form>
              )}

            </Formik>
          </div>
        </Col>
        {/* RegisterVector Part */}
        <Col lg={6}>
          <div className={styles.RegisterVectorPart}>
                <Image src={loginVector} height={500} width={500} alt="Madrack Health"/>
          </div>
        </Col>
      </Row>
    </>
  );
}
