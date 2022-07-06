import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useAppContext } from "../context/AppContext";
import { SvgTemplate } from "../components";
import { ColorPicker } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Minting App</title>
        <meta
          name="description"
          content="App for playing around with Wand settings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Minting App</h1>
      <main className={styles.main}>
        <div className={styles.wandImage}>
          <SvgTemplate settings={state} />
        </div>
        <div className={styles.colorPicker}>
          <ColorPicker />
        </div>
      </main>
    </div>
  );
};

export default Home;
