import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  SvgTemplate,
  CollapseContainer,
  EmbossLayerForm,
  StoneForm,
} from "../components";
import styles from "../styles/Home.module.css";
import { embossPresets } from "../components/settings/embossPresets";
import { EmbossLayer, StoneSettings } from "../components/SvgTemplate";
import { btoa } from "buffer";

const baseStoneSettings = {
  turbType: "fractalNoise",
  turbFreqX: 0.004,
  turbFreqY: 0.007,
  turbOct: 2,
  redAmp: 0.69,
  redExp: -0.43,
  redOff: 0.16,
  greenAmp: 0.61,
  greenExp: -0.66,
  greenOff: -0.63,
  blueAmp: 0.58,
  blueExp: 0.01,
  blueOff: -0.15,
  rotation: 26,
};

const Home: NextPage = () => {
  const [shape, setShape] = React.useState("halo0");
  const [rhythm, setRhythm] = React.useState("10");
  const [background, setBackground] = React.useState("bgRadial0");
  const [sparkle, setSparkle] = React.useState("sparkle0");
  const [handle, setHandle] = React.useState("handle0");
  const [embossLayers, setEmbossLayers] = React.useState(embossPresets);
  const [stoneSettings, setStoneSettings] = React.useState(baseStoneSettings);
  let URLtimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    // set initial state from URL
    const params = new URLSearchParams(window.location.search);
    const settingsBase64 = params.get("settings");
    if (settingsBase64) {
      const decodedSettings = JSON.parse(window.atob(settingsBase64));
      setShape(decodedSettings.shape);
      setRhythm(decodedSettings.rhythm);
      setHandle(decodedSettings.handle);
      setEmbossLayers(decodedSettings.embossLayers);
      setStoneSettings(decodedSettings.stoneSettings);
      setBackground(decodedSettings.background);
      setSparkle(decodedSettings.sparkle);
    }
  }, []);

  useEffect(() => {
    // save wand state to url
    clearTimeout(URLtimer);
    URLtimer = setTimeout(() => {
      const wandState = {
        shape,
        rhythm,
        handle,
        embossLayers,
        stoneSettings,
        background,
        sparkle,
      };

      const base64Settings = window.btoa(JSON.stringify(wandState));
      const params = new URLSearchParams();
      params.set("settings", base64Settings);
      window.history.replaceState(null, "", `?${params.toString()}`);
    }, 100);
  }, [shape, rhythm, handle, embossLayers, stoneSettings, background, sparkle]);

  const addEmboss = () => {
    const newEmbossLayers = [
      ...embossLayers,
      JSON.parse(JSON.stringify(embossLayers[0])),
    ];
    setEmbossLayers(newEmbossLayers);
  };

  const removeEmbossLayer = (index: number) => {
    const layers: EmbossLayer[] = [...embossLayers];
    layers.splice(index, 1);
    setEmbossLayers(layers);
  };

  const changeEmbossVal = (
    index: number,
    key: keyof EmbossLayer,
    value: any
  ) => {
    const layers: EmbossLayer[] = [...embossLayers];
    const layer = layers[index];
    layer[key] = value;
    setEmbossLayers(layers);
  };

  const changeStoneSetting = (key: keyof StoneSettings, value: any) => {
    const settings = { ...stoneSettings };
    settings[key] = value;
    setStoneSettings(settings);
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
            <CollapseContainer title="Background">
              <select
                value={background}
                onChange={(ev) => setBackground(ev.target.value)}
              >
                <option value="bgRadial0">Radial 0</option>
                <option value="bgRadial1">Radial 1</option>
                <option value="bgRadial2">Radial 2</option>
                <option value="bgRadial3">Radial 3</option>
                <option value="bgRadial4">Radial 4</option>
                <option value="bgRadial5">Radial 5</option>
                <option value="bgRadial6">Radial 6</option>
                <option value="bgLinear0">Linear 0</option>
                <option value="bgLinear1">Linear 1</option>
                <option value="bgLinear2">Linear 2</option>
                <option value="bgLinear3">Linear 3 </option>
              </select>
            </CollapseContainer>
            <CollapseContainer title="Sparkle">
              <select
                value={sparkle}
                onChange={(ev) => setSparkle(ev.target.value)}
              >
                <option value="sparkleNone">No Sparkle</option>
                <option value="sparkle0">sparkle 0</option>
                <option value="sparkle1">sparkle 1</option>
                <option value="sparkle2">sparkle 2</option>
                <option value="sparkle3">sparkle 3</option>
                <option value="sparkle4">sparkle 4</option>
                <option value="sparkle5">sparkle 5</option>
              </select>
            </CollapseContainer>
            <CollapseContainer wide title="Emboss Layers">
              <ul>
                {embossLayers.map((layer, index) => (
                  <EmbossLayerForm
                    layer={layer}
                    index={index}
                    removeLayer={removeEmbossLayer}
                    changeVal={changeEmbossVal}
                    key={`emboss_${index}`}
                  />
                ))}
              </ul>
              <button onClick={addEmboss}>Add Emboss Layer</button>
            </CollapseContainer>
            <CollapseContainer wide title="Stone">
              <StoneForm
                settings={stoneSettings}
                changeVal={changeStoneSetting}
              />
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
            background={{ hue: 0, [background]: true }}
            halo={{
              [shape]: true,
              rhythm: Array.from(
                { length: 24 },
                (v, i) => rhythm[i % rhythm.length] !== "0"
              ),
            }}
            handle={{ [handle]: true }}
            filter={{ layers: embossLayers }}
            stone={{ settings: stoneSettings }}
            sparkle={{ [sparkle]: true }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
