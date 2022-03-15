import { useState } from "react";
import { EmbossLayer } from "../SvgTemplate";
import styles from "./Settings.module.css";

interface Props {
  layer: EmbossLayer;
  index: number;
  removeLayer(index: number): void;
  changeVal(index: number, key: string, value: string): void;
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
                  props.changeVal(props.index, "turbType", e.target.value);
                }}
                value={props.layer.turbType}
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
                max="0.1"
                step="0.001"
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
                max="0.1"
                step="0.001"
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
                max="10"
                step="0.01"
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
                step="0.1"
                value={props.layer.dispScale}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Surface Scale — {props.layer.surfaceScale}</label>
              <input
                type="range"
                min="-200"
                max="200"
                step="0.1"
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
                max="10"
                step="0.01"
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
                step="0.1"
                value={props.layer.specExponent}
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "specExponent", e.target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Light Color — {props.layer.lightColor}</label>
              <input
                type="color"
                value={props.layer.lightColor}
                className="color-input"
                onChange={(e) => {
                  props.changeVal(props.index, "lightColor", e.target.value);
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
                max="1"
                step="0.001"
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
                max="50"
                step="0.001"
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
                max="50"
                step="0.001"
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
