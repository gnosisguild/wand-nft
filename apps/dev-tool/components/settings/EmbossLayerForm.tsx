import { useState } from "react";
import { FilterLayer } from "../SvgTemplate";
import styles from "./Settings.module.css";

interface Color {
  hue: number;
  saturation: number;
  lightness: number;
}

interface Props {
  layer: FilterLayer;
  index: number;
  removeLayer(index: number): void;
  changeVal(index: number, key: string, value: string | Color): void;
}

const EmbossLayerForm: React.FC<Props> = (props) => {
  const [minimized, setMinimized] = useState(false);
  return (
    <li className={styles.formContainer}>
      <div className={styles.layerHeader}>
        <h4>Layer {props.index + 1}</h4>
        <button
          onClick={() => {
            setMinimized(!minimized);
          }}
        >
          {minimized ? "↓" : "↑"}
        </button>
      </div>
      {!minimized && (
        <>
          <div>
            <div className={styles.inputGroup}>
              <label>turbulence type</label>
              <select
                onChange={(e) => {
                  props.changeVal(
                    props.index,
                    "fractalNoise",
                    e.target.value === "fractalNoise"
                  );
                }}
                value={props.layer.fractalNoise ? "fractalNoise" : "turbulence"}
              >
                <option value="turbulence">turbulence</option>
                <option value="fractalNoise">fractalNoise</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>turbulence frequency x — {props.layer.turbFreqX}</label>
              <input
                onChange={(e) => {
                  props.changeVal(props.index, "turbFreqX", e.target.value);
                }}
                type="range"
                min="0"
                max="1000"
                step="1"
                value={props.layer.turbFreqX}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>turbulence frequency y — {props.layer.turbFreqY}</label>
              <input
                onChange={(e) => {
                  props.changeVal(props.index, "turbFreqY", e.target.value);
                }}
                type="range"
                min="0"
                max="1000"
                step="1"
                value={props.layer.turbFreqY}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>turbulence octave — {props.layer.turbOct}</label>
              <input
                onChange={(e) => {
                  props.changeVal(props.index, "turbOct", e.target.value);
                }}
                type="range"
                min="1"
                max="10"
                value={props.layer.turbOct}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>turbulence blur — {props.layer.turbBlur}</label>
              <input
                onChange={(e) => {
                  props.changeVal(props.index, "turbBlur", e.target.value);
                }}
                type="range"
                min="0"
                max="100"
                step="1"
                value={props.layer.turbBlur}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>
                turbulence displacement scale — {props.layer.dispScale}
              </label>
              <input
                onChange={(e) => {
                  props.changeVal(props.index, "dispScale", e.target.value);
                }}
                type="range"
                min="0"
                max="500"
                step="1"
                value={props.layer.dispScale}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Surface Scale — {props.layer.surfaceScale}</label>
              <input
                type="range"
                min="-200"
                max="200"
                step="1"
                value={props.layer.surfaceScale}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "surfaceScale", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Specular Constant — {props.layer.specConstant}</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={props.layer.specConstant}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "specConstant", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Specular Exponent — {props.layer.specExponent}</label>
              <input
                type="range"
                min="1"
                max="128"
                step="1"
                value={props.layer.specExponent}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "specExponent", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>
                Light Color —{" "}
                {hslToHex(
                  props.layer.lightColor.hue,
                  props.layer.lightColor.saturation,
                  props.layer.lightColor.lightness
                )}
              </label>
              <input
                type="color"
                value={hslToHex(
                  props.layer.lightColor.hue,
                  props.layer.lightColor.saturation,
                  props.layer.lightColor.lightness
                )}
                className="color-input"
                onChange={(e) => {
                  props.changeVal(
                    props.index,
                    "lightColor",
                    hexToHsl(e.target.value)
                  );
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Light Position X — {props.layer.pointX}</label>
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                value={props.layer.pointX}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointX", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Light Position Y — {props.layer.pointY}</label>
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                value={props.layer.pointY}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointY", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Light Position Z — {props.layer.pointZ}</label>
              <input
                type="range"
                min="-2000"
                max="2000"
                step="1"
                value={props.layer.pointZ}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointZ", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Opacity — {props.layer.opacity}</label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={props.layer.opacity}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "opacity", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Blur X — {props.layer.blurX}</label>
              <input
                type="range"
                min="0"
                max="500"
                step="1"
                value={props.layer.blurX}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "blurX", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Blur Y — {props.layer.blurY}</label>
              <input
                type="range"
                min="0"
                max="500"
                step="1"
                value={props.layer.blurY}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "blurY", e.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={() => props.removeLayer(props.index)}>
            Remove Layer
          </button>
        </>
      )}
    </li>
  );
};

export default EmbossLayerForm;

function hexToHsl(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) throw new Error(`invalid color value: ${hex}`);

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const lightness = (max + min) / 2;

  let hue: number;
  let saturation: number;
  if (max == min) {
    // achromatic
    hue = 0;
    saturation = 0;
  } else {
    const d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      case b:
        hue = (r - g) / d + 4;
        break;
      default:
        throw new Error("invariant violation");
    }
    hue /= 6;
  }

  return {
    hue: Math.round(360 * hue),
    saturation: saturation * 100,
    lightness: lightness * 100,
  };
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
