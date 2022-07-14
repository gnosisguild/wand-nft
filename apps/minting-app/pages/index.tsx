import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { useAppContext } from "../context/AppContext";
import { SvgTemplate } from "../components";
import { ColorPicker } from "../components";
import StonePicker from "../components/stonePicker";
import styles from "../styles/Home.module.css";
import { AppState, TemplateInput } from "../types";

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
          <div className={styles.colorPicker}>
            <ColorPicker />
          </div>
          <StonePicker />
        </div>
      </main>
    </div>
  );
};

export default Home;

function deriveTemplateInput(state: TemplateInput): TemplateInput {
  throw new Error("Function not implemented.");
}

// const deriveTemplateInput = (state: AppState): TemplateInput => ({
//   // planets,
//   // aspects,
//   halo: generateHalo(haloShape, haloRhythm, background.color.hue),
//   frame: {
//     level1: true,
//     title: generateName(tokenId),
//   },
//   background: state.background,
//   filterLayers,
//   sparkles: generateSparkles(tokenId),
//   seed: tokenId,
//   stone: stoneList[stone],
//   xp,
//   handle: generateHandle(handle),
// });
