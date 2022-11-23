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
import IconButton from "../components/IconButton";
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
import Tooltip from "../components/Tooltip";

const Home: NextPage = () => {
  useHandleClock();

  const { state, dispatch } = useAppContext();
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
      {!state.showJourney && (
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
              <div
                className={styles.readMoreLink}
                onClick={() => dispatch({ type: "ChangeJourney", value: true })}
              >
                Read More
              </div>
            </div>
          </Modal>
        </div>
      )}
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
        <Tooltip content="Learn about Wand NFTs">
          <IconButton
            icon="Intro"
            onClick={() => dispatch({ type: "ChangeJourney", value: true })}
          />
        </Tooltip>
        <Tooltip content="Download your NFT image">
          <FullDownloadButton />
        </Tooltip>
        <Tooltip content="Download your square PFP image">
          <PFPDownloadButton />
        </Tooltip>
      </div>
      {state.showJourney && (
        <JourneyModal
          onClose={() => dispatch({ type: "ChangeJourney", value: false })}
        />
      )}
    </Layout>
  );
};

export default Home;
