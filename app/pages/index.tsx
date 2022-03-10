import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { SvgTemplate, CollapseContainer } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [shape, setShape] = React.useState("halo0");
  const [rhythm, setRhythm] = React.useState("10");
  return (
    <div className={styles.container}>
      <Head>
        <title>Wand Factory</title>
        <meta
          name="description"
          content="App for playing around with Wand settings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Wand Factory</h1>
      <main className={styles.main}>
        <div className={styles.tools}>
          <h2>Tools</h2>
          <CollapseContainer title="Halo">
            <select value={shape} onChange={(ev) => setShape(ev.target.value)}>
              <option value="halo0">halo0</option>
              <option value="halo1">halo1</option>
              <option value="halo2">halo2</option>
              <option value="halo3">halo3</option>
              <option value="halo4">halo4</option>
              <option value="halo5">halo5</option>
            </select>
            <input
              type="text"
              value={rhythm}
              onChange={(ev) => setRhythm(ev.target.value.slice(0, 24))}
            />
          </CollapseContainer>
        </div>
        <div className={styles.wandImage}>
          <SvgTemplate
            title="Hello World"
            starsSeed={123}
            planets={[
              { x: -114, y: 370 },
              { x: -225, y: 334 },
              { x: -227, y: 379 },
              { x: 121, y: 295 },
              { x: -19, y: 357 },
              { x: 361, y: 13 },
              { x: 176, y: 259 },
              { x: -156, y: 388 },
            ]}
            aspects={[
              { x1: 259, y1: 26, x2: -91, y2: -244 },
              { x1: 259, y1: 26, x2: -259, y2: -26 },
              { x1: 83, y1: 247, x2: 84, y2: 246 },
              { x1: 83, y1: 247, x2: 258, y2: 34 },
              { x1: 87, y1: 245, x2: 258, y2: 30 },
              { x1: 248, y1: 77, x2: 191, y2: -177 },
            ]}
            background={{ hue: 90, bg0: true }}
            halo={{
              [shape]: true,
              rhythm: Array.from(
                { length: 24 },
                (v, i) => rhythm[i % rhythm.length] !== "0"
              ),
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
