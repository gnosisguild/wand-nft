import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useAppContext } from "../state";
import { SvgTemplate } from "../components";
import StonePicker from "../components/stonePicker";
import styles from "../styles/Home.module.css";
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

const Home: NextPage = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Minting App</title>
        <meta
          name="description"
          content="App for playing around with Wand settings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Minting App</h1>
      <main className={styles.main}>
        <div className={styles.wandImage}>
          <SvgTemplate input={deriveTemplateInput(state)} />
        </div>
        <div className={styles.ui}>
          <StonePicker />
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
