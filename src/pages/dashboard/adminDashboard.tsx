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
import ObjectBar from "@/components/objectBar/objectBar";

const AdminDashbord = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("home");

  const students = [
    { name: "1Aslam" },
    { name: "2Usama" },
    { name: "3Yasin" },
    { name: "4Rehan" },
    { name: "5Iqbal" },
    { name: "6Asif" },
    { name: "7Aslam" },
    { name: "8Usama" },
    { name: "9Yasin" },
    { name: "10Rehan" },
    { name: "11Iqbal" },
    { name: "12Asif" },
    { name: "13Aslam" },
    { name: "14Usama" },
    { name: "15Yasin" },
    { name: "16Rehan" },
    { name: "17Iqbal" },
    { name: "18Sarfraz" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 15;
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const prevButtonDisabled = currentPage === 1;
  const nextButtonDisabled = currentPage === totalPages;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);
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
                <ul>
                  {currentStudents.map((student) => (
                    <ObjectBar type="patients"/>
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
            {currentTab == "doctors" ? (
              <>
                <h3>Doctors</h3>
                <br />
                <ul>
                  {currentStudents.map((student) => (
                    <ObjectBar type="doctors"/>
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
                    <ObjectBar type="request"/>
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
