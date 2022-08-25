import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import uiCircleBg from "../UiCircle/uiCirclebg.jpg";
import { useAppContext } from "../../state";
import styles from "./IconButton.module.css";

const RecastButton: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const { dispatch } = useAppContext();
  const { transform } = useSpring({
    immediate: rotation === 0,
    transform: `rotate(${rotation}deg)`,
    onRest: () => {
      setRotation(0);
    },
  });

  return (
    <svg
      viewBox="0 0 89 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        setRotation(360);
        dispatch({ type: "randomizeWand" });
      }}
      className={styles.recastButton}
    >
      <animated.g
        style={{
          transform: transform,
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
      >
        <g filter="url(#filter0_d_981_13818)">
          <circle cx="44.656" cy="40.656" r="39.344" fill="#282828" />
          <circle
            cx="44.656"
            cy="40.656"
            r="39.344"
            fill="url(#pattern0)"
            fillOpacity="0.8"
          />
          <circle
            cx="44.656"
            cy="40.656"
            r="38.344"
            stroke="url(#paint0_linear_981_13818)"
            strokeOpacity="0.3"
            strokeWidth="2"
            style={{ mixBlendMode: "color-dodge" }}
          />{" "}
        </g>
        <g
          filter="url(#filter1_d_981_13818)"
          style={{ mixBlendMode: "color-dodge" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M65.5195 38.8353L56.9322 47.4226L48.5336 38.8353L55.9131 38.8353C55.0071 33.4753 50.3643 29.3987 44.759 29.3987C39.1536 29.3987 34.5108 33.4753 33.6049 38.8353L29.7925 38.8353C30.7173 31.3804 37.0587 25.624 44.759 25.624C52.4593 25.624 58.8007 31.3992 59.7254 38.8353L65.5195 38.8353Z"
            fill="#D9D4AD"
            fillOpacity="0.8"
            shapeRendering="crispEdges"
          />
        </g>
        <g style={{ mixBlendMode: "color-dodge" }} opacity="0.7">
          <path
            d="M49.9939 50.4233C50.1793 51.5489 51.0615 52.4311 52.1871 52.6165C51.0615 52.8019 50.1793 53.6841 49.9939 54.8097C49.8086 53.6841 48.9264 52.8019 47.8008 52.6165C48.9264 52.4311 49.8086 51.5489 49.9939 50.4233Z"
            fill="#D9D4AD"
          />
        </g>
        <g style={{ mixBlendMode: "color-dodge" }} opacity="0.7">
          <path
            d="M39.6033 49.2202C39.8904 50.9633 41.2566 52.3294 42.9996 52.6165C41.2566 52.9036 39.8904 54.2698 39.6033 56.0128C39.3162 54.2698 37.9501 52.9036 36.207 52.6165C37.9501 52.3294 39.3162 50.9633 39.6033 49.2202Z"
            fill="#D9D4AD"
          />
        </g>
        <g style={{ mixBlendMode: "color-dodge" }} opacity="0.7">
          <path
            d="M32.4158 41.6421C32.7452 43.6417 34.3125 45.209 36.3121 45.5384C34.3125 45.8678 32.7452 47.435 32.4158 49.4347C32.0865 47.435 30.5192 45.8678 28.5195 45.5384C30.5192 45.209 32.0865 43.6417 32.4158 41.6421Z"
            fill="#D9D4AD"
          />
        </g>
        <g style={{ mixBlendMode: "color-dodge" }} opacity="0.8">
          <path
            d="M77.5272 40.6564C77.5272 58.8107 62.8102 73.5277 44.6559 73.5277C26.5016 73.5277 11.7847 58.8107 11.7847 40.6564C11.7847 22.5021 26.5016 7.78516 44.6559 7.78516C62.8102 7.78516 77.5272 22.5021 77.5272 40.6564Z"
            stroke="#D9D4AD"
            strokeWidth="4"
          />
        </g>
      </animated.g>
      <defs>
        <filter
          id="filter0_d_981_13818"
          x="0.312012"
          y="0.312012"
          width="88.688"
          height="88.688"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"
          />
          <feBlend
            mode="multiply"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_981_13818"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_981_13818"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_981_13818"
            transform="translate(-0.0166667) scale(0.00123457)"
          />
        </pattern>
        <filter
          id="filter1_d_981_13818"
          x="24.7925"
          y="24.624"
          width="45.7271"
          height="31.7983"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0"
          />
          <feBlend
            mode="multiply"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_981_13818"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_981_13818"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_981_13818"
          x1="44.656"
          y1="1.31201"
          x2="44.656"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EFEBCE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#EFEBCE" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_981_13818"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(44.656 5.78516) rotate(90) scale(69.7424)"
        >
          <stop stopColor="#E7EEE2" />
          <stop offset="0.567708" stopColor="#C7E8AF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#66775A" />
        </radialGradient>
        <image
          id="image0_981_13818"
          width="837"
          height="810"
          href={uiCircleBg.src}
        />
      </defs>
    </svg>
  );
};

export default RecastButton;
