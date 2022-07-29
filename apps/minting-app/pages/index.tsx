import type { NextPage } from "next";
import React, { useMemo } from "react";
import Head from "next/head";
import { useAppContext } from "../state";
import { SvgTemplate } from "../components";
import StonePicker from "../components/stonePicker";
import styles from "../styles/Home.module.css";
import CornerGilding from "../components/Gilding/Corners";
import CenterGilding from "../components/Gilding/Center";
import {
  calculateAspects,
  calculatePlanets,
  filterLayers,
  generateHalo,
  generateHandle,
  generateName,
  generateSparkles,
  scaleAspects,
  scalePlanets,
  interpolateStone,
  xp,
} from "../template";
import HaloPicker from "../components/halo-picker";
import ColorPicker from "../components/color-picker";
import MintButton from "../components/MintButton";
import bgImage from "../public/test-bg-small.jpg";
import PickerLabels from "../components/PickerLabels";
import IconButton from "../components/IconButton";

const Home: NextPage = () => {
  const { state, dispatch } = useAppContext();

  const planets = useMemo(
    () =>
      scalePlanets(
        calculatePlanets(state.latitude, state.longitude, 0, new Date())
      ),
    [state.latitude, state.longitude]
  );
  const aspects = useMemo(
    () =>
      scaleAspects(
        calculateAspects(state.latitude, state.longitude, 0, new Date())
      ),
    [state.latitude, state.longitude]
  );
  const sparkles = useMemo(
    () => generateSparkles(state.tokenId),
    [state.tokenId]
  );
  const halo = useMemo(
    () =>
      generateHalo(
        state.halo.shape,
        state.halo.rhythm,
        state.background.color.hue
      ),
    [state.halo, state.background.color.hue]
  );
  const frame = useMemo(
    () => ({
      level1: true,
      title: generateName(state.tokenId),
    }),
    [state.tokenId]
  );

  const input = useMemo(
    () => ({
      planets,
      aspects,
      halo,
      frame,
      background: state.background,
      filterLayers,
      sparkles,
      seed: state.tokenId,
      stone: interpolateStone(state.stone),
      xp,
      handle: generateHandle(state.handle),
    }),
    [
      planets,
      aspects,
      sparkles,
      halo,
      frame,
      state.tokenId,
      state.handle,
      state.background,
      state.stone,
    ]
  );

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
            <SvgTemplate input={input} />
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

        <div className={styles.downloadButtons}>
          <IconButton icon="FullDownload" />
          <IconButton icon="PfpDownload" />
        </div>
      </main>
    </div>
  );
};

export default Home;
