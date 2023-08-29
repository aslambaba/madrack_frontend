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
import { useMutation, useQuery } from "@apollo/client";
import {
  Update_Patient,
  Update_Patient_Info,
  Delete_Patient,
} from "@/mutations/patient";
import PatientRecord from "@/components/patients/patientRecord";
import { getPatientRecord } from "../../../queries/patients";

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
interface PatientProps {
  username: string;
}

const PatientProfileForm: React.FC<any> = ({
  username,
  setIsModalOpen,
  refetch,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValuesOfPatientProfile: PatientProfile = {
    fullName: `${username.fullName}`,
    fatherName: `${username.fatherName}` || "",
    cnicNumber: `${username.CNICNumber}` || "",
    email: `${username.email}`,
    phoneNumber: `${username.phoneNumber}`,
    address: `${username.address}` || "",
  };
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

  const [updatePatientInfo] = useMutation(Update_Patient_Info);

  const handleSubmit: any = async (
    values: PatientProfile,
    { setSubmitting }: FormikProps<PatientProfile>
  ) => {
    await updatePatientInfo({
      variables: {
        patient_id: username.patient_id,
        fullName: values.fullName,
        fatherName: values.fatherName,
        email: values.email,
        CNICNumber: values.cnicNumber,
        phoneNumber: values.phoneNumber,
        address: values.address,
        type: "Patient",
      },
    });
    setIsModalOpen(false);
    refetch();
    setSubmitting(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PopupModal onClose={handleCloseModal}>
      <Formik
        initialValues={initialValuesOfPatientProfile}
        validationSchema={validationSchemaForPatientProfile}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, handleChange, handleSubmit }) => (
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
  );
};

const PatientDashboard: React.FC<PatientProps> = ({ username }) => {
  const router = useRouter();

  let patientRecord = useQuery(getPatientRecord, {
    variables: { patientId: username },
  });
  const [newRecordPopup, setNewRecordPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatePatient] = useMutation(Update_Patient);
  if (patientRecord.error) {
    console.log(patientRecord.error);
  }

  const [deletePatient] = useMutation(Delete_Patient);
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

  const validationSchema = Yup.object().shape({
    diseaseName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    startDate: Yup.date()
      .required("Required")
      .max(Yup.ref("endDate"), "Start date must be before end date"),
    endDate: Yup.date()
      .required("Required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    status: Yup.string()
      .required("Required")
      .oneOf(["pending", "completed", "cancelled"]),
    doctors: Yup.array().of(
      Yup.object().shape({
        doctorName: Yup.string().required("Required"),
        hospitalName: Yup.string().required("Required"),
        startDate: Yup.date()
          .required("Required")
          .max(Yup.ref("endDate"), "Start date must be before end date"),
        endDate: Yup.date()
          .required("Required")
          .min(Yup.ref("startDate"), "End date must be after start date"),
        doctorDescription: Yup.string().required("Required"),
      })
    ),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const RefetchData = () => {
    patientRecord.refetch();
  };
  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    let oldRec = patientRecord.data.getPatientRecord.disease;
    const cleanPatient = JSON.parse(JSON.stringify(oldRec), (key, value) =>
      key === "__typename" || key === "prototype" || key === "_id"
        ? undefined
        : value
    );
    let newarry = [values, ...cleanPatient];
    console.log("Bebo", newarry);

    await updatePatient({
      variables: {
        patient_id: username,
        disease: newarry,
      },
    });
    RefetchData();
    setNewRecordPopup(false);
  };

  const deletePatientRec = async (id: string) => {
    let patientDiseases = patientRecord.data.getPatientRecord.disease;
    const updateDiseases = patientDiseases.filter(
      (doctor: any) => doctor._id !== id
    );
    const cleanPatient = JSON.parse(
      JSON.stringify(updateDiseases),
      (key, value) =>
        key === "__typename" || key === "prototype" || key === "_id"
          ? undefined
          : value
    );
    await updatePatient({
      variables: {
        patient_id: username,
        disease: cleanPatient,
      },
    });
    patientRecord.refetch();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <PatientProfileForm
          username={patientRecord.data.getPatientRecord}
          setIsModalOpen={setIsModalOpen}
          refetch={RefetchData}
        />
      )}
      <Row>
        <Col lg={4} md={4}>
          {patientRecord.data ? (
            <>
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
                  <p>{`${patientRecord.data.getPatientRecord.fullName}`}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Father Name</b>
                  </p>
                  <p>{`${patientRecord.data.getPatientRecord.fatherName}`}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>CNIC</b>
                  </p>
                  <p>{`${patientRecord.data.getPatientRecord.CNICNumber}`}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Email</b>
                  </p>
                  <p>{`${patientRecord.data.getPatientRecord.email}`}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Phone Number</b>
                  </p>
                  <p>{`${patientRecord.data.getPatientRecord.phoneNumber}`}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Address</b>
                  </p>
                  <br />
                  <p>{`${patientRecord.data.getPatientRecord.address}`}</p>
                </div>
                <button onClick={handleOpenModal}>Edit Profile</button>
              </div>
            </>
          ) : (
            <></>
          )}
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
                        value={values.startDate.toString().substr(0, 10)}
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
                        value={values.endDate.toString().substr(0, 10)}
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
                                    <label
                                      htmlFor={`doctors.${index}.doctorDescription`}
                                    >
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
                                  doctorDescription: "",
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
            {patientRecord.data ? (
              <div>
                <PatientRecord
                  record={patientRecord.data.getPatientRecord}
                  from="patient"
                  deletePatient={deletePatientRec}
                />
              </div>
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
