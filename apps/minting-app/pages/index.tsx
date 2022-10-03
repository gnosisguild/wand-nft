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
import MintingToast from "../components/MintingToast";
import JourneyModal from "../components/JourneyModal";
import {
  FullDownloadButton,
  PFPDownloadButton,
} from "../components/DownloadButton";
import { MintStage } from "../types";
import useHandleClock from "../components/useHandleClock";
import MintButton from "../components/MintButton";

const Home: NextPage = () => {
  useHandleClock();

  const { state } = useAppContext();
  const { stage } = state;

  const isMinting =
    stage == MintStage.SIGNING ||
    stage == MintStage.TRANSACTING ||
    stage == MintStage.SUCCESS;

  const mintingClasses = [
    styles.animateOnMint,
    {
      [styles.minting]: isMinting,
    },
  ];

  const showJourneyModal = true;

  return (
    <Layout
      description="Zodiac Wands Minting App"
      className={styles.createLayout}
    >
      {!showJourneyModal && (
        <>
          <MintingToast />
          <div className={styles.centerContainer}>
            <CenterGilding className={classNames(mintingClasses)} />
            <MintButton />
            <PickerLabels
              className={classNames(mintingClasses, styles.hasSvg)}
            />
            <div
              className={classNames(styles.svgPreview, {
                [styles.mintingPreview]: isMinting,
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
        </>
      )}

      <div className={classNames(styles.recastButton, mintingClasses)}>
        <RecastButton />
      </div>

      <div className={classNames(styles.downloadButtons, mintingClasses)}>
        <FullDownloadButton />
        <PFPDownloadButton />
      </div>
      <JourneyModal />
    </Layout>
  );
};

export default Home;
