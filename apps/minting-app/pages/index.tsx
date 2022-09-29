import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
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
import Modal from "../components/Modal";

const Home: NextPage = () => {
  useHandleClock();

  const { state } = useAppContext();
  const { stage } = state;
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  return (
    <Layout
      description="Zodiac Wands Minting App"
      className={styles.createLayout}
    >
      <MintingToast />
      <div
        className={classNames(styles.centerContainer, styles.hideNarrowScreen, {
          [styles.mobileDevice]: isMobile,
        })}
      >
        <CenterGilding className={classNames(mintingClasses)} />
        <MintButton />
        <PickerLabels className={classNames(mintingClasses, styles.hasSvg)} />
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
      <div
        className={classNames(styles.forceDesktop, {
          [styles.mobileDevice]: isMobile,
        })}
      >
        <Modal onClose={() => {}}>
          <div className={styles.forceDesktopMessage}>
            <p>
              The Wand Conjuror is only available on wide format, desktop
              displays.
            </p>
            <p>Please come back on another machine.</p>
          </div>
        </Modal>
      </div>

      <div
        className={classNames(
          styles.recastButton,
          mintingClasses,
          styles.hideNarrowScreen,
          { [styles.mobileDevice]: isMobile }
        )}
      >
        <RecastButton />
      </div>

      <div
        className={classNames(
          styles.downloadButtons,
          mintingClasses,
          styles.hideNarrowScreen,
          { [styles.mobileDevice]: isMobile }
        )}
      >
        <FullDownloadButton />
        <PFPDownloadButton />
      </div>
      <JourneyModal />
    </Layout>
  );
};

export default Home;
