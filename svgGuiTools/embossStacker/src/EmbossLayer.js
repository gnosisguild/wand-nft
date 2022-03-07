import { useState } from "react";

const EmbossLayer = (props) => {
  const [minimized, setMinimized] = useState(false);
  return (
    <li>
      <div className="layer-header">
        <h3>Layer {props.index + 1}</h3>
        <button
          onClick={() => {
            setMinimized(!minimized);
          }}
        >
          {minimized ? "↑" : "↓"}
        </button>
      </div>
      {minimized && (
        <>
          <div className="inputs">
            <div className="input-group">
              <label>Surface Scale — {props.layer.surfaceScale}</label>
              <input
                type="range"
                min="-200"
                max="200"
                step="0.1"
                value={props.layer.surfaceScale}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "surfaceScale", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Specular Constant — {props.layer.specConstant}</label>
              <input
                type="range"
                min="-200"
                max="200"
                step="0.1"
                value={props.layer.specConstant}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "specConstant", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Specular Exponent — {props.layer.specExponent}</label>
              <input
                type="range"
                min="-200"
                max="200"
                step="0.1"
                value={props.layer.specExponent}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "specExponent", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Light Color — {props.layer.lightColor}</label>
              <input
                type="color"
                value={props.layer.lightColor}
                class="color-input"
                onChange={(e) => {
                  props.changeVal(props.index, "lightColor", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Light Position X — {props.layer.pointX}</label>
              <input
                type="range"
                min="-20000"
                max="20000"
                step="1"
                value={props.layer.pointX}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointX", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Light Position Y — {props.layer.pointY}</label>
              <input
                type="range"
                min="-20000"
                max="20000"
                step="1"
                value={props.layer.pointY}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointY", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Light Position Z — {props.layer.pointZ}</label>
              <input
                type="range"
                min="-20000"
                max="20000"
                step="1"
                value={props.layer.pointZ}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointZ", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Compositer k1 — {props.layer.k1}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={props.layer.k1}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "k1", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Compositer k2 — {props.layer.k2}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={props.layer.k2}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "k2", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Compositer k3 — {props.layer.k3}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={props.layer.k3}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "k3", e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Compositer k4 — {props.layer.k4}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={props.layer.k4}
                class="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "k4", e.target.value);
                }}
              />
            </div>
          </div>
          <button onClick={props.removeLayer}>Remove Layer</button>
        </>
      )}
    </li>
  );
};

export default EmbossLayer;
