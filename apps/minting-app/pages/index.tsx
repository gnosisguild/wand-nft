import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useAppContext } from "../context/AppContext";
import { SvgTemplate } from "../components";
import { ColorPicker } from "../components";
import StonePicker from "../components/stonePicker";
import styles from "../styles/Home.module.css";
import CornerGilding from "../components/Gilding/Corners";
import CenterGilding from "../components/Gilding/Center";

const Home: NextPage = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Minting App</title>
        <meta name="description" content="Minting app for Zodiac NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CornerGilding />
        <div className={styles.centerContainer}>
          <CenterGilding />
          <div className={styles.svgPreview}>
            <SvgTemplate settings={state} />
          </div>
          <div className={styles.colorPicker}>
            <ColorPicker />
          </div>
          <div className={styles.stonePicker}>
            <StonePicker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
