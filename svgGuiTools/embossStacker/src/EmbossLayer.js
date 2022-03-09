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
          {minimized ? "↓" : "↑"}
        </button>
      </div>
      {!minimized && (
        <>
          <div className="inputs">
            <div className="input-group">
              <label>Light Source — {props.layer.lightType || "point"}</label>
              <select
                value={props.layer.lightType || "point"}
                onChange={(e) =>
                  props.changeVal(props.index, "lightType", e.target.value)
                }
              >
                <option value="point">point</option>
                <option value="spotlight">spotlight</option>
              </select>
            </div>
            <div className="input-group">
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
            <div className="input-group">
              <label>Specular Constant — {props.layer.specConstant}</label>
              <input
                type="range"
                min="0"
                max="100"
                step="0.01"
                value={props.layer.specConstant}
                className="slider"
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
                className="slider"
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
                className="color-input"
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
                className="slider"
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
                className="slider"
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
                className="slider"
                onChange={(e) => {
                  props.changeVal(props.index, "pointZ", e.target.value);
                }}
              />
            </div>
            {props.layer.lightType === "spotlight" && (
              <>
                <div className="input-group">
                  <label>Spotlight target X — {props.layer.pointsAtX}</label>
                  <input
                    type="range"
                    min="-20000"
                    max="20000"
                    step="1"
                    value={props.layer.pointsAtX}
                    className="slider"
                    onChange={(e) => {
                      props.changeVal(props.index, "pointsAtX", e.target.value);
                    }}
                  />
                </div>
                <div className="input-group">
                  <label>Spotlight target Y — {props.layer.pointsAtY}</label>
                  <input
                    type="range"
                    min="-20000"
                    max="20000"
                    step="1"
                    value={props.layer.pointsAtY}
                    className="slider"
                    onChange={(e) => {
                      props.changeVal(props.index, "pointsAtY", e.target.value);
                    }}
                  />
                </div>
                <div className="input-group">
                  <label>Spotlight target Z — {props.layer.pointsAtZ}</label>
                  <input
                    type="range"
                    min="-20000"
                    max="20000"
                    step="1"
                    value={props.layer.pointsAtZ}
                    className="slider"
                    onChange={(e) => {
                      props.changeVal(props.index, "pointsAtZ", e.target.value);
                    }}
                  />
                </div>
                <div className="input-group">
                  <label>
                    Spotlight Cone Angle — {props.layer.limitingConeAngle}
                  </label>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    step="0.01"
                    value={props.layer.limitingConeAngle}
                    className="slider"
                    onChange={(e) => {
                      props.changeVal(
                        props.index,
                        "limitingConeAngle",
                        e.target.value
                      );
                    }}
                  />
                </div>
              </>
            )}
            <div className="input-group">
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
            <div className="input-group">
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
            <div className="input-group">
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
          <button onClick={props.removeLayer}>Remove Layer</button>
        </>
      )}
    </li>
  );
};

export default EmbossLayer;
