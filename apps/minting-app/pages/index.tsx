import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";

import ConnectAccount from "../components/ConnectButton";
import { SvgTemplate } from "../components";
import StonePicker from "../components/stonePicker";
import styles from "../styles/Home.module.css";
import CornerGilding from "../components/Gilding/Corners";
import CenterGilding from "../components/Gilding/Center";

import HaloPicker from "../components/halo-picker";
import ColorPicker from "../components/color-picker";
import MintButton from "../components/mint-button";
import bgImage from "../public/test-bg-small.jpg";
import PickerLabels from "../components/PickerLabels";
import IconButton from "../components/IconButton";
import { useAccount } from "wagmi";
import { constants } from "ethers";
import { keccak256 } from "ethers/lib/utils";

const Home: NextPage = () => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <Head>
        <title>Minting App</title>
        <meta name="description" content="Minting app for Zodiac NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CornerGilding />
        <div className={styles.centerContainer}>
          <CenterGilding />
          <MintButton />
          <PickerLabels />
          <div className={styles.svgPreview}>
            <SvgTemplate />
          </div>
          <div className={styles.colorPicker}>
            <ColorPicker />
          </div>
          <div className={styles.stonePicker}>
            <StonePicker />
          </div>
          <div className={styles.haloPicker}>
            <HaloPicker />
          </div>
        </div>
        <div className={styles.AccountConnect}>
          <ConnectAccount />
        </div>

        <div className={styles.downloadButtons}>
          <IconButton icon="FullDownload" />
          <IconButton icon="PfpDownload" />
        </div>
      </main>
    </div>
  );
};

export default Home;
