import { useState } from "react";
import EmbossLayer from "./EmbossLayer";
import "./App.css";

const baseEmboss = {
  lightType: "point",
  surfaceScale: 5,
  specConstant: 5,
  specExponent: 20,
  lightColor: "#bbbbbb",
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

function App() {
  const [embossLayers, setEmbossLayers] = useState([Object.create(baseEmboss)]);

  const addEmboss = () => {
    const newEmbossLayers = [...embossLayers, Object.create(baseEmboss)];

    setEmbossLayers(newEmbossLayers);
  };

  const removeEmbossLayer = (index) => {
    const layers = [...embossLayers];
    layers.splice(index, 1);
    setEmbossLayers(layers);
  };

  const changeVal = (index, key, value) => {
    const layers = [...embossLayers];
    layers[index][key] = value;
    setEmbossLayers(layers);
  };

  return (
    <div className="App">
      <h1>Emboss Stacker</h1>
      <div className="tool-container">
        <div className="filter-list">
          <h2>Emboss Layers:</h2>
          <ul>
            {embossLayers.map((layer, index) => (
              <EmbossLayer
                layer={layer}
                index={index}
                removeLayer={() => {
                  removeEmbossLayer(index);
                }}
                changeVal={changeVal}
                key={`emboss_${index}`}
              />
            ))}
          </ul>
          <button onClick={addEmboss}>Add Emboss Layer</button>
        </div>
        <div className="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 2000 3000"
          >
            <defs>
              <symbol
                id="a"
                data-name="crested pointy"
                viewBox="0 0 113.58 64.7"
              >
                <path
                  className="path greyBlue"
                  d="M3.28,4.36.15,32S56.79,17.86,56.79,64.7C56.79,17.86,113.43,32,113.43,32L110.3,4.36C87.44-1.34,29.93-1.23,3.28,4.36Z"
                />
                <path
                  className="path"
                  d="M.15,32S25.2,25.76,42,35.35C33.16,30,8.68,33.45,8.68,33.45L0,32.08"
                />
                <path
                  className="path"
                  d="M113.43,32s-25.06-6.27-41.85,3.32c8.84-5.32,33.31-1.9,33.31-1.9l8.66-1.38"
                />
              </symbol>
              <symbol
                id="c"
                data-name="round pointy"
                viewBox="0 0 111.09 111.03"
              >
                <path
                  className="path"
                  d="M12.19,110.9A226.3,226.3,0,0,0,111,12.13l-6.6-3.37A226.31,226.31,0,0,1,8.83,104.3Z"
                />
                <path
                  className="path greyBlue"
                  d="M8.82,104.29A226.25,226.25,0,0,0,104.36,8.76L87.44.12C83.82,7.23,75.12,20.71,75.12,20.71c-14.76,21-32.2,22.58-52.73,1.6,21.12,20.29,19.36,38-1.6,52.75h-.06A203.67,203.67,0,0,1,.12,87.22Z"
                />
              </symbol>

              <filter id="filter1" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur
                  in="SourceAlpha"
                  result="alphablur"
                  stdDeviation="8"
                ></feGaussianBlur>

                {/* <!-- Background glow  --> */}
                <feGaussianBlur
                  in="SourceGraphic"
                  result="graphicblur"
                  stdDeviation="8"
                ></feGaussianBlur>
                <feOffset
                  dx="0"
                  dy="0"
                  in="graphicblur"
                  result="offsetBlur"
                ></feOffset>

                {/* <!-- Emboss/Bevel --> */}
                {embossLayers.map((layer, index) => (
                  <>
                    <feSpecularLighting
                      in="graphicblur"
                      surfaceScale={layer.surfaceScale}
                      specularConstant={layer.specConstant}
                      specularExponent={layer.specularExponent}
                      lightingColor={layer.lightColor}
                      result={`lighting_${index}`}
                    >
                      {layer.lightType === "point" && (
                        <fePointLight
                          x={layer.pointX}
                          y={layer.pointY}
                          z={layer.pointZ}
                        />
                      )}
                      {layer.lightType === "spotlight" && (
                        <feSpotLight
                          x={layer.pointX}
                          y={layer.pointY}
                          z={layer.pointZ}
                          limitingConeAngle={layer.limitingConeAngle}
                          pointsAtX={layer.pointsAtX}
                          pointsAtY={layer.pointsAtY}
                          pointsAtZ={layer.pointsAtZ}
                        />
                      )}
                    </feSpecularLighting>
                    <feGaussianBlur
                      in={`lighting_${index}`}
                      result={`blurred_${index}`}
                      stdDeviation={`${layer.blurX} ${layer.blurY}`}
                    ></feGaussianBlur>
                    {/* Mask Light to handle shape */}
                    <feComposite
                      in2={`blurred_${index}`}
                      in="SourceAlpha"
                      operator={layer.lightType === "spotlight" ? "in" : "out"}
                      result={`masked_emboss_${index}`}
                    />

                    {/* Invert light (black to white) and opacity */}
                    <feColorMatrix
                      in={`masked_emboss_${index}`}
                      result={`emboss_${index}`}
                      type="matrix"
                      values={`-1 0 0 0 1 
                              0 -1 0 0 1 
                              0 0 -1 0 1
                              0 0 0 ${layer.opacity || 1} 0`}
                    />
                  </>
                ))}

                {/* <feTurbulence baseFrequency=".001" numOctaves="2" result="A">
                   <animate attributeName="baseFrequency" dur="100s" values=".005;.002;.001" repeatCount="indefinite"/> 
                </feTurbulence>
                <feComposite
                  in2="A"
                  in="SourceGraphic"
                  operator="arithmetic"
                  k1="1"
                  k2="1"
                  k3="1"
                  k4="-1"
                  result="C"
                />
                <feTurbulence
                  baseFrequency=".005"
                  numOctaves="1"
                  seed="25"
                  result="B"
                >
                  <animate attributeName="baseFrequency" dur="200s" values=".02;.01;.001" repeatCount="indefinite"/>
                  <animate attributeName="seed" dur="35s" values="30;34" repeatCount="indefinite"/>
                </feTurbulence>
                <feComposite
                  in2="B"
                  in="SourceGraphic"
                  operator="arithmetic"
                  k1="0.6"
                  k2="1"
                  k3="1"
                  k4="-1"
                  result="D"
                />
                <feComposite
                  in2="C"
                  in="D"
                  operator="arithmetic"
                  k1="1"
                  k2="1"
                  k3="1"
                  k4="0"
                  result="idk"
                /> */}

                <feMerge>
                  <feMergeNode in="offsetBlur"></feMergeNode>
                  <feMergeNode in="SourceGraphic"></feMergeNode>
                  {embossLayers.map((layer, index) => (
                    <feMergeNode
                      in={`emboss_${index}`}
                      key={`node_${index}`}
                    ></feMergeNode>
                  ))}
                  {/* <feMergeNode in="idk"></feMergeNode> */}
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#filter1)">
              <rect
                x="946.87"
                y="1406.98"
                width="106.26"
                height="7.43"
                rx="3.71"
                className="path white"
              />
              <g>
                <circle cx="1000" cy="2020.31" r="130.09" className="path" />
                <circle
                  cx="1000"
                  cy="2020.31"
                  r="125.67"
                  className="path greyBlue"
                />
                <circle
                  cx="1000"
                  cy="2020.31"
                  r="118.29"
                  className="path gold"
                />
                <path
                  d="M1000,2000.64a123.54,123.54,0,0,0-109.09,65.47,118.33,118.33,0,0,0,218.18,0A123.54,123.54,0,0,0,1000,2000.64Z"
                  className="path gold"
                />
              </g>
              <polygon
                points="963.33 1414.39 1036.63 1414.39 1079.21 2312.5 920.79 2312.5 963.33 1414.39"
                className="path red"
              />
              <rect
                x="951.74"
                y="1567.42"
                width="96.52"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="949.95"
                y="1604.74"
                width="100.1"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="948.75"
                y="1642.06"
                width="102.51"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="946.88"
                y="1679.38"
                width="106.23"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="944.69"
                y="1716.71"
                width="110.62"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="943.48"
                y="1754.03"
                width="113.04"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="941.76"
                y="1791.35"
                width="116.47"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="940.3"
                y="1828.67"
                width="119.39"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="938.51"
                y="1865.99"
                width="122.97"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="936.6"
                y="1903.31"
                width="126.79"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <rect
                x="934.63"
                y="1940.63"
                width="130.74"
                height="7.43"
                rx="3.71"
                className="path"
              />
              <g>
                <g>
                  <path
                    d="M823.81,2336.79c.19.2,168.38,231.74,168.38,231.74C892.77,2431.48,975.1,2417,985.67,2412l-37.34-17C935.51,2399.77,895.47,2416,823.81,2336.79Z"
                    className="path red"
                  />
                  <path
                    d="M895.73,2410.87C930.31,2420.63,962,2406,962,2406a59.81,59.81,0,0,0-33.12,50.49Z"
                    className="path"
                  />
                  <path
                    d="M909,2419.34l16.36,22.41c5.31-16.42,11.81-22.89,11.81-22.89S921.2,2421.22,909,2419.34Z"
                    className="path red"
                  />
                  <line
                    x1="895.73"
                    y1="2410.87"
                    x2="909.03"
                    y2="2419.34"
                    className="path noFill"
                  />
                  <path
                    d="M925.39,2441.75c2.05,9.95,3.51,14.76,3.51,14.76"
                    className="path noFill"
                  />
                  <path
                    d="M937.2,2418.86A270.9,270.9,0,0,1,962,2406"
                    className="path noFill"
                  />
                </g>
                <g>
                  <path
                    d="M1176.19,2336.79c-.19.2-168.38,231.74-168.38,231.74,99.42-137.05,17.09-151.55,6.52-156.5l37.34-17C1064.49,2399.77,1104.53,2416,1176.19,2336.79Z"
                    className="path red"
                  />
                  <path
                    d="M1104.27,2410.87c-34.58,9.76-66.29-4.85-66.29-4.85a59.81,59.81,0,0,1,33.12,50.49Z"
                    className="path"
                  />
                  <path
                    d="M1091,2419.34l-16.36,22.41c-5.31-16.42-11.81-22.89-11.81-22.89S1078.8,2421.22,1091,2419.34Z"
                    className="path red"
                  />
                  <line
                    x1="1104.27"
                    y1="2410.87"
                    x2="1090.97"
                    y2="2419.34"
                    className="path noFill"
                  />
                  <path
                    d="M1074.61,2441.75c-2,9.95-3.51,14.76-3.51,14.76"
                    className="path noFill"
                  />
                  <path
                    d="M1062.8,2418.86A270.9,270.9,0,0,0,1038,2406"
                    className="path noFill"
                  />
                </g>
                <circle cx="1000.05" cy="2334.14" r="82.11" className="path" />
                <circle
                  cx="1000.05"
                  cy="2334.14"
                  r="74.63"
                  className="path navy"
                />
                <rect
                  x="992.78"
                  y="2252.03"
                  width="14.55"
                  height="164.22"
                  rx="7.12"
                  className="path"
                />
              </g>
              <use
                width="113.58"
                height="64.7"
                transform="translate(948.16 1486.67) scale(0.91 1.82)"
                xlinkHref="#a"
              />
              <path
                d="M999.7,2162.58a231.36,231.36,0,0,1-103.09-24.11l5.34-10.74a220.45,220.45,0,0,0,196.06-.28l5.38,10.72A231.46,231.46,0,0,1,999.7,2162.58Z"
                className="path"
              />
              <path
                d="M1078.05,2186.33l-9.91-197.5c-33.77-9.88-106.63-10.07-135.59,0L922,2185Z"
                className="path navy"
              />
              <use
                width="113.58"
                height="64.7"
                transform="translate(1085.39 2238.61) rotate(180) scale(1.5 1.77)"
                xlinkHref="#a"
              />
              <use
                width="111.09"
                height="111.03"
                transform="translate(910.84 2036.22) rotate(90)"
                xlinkHref="#c"
              />
              <use
                width="111.09"
                height="111.03"
                transform="translate(1088.81 2036.25)"
                xlinkHref="#c"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
