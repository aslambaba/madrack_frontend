import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MainHeader from "@/components/header/mainheader";
import Banner from "@/components/home/banner";
import AboutUs from "@/components/home/aboutus";
import Services from "@/components/home/services";
import Footer from "@/components/home/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Make Your Life Easier</title>
        <meta name="description" content="Develop By Aslam Sarfraz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader isUserLoggedIn={false} />
      <Banner/>
      <Services/>
      <AboutUs/>
      <Footer />
    </>
  );
}
