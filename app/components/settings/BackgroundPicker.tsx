import React, { useState } from "react";
import styles from "./Settings.module.css";

export interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

interface Props {
  mainColor: HSLColor;
  realm: "light" | "dark";
  setMainColor: (color: HSLColor) => void;
  setRealm: (realm: "light" | "dark") => void;
}

const BackgroundPicker = (props: Props) => {
  const [hue, setHue] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    switch (e.target.name) {
      case "hue":
        setHue(newVal);
        props.setMainColor({ hue: newVal, saturation, lightness });
        break;
      case "saturation":
        setSaturation(newVal);
        props.setMainColor({ hue, saturation: newVal, lightness });
        break;
      case "lightness":
        setLightness(newVal);
        props.setMainColor({ hue, saturation, lightness: newVal });
        break;
    }
  };

  return (
    <div>
      <label>Realm</label>
      <select
        value={props.realm}
        onChange={(e) => props.setRealm(e.target.value as "light" | "dark")}
      >
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
      <label>Hue</label>
      <input onChange={onChange} name="hue" type="range" min="0" max="360" />
      <div>
        <ul className={styles.hueSelect}>
          {Array.from(Array(360).keys()).map((i) => (
            <li key={i} className={styles.hueSingle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 300"
                className={styles.hueSVG}
                preserveAspectRatio="none"
              >
                <g>
                  <rect
                    width="100"
                    height="300"
                    fill={`hsl(${i}, ${props.mainColor.saturation}%, ${props.mainColor.lightness}%)`}
                  />
                </g>
              </svg>
            </li>
          ))}
        </ul>
      </div>
      <label>Saturation</label>
      <input
        onChange={onChange}
        name="saturation"
        type="range"
        min="0"
        max="100"
      />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 300"
          className={styles.singleGradSlider}
          preserveAspectRatio="none"
        >
          <g>
            <linearGradient id={`sat-grad`}>
              <stop
                offset="0%"
                stopColor={`hsl(${props.mainColor.hue}, 0%, ${props.mainColor.lightness}%)`}
              ></stop>
              <stop
                offset="100%"
                stopColor={`hsl(${props.mainColor.hue}, 100%, ${props.mainColor.lightness}%)`}
              ></stop>
            </linearGradient>
            <rect width="100" height="300" fill={`url(#sat-grad)`} />
          </g>
        </svg>
      </div>
      <label>Lightness</label>
      <input
        onChange={onChange}
        name="lightness"
        type="range"
        min="0"
        max="100"
      />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 300"
          className={styles.singleGradSlider}
          preserveAspectRatio="none"
        >
          <g>
            <linearGradient id={`light-grad`}>
              <stop
                offset="0%"
                stopColor={`hsl(${props.mainColor.hue}, ${props.mainColor.saturation}%, 0%)`}
              ></stop>
              <stop
                offset="100%"
                stopColor={`hsl(${props.mainColor.hue}, ${props.mainColor.saturation}%, 100%)`}
              ></stop>
            </linearGradient>
            <rect width="100" height="300" fill={`url(#light-grad)`} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BackgroundPicker;
