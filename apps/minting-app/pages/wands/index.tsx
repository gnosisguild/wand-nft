import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";

import ConnectAccount from "../../components/ConnectButton";
import { useAppContext } from "../../state";
import styles from "../../styles/Home.module.css";
import CornerGilding from "../../components/Gilding/Corners";
import wandContract from "../../utils/contract";
import bgImage from "../../public/test-bg-small.jpg";

const Home: NextPage = () => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <Head>
        <title>Zodiac Wands</title>
        <meta name="description" content="Minting app for Zodiac NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CornerGilding />
        wands -___-
        <div className={styles.AccountConnect}>
          <ConnectAccount />
        </div>
      </main>
    </div>
  );
};

export default Home;
