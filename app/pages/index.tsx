import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { SvgTemplate, CollapseContainer, EmbossLayerForm } from "../components";
import styles from "../styles/Home.module.css";
import { embossPresets } from "../components/settings/embossPresets";
import { EmbossLayer } from "../components/SvgTemplate";

const baseEmboss = {
  lightType: "point",
  surfaceScale: 5,
  specConstant: 5,
  specExponent: 20,
  lightColor: "#ffffff",
  pointX: -50,
  pointY: -100,
  pointZ: 2000,
  opacity: 1,
  blurX: 0,
  blurY: 0,
  pointsAtX: 0,
  pointsAtY: 0,
  pointsAtZ: 0,
  limitingConeAngle: 15,
};

const Home: NextPage = () => {
  const [shape, setShape] = React.useState("halo0");
  const [rhythm, setRhythm] = React.useState("10");
  const [handle, setHandle] = React.useState("handle0");
  const [embossLayers, setEmbossLayers] = React.useState(embossPresets);

  const addEmboss = () => {
    const newEmbossLayers = [...embossLayers, Object.create(baseEmboss)];

    setEmbossLayers(newEmbossLayers);
  };

  const removeEmbossLayer = (index: number) => {
    const layers: EmbossLayer[] = [...embossLayers];
    layers.splice(index, 1);
    setEmbossLayers(layers);
  };

  const changeVal = (index: number, key: keyof EmbossLayer, value: any) => {
    const layers: EmbossLayer[] = [...embossLayers];
    const layer = layers[index];
    layer[key] = value;
    setEmbossLayers(layers);
  };
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
          <div className={styles.toolList}>
            <CollapseContainer title="Halo">
              <select
                value={shape}
                onChange={(ev) => setShape(ev.target.value)}
              >
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
            <CollapseContainer title="Handle">
              <select
                value={handle}
                onChange={(ev) => setHandle(ev.target.value)}
              >
                <option value="handle0">handle0</option>
                <option value="handle1">handle1</option>
                <option value="handle2">handle2</option>
                <option value="handle3">handle3</option>
              </select>
            </CollapseContainer>
            <CollapseContainer title="Emboss Layers">
              <ul>
                {embossLayers.map((layer, index) => (
                  <EmbossLayerForm
                    layer={layer}
                    index={index}
                    removeLayer={removeEmbossLayer}
                    changeVal={changeVal}
                    key={`emboss_${index}`}
                  />
                ))}
              </ul>
              <button onClick={addEmboss}>Add Emboss Layer</button>
            </CollapseContainer>
          </div>
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
            handle={{ [handle]: true }}
            filter={{ layers: embossLayers }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
