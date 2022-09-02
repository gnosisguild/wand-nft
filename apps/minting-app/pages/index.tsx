import type { NextPage } from "next";
import React from "react";
import { useAppContext } from "../state";
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
import classNames from "classnames";

const Home: NextPage = () => {
  const { state, dispatch } = useAppContext();
  const { minting } = state;
  console.log(minting);

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
        <IconButton icon="FullDownload" />
        <IconButton icon="PfpDownload" />
      </div>
      <HandleClock />
    </Layout>
  );
};

export default Home;
