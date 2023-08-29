import { Row, Col } from "react-bootstrap";
import styles from "./homestyle.module.css";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className={styles.FooterMainSec}>
      <Row>
        <Col lg={3}>
          <Link href="/" style={{ textDecoration: "none", color: "black" }}>
            <h2>MadRack</h2>
          </Link>
        </Col>
        <Col lg={3}>
          <div>
            <ul>
              <li>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col lg={3}>
          <div>
            <ul>
              <li>
                <Link
                  href="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col lg={3}>
          <div>
            <AiFillFacebook className={styles.socialIcon} />
            <AiFillTwitterSquare className={styles.socialIcon} />
            <AiFillInstagram className={styles.socialIcon} />
            <p className={styles.socialIconText}>Follow Us</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
