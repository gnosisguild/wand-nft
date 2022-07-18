import React, { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { xp } from "../../template";

import uiCirclebg from "../uiCircle/uiCirclebg.jpg";
import HueSlider from "./HueSlider";

import {
  findClosestInCircumference,
  toAngle,
  toPosition,
  dimensions,
  Point,
} from "./trigonometry";

const SIZE = 1000;
const WIDE_MARGIN = 0.1;
const NARROW_MARGIN = 0.5;

const CONFIG = {
  WIDE: {
    size: SIZE,
    radius: (SIZE * (1 - WIDE_MARGIN)) / 2,
    center: { x: SIZE / 2, y: SIZE / 2 },
    d: arc(SIZE, WIDE_MARGIN),
  },
  NARROW: {
    size: SIZE,
    radius: (SIZE * (1 - NARROW_MARGIN)) / 2,
    center: { x: SIZE / 2, y: SIZE / 2 },
    d: arc(SIZE, NARROW_MARGIN),
  },
};

interface Props {
  wide: boolean;
  stroke: string;
  strokeWidth?: number;
  value: number;
  onChange: (nextValue: number) => void;
}

const Slider = ({ wide, stroke, value, strokeWidth = 25, onChange }: Props) => {
  const arcRef = useRef<SVGPathElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // virtual coordinates, SVG modeling unscaled virtual coordinates
  const { center, radius, d } = wide ? CONFIG.WIDE : CONFIG.NARROW;

  const moveTo = (point: Point) => {
    // real coordinates, coming from the DOM
    const { center, width } = dimensions(
      arcRef.current?.getBoundingClientRect() as DOMRect
    );

    const radius = width / 2;

    onChange(
      toAngle(center, findClosestInCircumference(center, radius, point))
    );
  };

  useEventListener("mousemove", (event: MouseEvent) => {
    if (isDragging) {
      event.preventDefault();
      moveTo({ x: event.clientX, y: event.clientY });
    }
  });
  useEventListener("mouseup", () => setIsDragging(false));

  // virtual coordinates, SVG modeling unscaled virtual coordinates
  const { x, y } = toPosition(center, radius, value);

  return (
    <>
      {wide && <HueSlider />}
      <path
        ref={arcRef}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        d={d}
        onClick={(event: React.MouseEvent<SVGPathElement>) => {
          event.preventDefault();
          moveTo({ x: event.clientX, y: event.clientY });
        }}
      />
      <svg
        width="150"
        height="150"
        x={x - 75}
        y={y - 75}
        viewBox="0 0 21 21"
        fill="none"
        onMouseDown={() => setIsDragging(true)}
      >
        <g filter="url(#filter0_d_901_4892)">
          <circle
            cx="10.6099"
            cy="8.96643"
            r="8"
            fill="url(#paint0_radial_901_4892)"
          />
        </g>
        <circle
          cx="10.6099"
          cy="8.96649"
          r="6.74237"
          fill="url(#paint1_radial_901_4892)"
        />
        <g style={{ mixBlendMode: "overlay" }}>
          <path
            d="M18.6099 8.96643C18.6099 13.3847 15.0281 16.9664 10.6099 16.9664C6.19159 16.9664 2.60986 13.3847 2.60986 8.96643C2.60986 4.54815 6.19159 0.966431 10.6099 0.966431C15.0281 0.966431 18.6099 4.54815 18.6099 8.96643Z"
            fill="url(#pattern0)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_901_4892"
            x="0.609863"
            y="0.966431"
            width="20"
            height="20"
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
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            />
            <feBlend
              mode="multiply"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_901_4892"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_901_4892"
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
              xlinkHref="#handleComp"
              transform="translate(-0.0166667) scale(0.00123457)"
            />
          </pattern>
          <radialGradient
            id="paint0_radial_901_4892"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(15.1022 3.76916) rotate(108.799) scale(13.9409)"
          >
            <stop stopColor="#EDECE7" />
            <stop offset="1" stopColor="#49473A" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_901_4892"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(14.396 4.58625) rotate(108.799) scale(11.7494)"
          >
            <stop stopColor="#EDECE7" />
            <stop offset="1" stopColor="#858272" />
          </radialGradient>
          <image
            id="handleComp"
            width="837"
            height="810"
            href={uiCirclebg.src}
          />
        </defs>
      </svg>
    </>
  );
};

export default Slider;

function arc(size: number, margin: number) {
  const radius = (size * (1 - margin)) / 2;

  const topCenter = { x: size / 2, y: size / 2 - radius };
  const bottomCenter = { x: size / 2, y: size / 2 + radius };

  let largeArcFlag = "0";
  let sweepArcFlag = "0";

  return [
    "M",
    topCenter.x,
    topCenter.y,
    ...[
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      sweepArcFlag,
      bottomCenter.x,
      bottomCenter.y,
    ],
    ...[
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      sweepArcFlag,
      topCenter.x,
      topCenter.y,
    ],
  ].join(" ");
}
