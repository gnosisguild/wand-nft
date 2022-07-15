import { useMemo } from "react";
import { stoneList } from "../../template";
import { Stone } from "../../types";
import styles from "./StonePicker.module.css";
const stoneTemplate = require("../../../../contracts/contracts/svg/partials/stone.hbs");

const StoneViewer: React.FC<{
  seed: number;
  stone: Stone;
}> = ({ seed, stone }) => {
  return (
    <svg
      className={styles.stoneViewSvg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 3000"
      shapeRendering="geometricPrecision"
    >
      <filter id="picker_s">
        <feTurbulence
          type={stone.fractalNoise ? "fractalNoise" : "turbulence"}
          baseFrequency={`${stone.turbFreqX / 1000} ${stone.turbFreqY / 1000}`}
          numOctaves={stone.turbOct}
          seed={seed}
        />
        <feComponentTransfer>
          <feFuncR
            type="gamma"
            amplitude={stone.redAmp / 100}
            exponent={stone.redExp / 100}
            offset={stone.redOff / 100}
          />
          <feFuncG
            type="gamma"
            amplitude={stone.greenAmp / 100}
            exponent={stone.greenExp / 100}
            offset={stone.greenOff / 100}
          />
          <feFuncB
            type="gamma"
            amplitude={stone.blueAmp / 100}
            exponent={stone.blueExp / 100}
            offset={stone.blueOff / 100}
          />
          <feFuncA type="discrete" tableValues="1" />
        </feComponentTransfer>
        <feComposite operator="in" in2="SourceGraphic" result="picker_tex" />

        <feGaussianBlur
          in="SourceAlpha"
          stdDeviation="30"
          result="picker_glow"
        />
        <feColorMatrix
          in="picker_glow"
          result="picker_bgg"
          type="matrix"
          values="-1 0 0 0 1
            0 -1 0 0 1
            0 0 -1 0 1
            0 0 0 .8 0 "
        />

        <feMerge>
          <feMergeNode in="picker_bgg" />
          <feMergeNode in="picker_tex" />
        </feMerge>
      </filter>
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
        // transform={`rotate(${stone.rotation}, 1000, 1060)`}
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
      <defs>
        <radialGradient
          id="picker_sf"
          cx="606.78"
          cy="1003.98"
          fx="606.78"
          fy="1003.98"
          r="2"
          gradientTransform="translate(-187630.67 -88769.1) rotate(-33.42) scale(178.04 178.05)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".05" stopColor="#fff" stopOpacity=".7" />
          <stop offset=".26" stopColor="#ececec" stopOpacity=".5" />
          <stop offset=".45" stopColor="#c4c4c4" stopOpacity=".5" />
          <stop offset=".63" stopColor="#929292" stopOpacity=".5" />
          <stop offset=".83" stopColor="#7b7b7b" stopOpacity=".5" />
          <stop offset="1" stopColor="#cbcbca" stopOpacity=".5" />
        </radialGradient>
        <radialGradient
          id="picker_sh"
          cx="1149"
          cy="2660"
          fx="1149"
          fy="2660"
          r="76"
          gradientTransform="translate(312 2546) rotate(-20) scale(1 -.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        fill="url(#picker_sf)"
        d="M1184 876a260 260 0 1 1-368 368 260 260 0 0 1 368-368Z"
      />
      <path
        fill="url(#picker_sh)"
        d="M919 857c49-20 96-15 107 11 10 26-21 62-70 82s-97 14-107-12c-10-25 21-62 70-81Z"
      />
    </svg>
  );
};

export default StoneViewer;
