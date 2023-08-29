import Image from "next/image";
import styles from "./homestyle.module.css";
import { Row, Col } from "react-bootstrap";
import Patient from "../../../public/patient.jpg";
import Doctor from "../../../public/doctor.png";
import Link from "next/link";

const Services = () => {
  return (
    <div className={styles.ServicesMainSec}>
      <h2>Services</h2>
      <Row>
        <Col lg={2}></Col>
        <Col lg={4}>
          <Link href="/register">
            <div className={styles.ServiceSec}>
              <Image
                src={Doctor}
                alt="Doctor Service"
                className={styles.servicesImg}
              />
              <p>
                Access patient records, deliver optimal treatment, all online.
              </p>
            </div>
          </Link>
        </Col>
        <Col lg={4}>
          <Link href="/register">
            <div className={styles.ServiceSec}>
              <Image
                src={Patient}
                alt="Patient Service"
                className={styles.servicesImg}
              />
              <p>
                Securely save records, empower your healthcare journey, all
                online.
              </p>
            </div>
          </Link>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </div>
  );
};
export default Services;
