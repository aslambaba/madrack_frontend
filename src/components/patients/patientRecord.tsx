import { Row, Col } from "react-bootstrap";
import styles from "./styling.module.css";
import Image from "next/image";
import loginVector from "../../../public/loginVector.jpg";

interface DoctorsTreated {
  doctorName: String;
  hospitalName: String;
  startDate: String;
  endDate: String;
  doctorDescription: String;
}
interface Disease {
  _id: String;
  diseaseName: String;
  description: String;
  status: String;
  startDate: String;
  endDate: String;
  doctors: [DoctorsTreated];
}
interface PatientRecord {
  fullName: String;
  fatherName: String;
  email: String;
  phoneNumber: String;
  address: String;
  CNICNumber: String;
  disease: [Disease];
}
interface PatientsProps {
  from: String;
  record: PatientRecord;
  deletePatient?(id: String): any;
}
const PatientRecord: React.FC<PatientsProps> = ({
  from,
  record,
  deletePatient,
}) => {
  let disease = record.disease;
  return (
    <div className={styles.newPatientRec}>
      <Row>
        {from == "doctor" ? (
          <>
            <Col lg={8} md={8}>
              <div className={styles.patientPersonalInfo}>
                <h4>{record.fullName}</h4>
                <p>Age: 20 Years</p>
                <p>Gender: Male</p>
                <b>Contact:</b>
                <p>- {record.email}</p>
                <p>- {record.phoneNumber}</p>
                <p>{record.address}</p>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <Image
                alt="Patient Profile"
                src={loginVector}
                width={200}
                height={200}
              />
            </Col>
          </>
        ) : (
          <></>
        )}

        <Col lg={12} md={12}>
          {disease.map((data, id) => {
            const doctors = data.doctors;
            return (
              <div className={styles.diseaseDropdown} key={id}>
                <div className={styles.diseaseHead}>
                  <h4> + {data.diseaseName}</h4>
                  {from == "patient" ? (
                    <>
                      {deletePatient ? (
                        <button
                          onClick={() => {
                            deletePatient(data._id);
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <br />
                <Row>
                  <Col lg={4}>
                    <p>Status: {data.status}</p>
                    <p>start - end</p>
                    <p>
                      {data.startDate} - {data.endDate}
                    </p>
                  </Col>
                  <Col lg={8}>
                    <p>{data.description}</p>
                  </Col>
                </Row>
                {doctors.map((doc, id) => {
                  return (
                    <div className={styles.diseaseDoctorsRec} key={id}>
                      <Row>
                        <Col lg={3}>
                          <p>
                            <b>Doctor Name</b>
                          </p>
                        </Col>
                        <Col lg={9}>
                          <p>{doc.doctorName}</p>
                        </Col>
                        <Col lg={3}>
                          <p>
                            <b>Hospital Name</b>
                          </p>
                        </Col>
                        <Col lg={9}>
                          <p>{doc.hospitalName}</p>
                        </Col>
                        <Col lg={3}>
                          <p>
                            <b>Start Date - End Date</b>
                          </p>
                        </Col>
                        <Col lg={9}>
                          <p>
                            {doc.startDate} - {doc.endDate}
                          </p>
                        </Col>
                        <Col lg={3}>
                          <p>
                            <b>Doctor Review</b>
                          </p>
                        </Col>
                        <Col lg={9}>
                          <p>{doc.doctorDescription}</p>
                        </Col>
                        <Col lg={3}>
                          <p>
                            <b>Reports</b>
                          </p>
                        </Col>
                        <Col lg={8}></Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default PatientRecord;
