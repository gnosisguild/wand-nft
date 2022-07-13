import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useAppContext } from "../state";
import { SvgTemplate } from "../components";
import StonePicker from "../components/stonePicker";
import styles from "../styles/Home.module.css";
import CornerGilding from "../components/Gilding/Corners";
import CenterGilding from "../components/Gilding/Center";
import { AppState, TemplateInput } from "../types";
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
  stoneList,
  xp,
} from "../template";
import HaloPicker from "../components/halo-picker";
import ColorPicker from "../components/color-picker";
import IconButton from "../components/IconButton";

const Home: NextPage = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Minting App</title>
        <meta name="description" content="Minting app for Zodiac NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CornerGilding />
        <div className={styles.centerContainer}>
          <CenterGilding />
          <div className={styles.svgPreview}>
            <SvgTemplate input={deriveTemplateInput(state)} />
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

        <div className={styles.iconTest}>
          <IconButton thickBorder icon="Dark" />
          <IconButton thickBorder icon="Light" />
          <IconButton thickBorder icon="Radial" />
          <IconButton thickBorder icon="Linear" />
          <IconButton icon="PickerStone" />
          <IconButton icon="PickerAura" />
          <IconButton icon="PickerHalo" />
          <IconButton thickBorder icon="Halo0" />
          <IconButton thickBorder icon="Halo1" />
          <IconButton thickBorder icon="Halo2" />
          <IconButton thickBorder icon="Halo3" />
          <IconButton thickBorder icon="Halo4" />
          <IconButton thickBorder icon="Halo5" />
        </div>
      </main>
    </div>
  );
};

export default Home;

const deriveTemplateInput = (state: AppState): TemplateInput => ({
  planets: scalePlanets(
    calculatePlanets(state.latitude, state.longitude, 0, new Date())
  ),
  aspects: scaleAspects(
    calculateAspects(state.latitude, state.longitude, 0, new Date())
  ),
  halo: generateHalo(state.halo.shape, state.halo.rhythm, state.background.hue),
  frame: {
    level1: true,
    title: generateName(state.tokenId),
  },
  background: state.background,
  filterLayers,
  sparkles: generateSparkles(state.tokenId),
  seed: state.tokenId,
  stone: stoneList[state.stone],
  xp,
  handle: generateHandle(state.handle),
});
