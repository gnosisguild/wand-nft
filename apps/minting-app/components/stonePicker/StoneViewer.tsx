import React from "react";
import { Stone } from "../../types";
import styles from "./StonePicker.module.css";
import StoneFilter from "./StoneFilter";

const StoneViewer: React.FC<{
  seed: string;
  stone: Stone;
}> = ({ seed, stone }) => (
  <svg
    className={styles.stoneViewSvg}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 3000"
    shapeRendering="geometricPrecision"
  >
    <StoneFilter seed={seed} stone={stone} />
    <radialGradient id="picker_ss">
      <stop offset="0%" stopColor="hsla(0, 0%, 0%, 0)" />
      <stop offset="90%" stopColor="hsla(0, 0%, 0%, .8)" />
    </radialGradient>
    <defs>
      <clipPath id="picker_sc">
        <circle cx="1000" cy="1060" r="260" />
      </clipPath>
    </defs>

    <circle
      transform={`rotate(${stone.rotation}, 1000, 1060)`}
      cx="1000"
      cy="1060"
      r="260"
      filter="url(#picker_s)"
    />

    <circle
      cx="1200"
      cy="1060"
      r="520"
      fill="url(#ss)"
      clipPath="url(#picker_sc)"
    />
  </svg>
);

export default StoneViewer;
