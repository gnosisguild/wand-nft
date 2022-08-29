import type { NextPage } from "next";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";

import SvgTemplate from "../components/SvgTemplate";
import StonePicker from "../components/StonePicker";
import styles from "../styles/Home.module.css";
import CenterGilding from "../components/Gilding/Center";
import HaloPicker from "../components/HaloPicker";
import ColorPicker from "../components/ColorPicker";
import PickerLabels from "../components/PickerLabels";
import IconButton from "../components/IconButton";
import RecastButton from "../components/IconButton/RecastButton";
import Layout from "../components/Layout";
import HandleClock from "../components/HandleClock";

const Home: NextPage = () => (
  <Layout description="Zodiac Wands Minting App">
    <div className={styles.centerContainer}>
      <CenterGilding />
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

    <div className={styles.recastButton}>
      <RecastButton />
    </div>

    <div className={styles.downloadButtons}>
      <IconButton icon="FullDownload" />
      <IconButton icon="PfpDownload" />
    </div>
    <HandleClock />
  </Layout>
);

export default Home;
