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
      <g onMouseDown={() => setIsDragging(true)}>
        <circle cx={x} cy={y} r="50" fill="url(#paint0_radial_901_4892)" />
        <circle cx={x} cy={y} r="40" fill="url(#paint1_radial_901_4892)" />
      </g>
      <defs>
        <radialGradient r="0.2" id="paint0_radial_901_4892">
          <stop stopColor="#EDECE7" />
          <stop offset="1" stopColor="#49473A" />
        </radialGradient>
        <radialGradient r="1.2" id="paint1_radial_901_4892">
          <stop stopColor="#EDECE7" />
          <stop offset="1" stopColor="#858272" />
        </radialGradient>
      </defs>
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
