import React from "react";
import styles from "./homestyle.module.css";
import AboutUsImage from "../../../public/aboutus.jpg";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className={styles.AboutUscontainer}>
      <h2>About Us</h2>
      <Row>
        <Col lg={6} md={12} sm={12}>
          <Image
            src={AboutUsImage}
            alt="About Us Team"
            className={styles.aboutusImg}
          />
        </Col>
        <Col lg={6} md={12} sm={12}>
          <div className={styles.aboutUsContent}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              beatae eius explicabo impedit veritatis minus animi. Illum
              deserunt nemo minima veritatis quia! Beatae assumenda temporibus
              facere? Doloribus quisquam eius voluptatum.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
