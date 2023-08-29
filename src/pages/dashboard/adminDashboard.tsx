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
} from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import loginVector from "../../../public/loginVector.jpg";
import PopupModal from "@/components/editProfile/popupModel";
import ObjectBar from "@/components/objectBar/objectBar";
import { getAllPatients, getPatientRecord } from "../../../queries/patients";
import { useQuery, useLazyQuery } from "@apollo/client";
import PatientRecord from "@/components/patients/patientRecord";

const AdminDashbord = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const [patientID, setPatientID] = useState("");
  const getPatientRec = useQuery(getAllPatients);

  let [getpatient, singlePatientRecord] = useLazyQuery(getPatientRecord, {
    variables: { patientId: patientID },
  });
  if (singlePatientRecord.data) {
    console.log(singlePatientRecord.data);
  }
  if (getPatientRec.error) {
    console.log(getPatientRec.error);
  }
  let Patinets = [];
  if (getPatientRec.data) {
    Patinets = getPatientRec.data.getAllPatients;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 15;
  const totalPages = Math.ceil(Patinets.length / studentsPerPage);

  const prevButtonDisabled = currentPage === 1;
  const nextButtonDisabled = currentPage === totalPages;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = Patinets.slice(startIndex, endIndex);
  return (
    <>
      <Row>
        <Col lg={3} md={3}>
          <div className={styles.dashboardProfileSec}>
            <div className={styles.adminMenu}>
              <ul>
                <li
                  onClick={() => {
                    setCurrentTab("home");
                  }}
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    setCurrentTab("patients");
                  }}
                >
                  Patients
                </li>
                <li
                  onClick={() => {
                    setCurrentTab("doctors");
                  }}
                >
                  Doctors
                </li>
                <li
                  onClick={() => {
                    setCurrentTab("applicationRequest");
                  }}
                >
                  Application Request
                </li>
              </ul>
            </div>
          </div>
        </Col>
        <Col lg={9} md={9}>
          <div className={styles.dashboardReportsSec}>
            {currentTab == "home" ? (
              <>
                <h3>Home</h3>
              </>
            ) : (
              <></>
            )}
            {currentTab == "patients" ? (
              <>
                <h3>Patients</h3>
                <br />
                {patientID == "" ? (
                  <>
                    <ul>
                      {currentStudents.map((pat: any) => (
                        <ObjectBar
                          type="patients"
                          data={pat}
                          setId={setPatientID}
                          fetchData={getpatient}
                        />
                      ))}
                    </ul>
                    <div>
                      <button
                        className={styles.paginationButton}
                        disabled={prevButtonDisabled}
                        onClick={() => handleClick(currentPage - 1)}
                      >
                        Prev
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNumber) => (
                          <button
                            key={pageNumber}
                            className={styles.paginationButton}
                            onClick={() => handleClick(pageNumber)}
                            style={{
                              fontWeight:
                                pageNumber === currentPage ? "bold" : "normal",
                            }}
                            disabled={pageNumber === currentPage}
                          >
                            {pageNumber}
                          </button>
                        )
                      )}
                      <button
                        className={styles.paginationButton}
                        disabled={nextButtonDisabled}
                        onClick={() => handleClick(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={() => setPatientID("")}>Back</button>
                    <PatientRecord
                      from="doctor"
                      record={singlePatientRecord.data.getPatientRecord}
                    />
                  </>
                )}
              </>
            ) : (
              <></>
            )}
            {currentTab == "doctors" ? (
              <>
                <h3>Doctors</h3>
                <br />
                <ul>
                  {currentStudents.map((student) => (
                    <ObjectBar type="doctors" />
                  ))}
                </ul>
                <div>
                  <button
                    className={styles.paginationButton}
                    disabled={prevButtonDisabled}
                    onClick={() => handleClick(currentPage - 1)}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        className={styles.paginationButton}
                        onClick={() => handleClick(pageNumber)}
                        style={{
                          fontWeight:
                            pageNumber === currentPage ? "bold" : "normal",
                        }}
                        disabled={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}
                  <button
                    className={styles.paginationButton}
                    disabled={nextButtonDisabled}
                    onClick={() => handleClick(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
            {currentTab == "applicationRequest" ? (
              <>
                <h3>Application Request</h3>
                <br />
                <ul>
                  {currentStudents.map((student) => (
                    <ObjectBar type="request" />
                  ))}
                </ul>
                <div>
                  <button
                    className={styles.paginationButton}
                    disabled={prevButtonDisabled}
                    onClick={() => handleClick(currentPage - 1)}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        className={styles.paginationButton}
                        onClick={() => handleClick(pageNumber)}
                        style={{
                          fontWeight:
                            pageNumber === currentPage ? "bold" : "normal",
                        }}
                        disabled={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}
                  <button
                    className={styles.paginationButton}
                    disabled={nextButtonDisabled}
                    onClick={() => handleClick(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
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
export default AdminDashbord;
