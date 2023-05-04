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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useAuth(setIsUserLoggedIn);
  return (
    <>
      <MainHeader isUserLoggedIn={isUserLoggedIn} />
      <div className={styles.dashboardContainer}>
        <h2>Dashboard</h2>
        {/* <PatientDashboard/> */}
        {/* <DoctorDashboard/> */}
        <AdminDashbord />
      </div>
    </>
  );
}
