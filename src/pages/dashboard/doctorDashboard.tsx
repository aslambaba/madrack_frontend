import { useState } from "react";
import styles from "./dashboardstyle.module.css";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikProps,
  insert,
} from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import loginVector from "../../../public/loginVector.jpg";
import PopupModal from "@/components/editProfile/popupModel";
import PatientRecord from "@/components/patients/patientRecord";

interface Degree {
  degreeName: string;
  instituteName: string;
  passingYear: Date;
}
interface professonalExperience {
  positionName: string;
  hospitalName: string;
}
interface DoctorProfile {
  doctorName: string;
  CNIC: string;
  email: string;
  phoneNumber: string;
  clinicAddress: string;
  degree: Degree[];
  experience: professonalExperience[];
}

const DoctorDashboard = () => {
  const router = useRouter();

  const [newRecordPopup, setNewRecordPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValuesOfDoctorProfile: DoctorProfile = {
    doctorName: "",
    CNIC: "",
    email: "",
    phoneNumber: "",
    clinicAddress: "",
    degree: [
      {
        degreeName: "",
        instituteName: "",
        passingYear: new Date(),
      },
    ],
    experience: [
      {
        positionName: "",
        hospitalName: "",
      },
    ],
  };

  const validateSchemaForDoctorProfile = Yup.object().shape({
    doctorName: Yup.string().required("Name is Required"),
    CNIC: Yup.string().required("CNIC is Required"),
    email: Yup.string().required("Email is Required"),
    phoneNumber: Yup.string().required("Phone Number is Required"),
    clinicAddress: Yup.string().required("Clinic Address is Required"),
    degree: Yup.array().of(
      Yup.object().shape({
        degreeName: Yup.string().required("Degree Name is Required"),
        institureName: Yup.string().required("Institute Name is Required"),
        passingYear: Yup.date().required("Passing Year is Required"),
      })
    ),
    experience: Yup.array().of(
      Yup.object().shape({
        positionName: Yup.string().required("Position Name is Required"),
        hospitalName: Yup.string().required("Hospital Name is Required"),
      })
    ),
  });
  const handleSubmitForEditProfile = (
    values: DoctorProfile,
    { setSubmitting }: FormikProps<DoctorProfile>
  ) => {
    console.log(values);
    setSubmitting(false);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <PopupModal onClose={handleCloseModal}>
          <Formik
            initialValues={initialValuesOfDoctorProfile}
            validationSchema={validateSchemaForDoctorProfile}
            onSubmit={handleSubmitForEditProfile}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <Form className={styles.FieldContainer}>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="doctorName">Doctor Name</label>
                      <Field type="text" name="doctorName" />
                      <ErrorMessage name="doctorName" component="div" />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="cnicNumber">CNIC Number</label>
                      <Field type="text" name="cnicNumber" />
                      <ErrorMessage name="cnicNumber" component="div" />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="email">Email</label>
                      <Field type="text" name="email" disabled />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <Field type="text" name="phoneNumber" />
                      <ErrorMessage name="phoneNumber" component="div" />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="clinicAddress">Clinic Address</label>
                      <Field type="text" name="clinicAddress" />
                      <ErrorMessage name="clinicAddress" component="div" />
                    </div>
                  </Col>
                  <Col lg={12} md={12}>
                    <div className={styles.addNewDegreeSec}>
                      <label>Degrees</label>
                      <br />
                      <FieldArray name="degree">
                        {({ insert, push, remove }) => (
                          <div>
                            {values.degree.length > 0 &&
                              values.degree.map((deg, index) => (
                                <div key={index}>
                                  <Row>
                                    <Col lg={6} md={6} sm={12}>
                                      <div className={styles.Field}>
                                        <label
                                          htmlFor={`degree.${index}.degreeName`}
                                        >
                                          Degree Name
                                        </label>
                                        <input
                                          type="text"
                                          id={`degree.${index}.degreeName`}
                                          name={`degree.${index}.degreeName`}
                                          value={deg.degreeName}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          name={`degree.${index}.degreeName`}
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                      <div className={styles.Field}>
                                        <label
                                          htmlFor={`degree.${index}.instituteName`}
                                        >
                                          Institute Name
                                        </label>
                                        <input
                                          type="text"
                                          id={`degree.${index}.instituteName`}
                                          name={`degree.${index}.instituteName`}
                                          value={deg.instituteName}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          name={`degree.${index}.instituteName`}
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                      <div className={styles.Field}>
                                        <label
                                          htmlFor={`degree.${index}.passingYear`}
                                        >
                                          Start Date:
                                        </label>
                                        <input
                                          type="date"
                                          id={`degree.${index}.passingYear`}
                                          name={`degree.${index}.passingYear`}
                                          value={deg.passingYear
                                            .toString()
                                            .substr(0, 10)}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          name={`degree.${index}.passingYear`}
                                        />
                                      </div>
                                    </Col>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className={styles.RecordFormBtn}
                                    >
                                      Remove
                                    </button>
                                  </Row>
                                </div>
                              ))}
                            <button
                              type="button"
                              className={styles.RecordFormBtn}
                              onClick={() =>
                                push({
                                  degreeName: "",
                                  InsitituteName: "",
                                  passingYear: "",
                                })
                              }
                            >
                              Add Doctor
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </Col>
                  <Col lg={12} md={12}>
                    <div className={styles.addNewExpSec}>
                      <label>Experience</label>
                      <FieldArray name="experience">
                        {({ insert, push, remove }) => (
                          <div>
                            {values.experience.length > 0 &&
                              values.experience.map((exp, index) => (
                                <div key={index}>
                                  <Row>
                                    <Col lg={6} md={6} sm={12}>
                                      <div className={styles.Field}>
                                        <label
                                          htmlFor={`experience.${index}.positionName`}
                                        >
                                          Position Name
                                        </label>
                                        <input
                                          type="text"
                                          id={`experience.${index}.positionName`}
                                          name={`experience.${index}.positionName`}
                                          value={exp.positionName}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          name={`experience.${index}.positionName`}
                                        />
                                      </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={12}>
                                      <div className={styles.Field}>
                                        <label
                                          htmlFor={`experience.${index}.hospitalName`}
                                        >
                                          Hospital Name
                                        </label>
                                        <input
                                          type="text"
                                          id={`experience.${index}.hospitalName`}
                                          name={`experience.${index}.hospitalName`}
                                          value={exp.hospitalName}
                                          onChange={handleChange}
                                        />
                                        <ErrorMessage
                                          name={`experience.${index}.hospitalName`}
                                        />
                                      </div>
                                    </Col>
                                    <button
                                      className={styles.RecordFormBtn}
                                      onClick={() => {
                                        remove(index);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </Row>
                                </div>
                              ))}
                            <button
                              className={styles.RecordFormBtn}
                              onClick={() => {
                                push({
                                  positionName: "",
                                  hospitalName: "",
                                });
                              }}
                            >
                              Add Experienve
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </Col>
                </Row>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.RecordFormBtn}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </PopupModal>
      )}
      <Row>
        <Col lg={4} md={4}>
          <div className={styles.dashboardProfileSec}>
            <div style={{ textAlign: "center" }}>
              <Image
                alt="profile picture"
                src={loginVector}
                height={100}
                width={100}
              />
            </div>

            <h3>Aslam Sarfraz</h3>
            <div className={styles.personalInfo}>
              <p>
                <b>Full Name</b>
              </p>
              <p>Aslam Sarfraz</p>
            </div>
            <div className={styles.personalInfo}>
              <p>
                <b>Father Name</b>
              </p>
              <p>Nusrat Iqbal</p>
            </div>
            <div className={styles.personalInfo}>
              <p>
                <b>CNIC</b>
              </p>
              <p>35202-3596398-9</p>
            </div>
            <div className={styles.personalInfo}>
              <p>
                <b>Email</b>
              </p>
              <p>aslam91r@gmail.com</p>
            </div>
            <div className={styles.personalInfo}>
              <p>
                <b>Phone Number</b>
              </p>
              <p>+923048790325</p>
            </div>
            <div className={styles.personalInfo}>
              <p>
                <b>Address</b>
              </p>
              <br />
              <p>House BIII-650, Farid Gate Bahwalpur, Punjab, Pakistan</p>
            </div>
            <button onClick={handleOpenModal}>Edit Profile</button>
          </div>
        </Col>
        <Col lg={8} md={8}>
          <div className={styles.dashboardReportsSec}>
            <div className={styles.requestPatientRec}>
              <input placeholder="Patient ID"></input>
              <button onClick={() => setNewRecordPopup(true)}>Search</button>
            </div>
            {newRecordPopup ? (
              <>
                <PatientRecord />
              </>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default DoctorDashboard;
