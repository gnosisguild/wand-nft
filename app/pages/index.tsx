import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import {
  SvgTemplate,
  CollapseContainer,
  EmbossLayerForm,
  StoneForm,
  RhythmCircle,
  LocationInput,
  BackgroundPicker,
} from "../components";
import styles from "../styles/Home.module.css";
import { embossPresets } from "../components/settings/embossPresets";
import { EmbossLayer, StoneSettings } from "../components/SvgTemplate";
import { HSLColor } from "../components/settings/BackgroundPicker";
import { calculateAspects, calculatePlanetPositions } from "../birthchart";
import HueSelect from "../components/settings/HueSelect";

const baseStoneSettings: StoneSettings = {
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
  const [background, setBackground] = React.useState<"linear" | "radial">(
    "radial"
  );
  const [bgColor, setBgColor] = React.useState<HSLColor>({
    hue: 50,
    saturation: 50,
    lightness: 50,
  });
  const [bgRealm, setBgRealm] = React.useState<"light" | "dark">("dark");
  const [hue, setHue] = React.useState(0);
  const [sparkle, setSparkle] = React.useState("sparkle0");
  const [handle, setHandle] = React.useState("handle0");
  const [embossLayers, setEmbossLayers] = React.useState(embossPresets);
  const [stoneSettings, setStoneSettings] = React.useState(baseStoneSettings);
  const [xp, setXp] = React.useState(3221);
  const [level, setLevel] = React.useState("level3");
  const [location, setLocation] = React.useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);
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
      setXp(decodedSettings.xp);
      setLevel(decodedSettings.level);
      setBgColor(decodedSettings.bgColor);
      setBgRealm(decodedSettings.bgRealm);
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
        xp,
        level,
        bgRealm,
        bgColor,
      };

      const base64Settings = window.btoa(JSON.stringify(wandState));
      const params = new URLSearchParams();
      params.set("settings", base64Settings);
      window.history.replaceState(null, "", `?${params.toString()}`);
    }, 100);
  }, [
    shape,
    rhythm,
    handle,
    embossLayers,
    stoneSettings,
    background,
    sparkle,
    xp,
    level,
    bgRealm,
    bgColor,
  ]);

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
    const settings = { ...stoneSettings, [key]: value };
    setStoneSettings(settings);
  };

  const now = new Date();
  const bod = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const secondInDay = (now.getTime() - bod.getTime()) / 1000;

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
              <div>
                <RhythmCircle rhythm={rhythm} setRhythm={setRhythm} />

                <label>Binary View</label>
                <input
                  type="text"
                  value={rhythm}
                  onChange={(ev) => setRhythm(ev.target.value.slice(0, 24))}
                />
              </div>
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
              {`hsl(${bgColor.hue}, ${bgColor.saturation}%, ${bgColor.lightness}%)`}
              <BackgroundPicker
                mainColor={bgColor}
                realm={bgRealm}
                setMainColor={setBgColor}
                setRealm={setBgRealm}
              />
              <select
                value={background}
                onChange={(ev) =>
                  setBackground(ev.target.value as "linear" | "radial")
                }
              >
                <option value="linear">linear</option>
                <option value="radial">radial</option>
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
            <CollapseContainer title="Wand level">
              <select
                value={level}
                onChange={(ev) => setLevel(ev.target.value)}
              >
                <option value="level1">level 1</option>
                <option value="level2">level 2</option>
                <option value="level3">level 3</option>
                <option value="level4">level 4</option>
                <option value="level5">level 5</option>
              </select>
            </CollapseContainer>
            <CollapseContainer title="Account XP Level">
              <p>Cap: 10,000</p>
              <p>Amount: {xp}</p>
              <input
                onChange={(e) => {
                  setXp(parseInt(e.target.value));
                }}
                type="range"
                min="0"
                max="10000"
                step="1"
                value={xp}
              />
            </CollapseContainer>
            <CollapseContainer wide title="Emboss Layers" collapse>
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
                swapStone={(settings: StoneSettings) => {
                  setStoneSettings(settings);
                }}
              />
            </CollapseContainer>
            <CollapseContainer wide title="Planets">
              <LocationInput value={location} onChange={setLocation} />
            </CollapseContainer>
          </div>
        </div>
        <div className={styles.wandImage}>
          <SvgTemplate
            frame={{ title: "FLOURISHING MISTY WORLD", [level]: true }}
            stars={{ starsSeed: 132413 }}
            planets={calculatePlanetPositions(
              location?.latitude || 0,
              location?.longitude || 0
            )}
            aspects={calculateAspects(
              location?.latitude || 0,
              location?.longitude || 0
            )}
            background={{
              hue,
              [background]: true,
              color: bgColor,
              [bgRealm]: true,
            }}
            halo={{
              [shape]: true,
              rhythm: Array.from(
                { length: 24 },
                (v, i) => rhythm[i % rhythm.length] !== "0"
              ),
              hue: bgColor.hue + 180,
            }}
            handle={{ [handle]: true }}
            filter={{ layers: embossLayers }}
            stone={{
              ...stoneSettings,
              seasonsAmplitude: Math.round(
                ((location?.latitude || 0) / 180) * 260
              ),
              secondInDay,
              // length of solar year: 365 days 5 hours 48 minutes 46 seconds = 31556926 seconds
              // midwinter is 11 days 8 hours (= 979200 seconds) before the start of the calendar year
              secondInYear: Math.round((Date.now() / 1000 - 979200) % 31556926),
            }}
            sparkle={{ [sparkle]: true }}
            xp={{ cap: 10000, amount: xp, crown: xp >= 10000 }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
