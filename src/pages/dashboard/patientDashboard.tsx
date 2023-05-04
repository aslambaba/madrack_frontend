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
} from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import loginVector from "../../../public/loginVector.jpg";
import PopupModal from "@/components/editProfile/popupModel";

interface Doctor {
  doctorName: string;
  hospitalName: string;
  startDate: Date;
  endDate: Date;
  doctorDescription: string;
}

interface FormValues {
  diseaseName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  doctors: Doctor[];
}

interface PatientProfile {
  fullName: string;
  fatherName: string;
  cnicNumber: string;
  email: string;
  phoneNumber: string;
  address: string;
}
const PatientDashboard = () => {
  const router = useRouter();

  const [newRecordPopup, setNewRecordPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialValues: FormValues = {
    diseaseName: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "",
    doctors: [
      {
        doctorName: "",
        hospitalName: "",
        startDate: new Date(),
        endDate: new Date(),
        doctorDescription: "",
      },
    ],
  };

  const initialValuesOfPatientProfile: PatientProfile = {
    fullName: "",
    fatherName: "",
    cnicNumber: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    diseaseName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    startDate: Yup.date()
      .required("Required")
      .min(Yup.ref("endDate"), "Start date must be before end date"),
    endDate: Yup.date()
      .required("Required")
      .max(Yup.ref("startDate"), "End date must be after start date"),
    status: Yup.string()
      .required("Required")
      .oneOf(["pending", "completed", "cancelled"]),
    doctors: Yup.array().of(
      Yup.object().shape({
        doctorName: Yup.string().required("Required"),
        hospitalName: Yup.string().required("Required"),
        startDate: Yup.date()
          .required("Required")
          .min(Yup.ref("endDate"), "Start date must be before end date"),
        endDate: Yup.date()
          .required("Required")
          .max(Yup.ref("startDate"), "End date must be after start date"),
        doctorDescription: Yup.string().required("Required"),
      })
    ),
  });

  const validationSchemaForPatientProfile = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    fatherName: Yup.string().required("Father Name is required"),
    cnicNumber: Yup.string()
      .required("CNIC Number is required")
      .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC Number is not valid"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^\+[1-9]\d{0,2}-\d{3}-\d{7}$/, "Phone Number is not valid"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmitForEditProfile = (
    values: PatientProfile,
    { setSubmitting }: FormikProps<PatientProfile>
  ) => {
    console.log(values);
    setSubmitting(false);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setIsSubmitting(false);
    }, 1000);
  };

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
            initialValues={initialValuesOfPatientProfile}
            validationSchema={validationSchemaForPatientProfile}
            onSubmit={handleSubmitForEditProfile}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className={styles.FieldContainer}>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="fullName">Full Name</label>
                      <Field type="text" name="fullName" />
                      <ErrorMessage name="fullName" component="div" />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className={styles.Field}>
                      <label htmlFor="fatherName">Father Name</label>
                      <Field type="text" name="fatherName" />
                      <ErrorMessage name="fatherName" component="div" />
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
                      <label htmlFor="address">Address</label>
                      <Field type="text" name="address" />
                      <ErrorMessage name="address" component="div" />
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
            <div className={styles.addNewRecBtn}>
              <button onClick={() => setNewRecordPopup(true)}>
                Add Record
              </button>
            </div>
            {newRecordPopup ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className={styles.FieldContainer}
                  >
                    <div className={styles.Field}>
                      <label htmlFor="diseaseName">Disease Name:</label>
                      <input
                        type="text"
                        id="diseaseName"
                        name="diseaseName"
                        value={values.diseaseName}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="diseaseName" />
                    </div>

                    <div className={styles.Field}>
                      <label htmlFor="description">Description:</label>
                      <textarea
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="description" />
                    </div>

                    <div className={styles.Field}>
                      <label htmlFor="startDate">Start Date:</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={values.startDate.toISOString().substr(0, 10)}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="startDate" />
                    </div>

                    <div className={styles.Field}>
                      <label htmlFor="endDate">End Date:</label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={values.endDate.toISOString().substr(0, 10)}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="endDate" />
                    </div>

                    <div className={styles.Field}>
                      <label htmlFor="status">Status:</label>
                      <select
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <ErrorMessage name="status" />
                    </div>

                    <div>
                      <label>Doctors:</label>
                      <FieldArray name="doctors">
                        {({ insert, remove, push }) => (
                          <div className={styles.doctorsSubForm}>
                            {values.doctors.length > 0 &&
                              values.doctors.map((doctor, index) => (
                                <div key={index}>
                                  <div className={styles.Field}>
                                    <label
                                      htmlFor={`doctors.${index}.doctorName`}
                                    >
                                      Doctor Name:
                                    </label>
                                    <input
                                      type="text"
                                      id={`doctors.${index}.doctorName`}
                                      name={`doctors.${index}.doctorName`}
                                      value={doctor.doctorName}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name={`doctors.${index}.doctorName`}
                                    />
                                  </div>

                                  <div className={styles.Field}>
                                    <label
                                      htmlFor={`doctors.${index}.hospitalName`}
                                    >
                                      Hospital Name:
                                    </label>
                                    <input
                                      type="text"
                                      id={`doctors.${index}.hospitalName`}
                                      name={`doctors.${index}.hospitalName`}
                                      value={doctor.hospitalName}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name={`doctors.${index}.hospitalName`}
                                    />
                                  </div>

                                  <div className={styles.Field}>
                                    <label
                                      htmlFor={`doctors.${index}.startDate`}
                                    >
                                      Start Date:
                                    </label>
                                    <input
                                      type="date"
                                      id={`doctors.${index}.startDate`}
                                      name={`doctors.${index}.startDate`}
                                      value={doctor.startDate
                                        .toString()
                                        .substr(0, 10)}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name={`doctors.${index}.startDate`}
                                    />
                                  </div>

                                  <div className={styles.Field}>
                                    <label htmlFor={`doctors.${index}.endDate`}>
                                      End Date:
                                    </label>
                                    <input
                                      type="date"
                                      id={`doctors.${index}.endDate`}
                                      name={`doctors.${index}.endDate`}
                                      value={doctor.endDate
                                        .toString()
                                        .substr(0, 10)}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name={`doctors.${index}.endDate`}
                                    />
                                  </div>

                                  <div className={styles.Field}>
                                    <label htmlFor={`doctors.${index}.review`}>
                                      Doctor Review:
                                    </label>
                                    <textarea
                                      id={`doctors.${index}.doctorDescription`}
                                      name={`doctors.${index}.doctorDescription`}
                                      value={doctor.doctorDescription}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name={`doctors.${index}.doctorDescription`}
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className={styles.RecordFormBtn}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            <button
                              type="button"
                              className={styles.RecordFormBtn}
                              onClick={() =>
                                push({
                                  doctorName: "",
                                  hospitalName: "",
                                  startDate: "",
                                  endDate: "",
                                  review: "",
                                })
                              }
                            >
                              Add Doctor
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <button type="submit" className={styles.RecordFormBtn}>
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default PatientDashboard;
