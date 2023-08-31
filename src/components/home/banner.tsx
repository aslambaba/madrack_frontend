import { useEffect, useRef } from "react";
import styles from "./homestyle.module.css";
import BannerImage from "../../../public/banner.jpg";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;
      textElement.classList.add(styles.slideUp);
    }
  }, []);

  return (
    <div className={styles.banner}>
      <Image alt="madrack banner" src={BannerImage} className={styles.backgroundImage} />
      <div className={styles.overlay}></div>
      <div ref={textRef} className={styles.text}>
        <h1>Effortless Checkups, Seamless Health</h1>
        <p>Take control of your health today. Register on our platform for seamless access to personalized care and effortless checkups</p>
        <Link href="/register"><button>Register</button></Link>
      </div>
    </div>
  );
};

export default Banner;
