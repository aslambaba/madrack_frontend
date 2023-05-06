import { useState } from "react";
import MainHeader from "@/components/header/mainheader";
import { Amplify, Auth } from "aws-amplify";
import CognitoConfig from "../utils/aws-cognito-export";
import { useAuth } from "../utils/userLoggedIn";
import styles from "./dashboardstyle.module.css";
import PatientDashboard from "./patientDashboard";
import DoctorDashboard from "./doctorDashboard";
import AdminDashbord from "./adminDashboard";

Amplify.configure(CognitoConfig);

export default function Dashboard() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState({
    username: "",
    groupname: "",
    status: false,
  });
  useAuth(setIsUserLoggedIn);
  console.log(isUserLoggedIn);
  return (
    <>
      <MainHeader isUserLoggedIn={isUserLoggedIn.status} />
      <div className={styles.dashboardContainer}>
        {isUserLoggedIn.groupname == "Patient" ? (
          <>
            <h2>Patient Dashboard</h2>
            <PatientDashboard />
          </>
        ) : (
          <></>
        )}
        {isUserLoggedIn.groupname == "Doctors" ? (
          <>
            <h2>Doctors Dashboard</h2>
            <DoctorDashboard />
          </>
        ) : (
          <></>
        )}
        {isUserLoggedIn.groupname == "Admin" ? (
          <>
            <>
              <h2>Madrack team Dashboard</h2>
              <AdminDashbord />
            </>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
