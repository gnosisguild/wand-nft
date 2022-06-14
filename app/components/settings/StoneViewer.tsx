import { StoneSettings } from "../SvgTemplate";
import styles from "./Settings.module.css";

interface Props {
  settings: StoneSettings;
  uniqueKey: number;
}
const StoneViewer = ({ settings, uniqueKey }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 3000"
      shapeRendering="geometricPrecision"
      className={styles.stoneViewSvg}
    >
      <filter id={`texture-${uniqueKey}`}>
        <feTurbulence
          type={settings.turbType}
          id="octave"
          baseFrequency={`${settings.turbFreqX} ${settings.turbFreqY}`}
          numOctaves={`${settings.turbOct}`}
          seed="1004123123"
        ></feTurbulence>
        <feComponentTransfer>
          <feFuncR
            id="r"
            type="gamma"
            amplitude={`${settings.redAmp}`}
            exponent={`${settings.redExp}`}
            offset={`${settings.redOff}`}
          ></feFuncR>
          <feFuncG
            id="g"
            type="gamma"
            amplitude={`${settings.greenAmp}`}
            exponent={`${settings.greenExp}`}
            offset={`${settings.greenOff}`}
          ></feFuncG>
          <feFuncB
            id="b"
            type="gamma"
            amplitude={`${settings.blueAmp}`}
            exponent={`${settings.blueExp}`}
            offset={`${settings.blueOff}`}
          ></feFuncB>
          <feFuncA type="discrete" tableValues="1"></feFuncA>
        </feComponentTransfer>
        <feComposite
          operator="in"
          in2="SourceGraphic"
          result="stoneTexture"
        ></feComposite>

        <feGaussianBlur
          in="SourceAlpha"
          stdDeviation="30"
          result="glow"
        ></feGaussianBlur>
        <feColorMatrix
          in="glow"
          result="bgGlow"
          type="matrix"
          values="-1 0 0 0 1
                  0 -1 0 0 1
                  0 0 -1 0 1
                  0 0 0 0.8 0 "
        ></feColorMatrix>

        <feMerge>
          <feMergeNode in="bgGlow"></feMergeNode>
          <feMergeNode in="stoneTexture"></feMergeNode>
        </feMerge>
      </filter>
      <radialGradient id={`stoneshadow-${uniqueKey}`}>
        <stop offset="0%" stopColor="hsla(0, 0%, 0%, 0)"></stop>
        <stop offset="90%" stopColor="hsla(0, 0%, 0%, 0.8)"></stop>
      </radialGradient>
      <defs>
        <clipPath id={`stoneclip-${uniqueKey}`}>
          <circle cx="1000" cy="1060" r="260"></circle>
        </clipPath>
      </defs>
      <circle
        id="stone"
        transform={`rotate(100${settings.rotation}, 1000, 1060)`}
        cx="1000"
        cy="1060"
        r="260"
        filter={`url(#texture-${uniqueKey}`}
      ></circle>

      <circle
        cx="1200"
        cy="1060"
        r="520"
        fill={`url(#stoneshadow-${uniqueKey}`}
        clipPath={`url(#stoneclip-${uniqueKey}`}
      ></circle>
      <defs>
        <radialGradient
          id={`stone-fill-${uniqueKey}`}
          cx="606.78"
          cy="1003.98"
          fx="606.78"
          fy="1003.98"
          r="2"
          gradientTransform="translate(-187630.67 -88769.1) rotate(-33.42) scale(178.04 178.05)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".05" stopColor="#fff" stopOpacity=".7"></stop>
          <stop offset=".26" stopColor="#ececec" stopOpacity=".5"></stop>
          <stop offset=".45" stopColor="#c4c4c4" stopOpacity=".5"></stop>
          <stop offset=".63" stopColor="#929292" stopOpacity=".5"></stop>
          <stop offset=".83" stopColor="#7b7b7b" stopOpacity=".5"></stop>
          <stop offset="1" stopColor="#cbcbca" stopOpacity=".5"></stop>
        </radialGradient>
        <radialGradient
          id={`stone-highlight-${uniqueKey}`}
          cx="1148.95"
          cy="2659.77"
          fx="1148.95"
          fy="2659.77"
          r="75.93"
          gradientTransform="translate(312.49 2545.6) rotate(-20) scale(1 -.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0.7"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <path
        fill={`url(#stone-fill-${uniqueKey}`}
        d="M1183.84,876.14c101.54,101.54,101.56,266.17,.04,367.7-101.52,101.52-266.21,101.56-367.74,.02-101.54-101.54-101.54-266.17,0-367.7s266.17-101.56,367.7-.02Z"
      ></path>
      <path
        fill={`url(#stone-highlight-${uniqueKey}`}
        d="M918.85,856.64c48.74-19.4,96.54-14.34,106.77,11.32,10.22,25.66-21.02,62.18-69.78,81.58s-96.54,14.34-106.77-11.32c-10.22-25.64,21.02-62.18,69.78-81.58Z"
      ></path>
    </svg>
  );
};

export default StoneViewer;
