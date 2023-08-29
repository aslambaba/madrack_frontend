import { useEffect, useState } from "react";
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
import loginVector from "../../../public/loginVector.jpg";
import PatientRecord from "@/components/patients/patientRecord";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { getPatientRecordByEmail } from "../../../queries/patients";
import { GetDoctorRecord } from "../../../queries/doctors";
import { Update_Doctor } from "../../mutations/doctors";

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
interface PatientProps {
  username: string;
}

const DoctorEditProfilePopup: React.FC<any> = ({
  username,
  setEditProfileSec,
  RefetchData,
}) => {
  let [updateDoctor] = useMutation(Update_Doctor);

  const initialValues = {
    name: "",
    cnic: "",
    email: "as@gmail.com",
    phoneNumber: "",
    clinicAddress: "",
    degrees: [{ degreeName: "", instituteName: "", passingYear: "" }],
    experiences: [{ positionName: "", hospitalName: "" }],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    cnic: Yup.string().required("CNIC is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    clinicAddress: Yup.string().required("Clinic address is required"),
    degrees: Yup.array().of(
      Yup.object().shape({
        degreeName: Yup.string().required("Degree name is required"),
        instituteName: Yup.string().required("Institute name is required"),
        passingYear: Yup.string().required("Passing year is required"),
      })
    ),
    experiences: Yup.array().of(
      Yup.object().shape({
        positionName: Yup.string().required("Position name is required"),
        hospitalName: Yup.string().required("Hospital name is required"),
      })
    ),
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
    await updateDoctor({
      variables: {
        name: values.name,
        doctor_id: username,
        CNICNumber: values.cnic,
        email: values.email,
        type: "Doctor",
        phoneNumber: values.phoneNumber,
        clinicAddress: values.clinicAddress,
        degree: values.degrees,
        experience: values.experiences,
      },
    });
    setEditProfileSec(false);
    RefetchData();
  };

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <button
          className={styles.removeItemBtn}
          onClick={() => setEditProfileSec(false)}
        >
          Cancel
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={styles.FieldContainer}>
            <Row>
              <Col lg={6}>
                <div className={styles.Field}>
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.Field}>
                  <label htmlFor="cnic">CNIC</label>
                  <Field type="text" id="cnic" name="cnic" />
                  <ErrorMessage name="cnic" component="div" className="error" />
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.Field}>
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" disabled />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.Field}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field type="text" id="phoneNumber" name="phoneNumber" />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.Field}>
                  <label htmlFor="clinicAddress">Clinic Address</label>
                  <Field
                    as="textarea"
                    id="clinicAddress"
                    name="clinicAddress"
                  />
                  <ErrorMessage
                    name="clinicAddress"
                    component="div"
                    className="error"
                  />
                </div>
              </Col>
            </Row>

            <div>
              <label>Degrees</label>
              <FieldArray name="degrees">
                {({ push, remove }) => (
                  <>
                    {values.degrees.map((_, index) => (
                      <div key={index}>
                        <Row>
                          <Col lg={6}>
                            <div className={styles.Field}>
                              <label htmlFor={`degrees[${index}].degreeName`}>
                                Degree Name
                              </label>
                              <Field
                                type="text"
                                id={`degrees[${index}].degreeName`}
                                name={`degrees[${index}].degreeName`}
                              />
                              <ErrorMessage
                                name={`degrees[${index}].degreeName`}
                                component="div"
                                className="error"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className={styles.Field}>
                              <label
                                htmlFor={`degrees[${index}].instituteName`}
                              >
                                Institute Name
                              </label>
                              <Field
                                type="text"
                                id={`degrees[${index}].instituteName`}
                                name={`degrees[${index}].instituteName`}
                              />
                              <ErrorMessage
                                name={`degrees[${index}].instituteName`}
                                component="div"
                                className="error"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className={styles.Field}>
                              <label htmlFor={`degrees[${index}].passingYear`}>
                                Passing Year
                              </label>
                              <Field
                                type="text"
                                id={`degrees[${index}].passingYear`}
                                name={`degrees[${index}].passingYear`}
                              />
                              <ErrorMessage
                                name={`degrees[${index}].passingYear`}
                                component="div"
                                className="error"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <button
                              style={{ marginTop: "30px" }}
                              className={styles.removeItemBtn}
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove Degree
                            </button>
                          </Col>
                        </Row>
                      </div>
                    ))}

                    <button
                      style={{ marginLeft: "30px" }}
                      className={styles.addItemBtn}
                      type="button"
                      onClick={() =>
                        push({
                          degreeName: "",
                          instituteName: "",
                          passingYear: "",
                        })
                      }
                    >
                      Add Degree
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            <div>
              <label>Experiences</label>
              <FieldArray name="experiences">
                {({ push, remove }) => (
                  <>
                    {values.experiences.map((_, index) => (
                      <div key={index}>
                        <Row>
                          <Col lg={6}>
                            <div className={styles.Field}>
                              <label
                                htmlFor={`experiences[${index}].positionName`}
                              >
                                Position Name
                              </label>
                              <Field
                                type="text"
                                id={`experiences[${index}].positionName`}
                                name={`experiences[${index}].positionName`}
                              />
                              <ErrorMessage
                                name={`experiences[${index}].positionName`}
                                component="div"
                                className="error"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className={styles.Field}>
                              <label
                                htmlFor={`experiences[${index}].hospitalName`}
                              >
                                Hospital Name
                              </label>
                              <Field
                                type="text"
                                id={`experiences[${index}].hospitalName`}
                                name={`experiences[${index}].hospitalName`}
                              />
                              <ErrorMessage
                                name={`experiences[${index}].hospitalName`}
                                component="div"
                                className="error"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <button
                              style={{ marginTop: "30px" }}
                              className={styles.removeItemBtn}
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove Experience
                            </button>
                          </Col>
                        </Row>
                      </div>
                    ))}

                    <button
                      style={{ marginLeft: "30px" }}
                      className={styles.addItemBtn}
                      type="button"
                      onClick={() =>
                        push({ positionName: "", hospitalName: "" })
                      }
                    >
                      Add Experience
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            <button className={styles.addItemBtn} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const DoctorDashboard: React.FC<PatientProps> = ({ username }) => {
  const [newRecordPopup, setNewRecordPopup] = useState<boolean>(false);
  const [EditProfileSec, setEditProfileSec] = useState(false);
  const [profileComplete, setProfileComplete] = useState<boolean>();

  const [patientID, setPatientID] = useState("");

  let getDoctorRecord = useQuery(GetDoctorRecord, {
    variables: { doctorId: username },
  });
  let [getpatient, patientRecord] = useLazyQuery(getPatientRecordByEmail, {
    variables: { email: patientID },
  });
  function RefetchData() {
    getDoctorRecord.refetch();
  }
  if (patientRecord.data) {
    console.log(patientRecord);
  }
  if (patientRecord.error) {
    alert("Not FOunt");
  }
  return (
    <>
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
            {getDoctorRecord.data ? (
              <>
                <h3>{getDoctorRecord.data.getDoctorRecord.name || "Na"}</h3>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Full Name</b>
                  </p>
                  <p>{getDoctorRecord.data.getDoctorRecord.name || "Na"}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>CNIC</b>
                  </p>
                  <p>
                    {getDoctorRecord.data.getDoctorRecord.CNICNumber || "Na"}
                  </p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Email</b>
                  </p>
                  <p>{getDoctorRecord.data.getDoctorRecord.email || "Na"}</p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Phone Number</b>
                  </p>
                  <p>
                    {getDoctorRecord.data.getDoctorRecord.phoneNumber || "Na"}
                  </p>
                </div>
                <div className={styles.personalInfo}>
                  <p>
                    <b>Address</b>
                  </p>
                  <br />
                  <p>
                    {getDoctorRecord.data.getDoctorRecord.clinicAddress || "Na"}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}

            <button onClick={() => setEditProfileSec(true)}>
              Edit Profile
            </button>
          </div>
        </Col>
        <Col lg={8} md={8}>
          <div className={styles.dashboardReportsSec}>
            {EditProfileSec ? (
              <>
                <DoctorEditProfilePopup
                  username={username}
                  setEditProfileSec={setEditProfileSec}
                  RefetchData={RefetchData}
                />
              </>
            ) : (
              <>
                {getDoctorRecord.data ? (
                  <>
                    {getDoctorRecord.data.getDoctorRecord.CNICNumber != null &&
                    getDoctorRecord.data.getDoctorRecord.clinicAddress !=
                      null ? (
                      <>
                        <div className={styles.requestPatientRec}>
                          <input
                            value={patientID}
                            placeholder="Patient ID"
                            required
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setPatientID(event.target.value);
                            }}
                          ></input>
                          <button
                            onClick={() => {
                              setNewRecordPopup(true);
                              getpatient();
                            }}
                          >
                            Search
                          </button>
                        </div>
                        {newRecordPopup ? (
                          <>
                            {patientRecord.data ? (
                              <>
                                <PatientRecord
                                  from="doctor"
                                  record={
                                    patientRecord.data.getPatientRecordByEmail
                                  }
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <p className={styles.CompleteProfileWarrning}>
                          Please Complete the Profile to See Any Reports !!
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default DoctorDashboard;
