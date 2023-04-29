import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./styling.module.css";
import Link from "next/link";
import React from "react";
import { Amplify, Auth } from "aws-amplify";
import CognitoConfig from "@/pages/utils/aws-cognito-export";
import { useRouter } from "next/router";
Amplify.configure(CognitoConfig);
interface LoginProps {
  isUserLoggedIn: boolean;
}
const MainHeader: React.FC<LoginProps> = ({ isUserLoggedIn }) => {
  const router = useRouter();

  function handleSignOut() {
    Auth.signOut()
      .then(() => {
        console.log("User signed out");
        router.replace("login");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.MainHeader}>
      <Row>
        <Col lg={6}>
          <div className={styles.MainHeaderSec1}>
            <Link style={{ textDecoration: "none" }} href="/">
              <h2>MadRack</h2>
            </Link>
          </div>
        </Col>
        <Col lg={6}>
          <div className={styles.MainHeaderSec2}>
            {isUserLoggedIn ? (
              <>
                <Link href="/login">
                  <button onClick={handleSignOut}>SignOut</button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button>Login</button>
                </Link>
                <Link href="/register">
                  <button>Register</button>
                </Link>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default MainHeader;
