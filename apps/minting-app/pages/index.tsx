import type { NextPage } from "next";
import React from "react";
import classNames from "classnames";
import "@rainbow-me/rainbowkit/styles.css";

import { useAppContext } from "../state";
import SvgTemplate from "../components/SvgTemplate";
import StonePicker from "../components/StonePicker";
import styles from "../styles/Home.module.css";
import CenterGilding from "../components/Gilding/Center";
import HaloPicker from "../components/HaloPicker";
import ColorPicker from "../components/ColorPicker";
import PickerLabels from "../components/PickerLabels";
import RecastButton from "../components/IconButton/RecastButton";
import Layout from "../components/Layout";
import HandleClock from "../components/HandleClock";
import Sparkles from "../components/Sparkles";
import Music from "../components/Music";
import * as Tone from "tone";
import {
  FullDownloadButton,
  PFPDownloadButton,
} from "../components/DownloadButton";

const Home: NextPage = () => {
  const { state } = useAppContext();
  const { minting } = state;

  const mintingClasses = [
    styles.animateOnMint,
    {
      [styles.minting]: minting,
    },
  ];

  return (
    <Layout description="Zodiac Wands Minting App">
      <div className={styles.centerContainer}>
        <CenterGilding className={classNames(mintingClasses)} />
        <PickerLabels className={classNames(mintingClasses, styles.hasSvg)} />
        <Sparkles />
        <div
          className={classNames(styles.svgPreview, {
            [styles.mintingPreview]: minting,
          })}
        >
          <SvgTemplate />
        </div>
        <div className={classNames(styles.colorPicker, mintingClasses)}>
          <ColorPicker />
        </div>
        <div className={classNames(styles.stonePicker, mintingClasses)}>
          <StonePicker />
        </div>
        <div className={classNames(styles.haloPicker, mintingClasses)}>
          <HaloPicker />
        </div>
      </div>

      <div className={classNames(styles.recastButton, mintingClasses)}>
        <RecastButton />
      </div>
      <div className={classNames(styles.downloadButtons, mintingClasses)}>
        <FullDownloadButton />
        <PFPDownloadButton />
      </div>
      <HandleClock />
      <Music />
    </Layout>
  );
};

export default Home;
