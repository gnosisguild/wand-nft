import React, { useRef } from "react";
import { useDrag } from "@use-gesture/react";

import Knob from "./Knob";
import Gradient from "./Gradient";
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
  value: number;
  onChange(nextValue: number): void;
  onRelease(): void;
}

const Slider = ({ wide, value, onChange, onRelease }: Props) => {
  const arcRef = useRef<SVGPathElement | null>(null);

  // virtual coordinates, SVG modeling unscaled virtual coordinates
  const { center, radius, d } = wide ? CONFIG.WIDE : CONFIG.NARROW;

  function moveTo(point: Point) {
    // real coordinates, coming from the DOM
    const { center, width } = dimensions(
      arcRef.current?.getBoundingClientRect() as DOMRect
    );

    const radius = width / 2;

    onChange(
      toAngle(center, findClosestInCircumference(center, radius, point))
    );
  }

  const bind = useDrag(({ pressed, xy: [x, y] }) => {
    moveTo({ x, y });
    if (!pressed) {
      onRelease();
    }
  });

  // virtual coordinates, SVG modeling unscaled virtual coordinates
  const { x, y } = toPosition(center, radius, value);

  return (
    <>
      <Gradient wide={wide} />
      <path
        ref={arcRef}
        fill="none"
        stroke={wide ? "rgba(0,0,0,0)" : "url(#gray-gradient)"}
        strokeWidth={wide ? 60 : 25}
        d={d}
        onClick={(event: React.MouseEvent<SVGPathElement>) => {
          event.preventDefault();
          moveTo({ x: event.clientX, y: event.clientY });
        }}
      />
      <g {...bind()}>
        <Knob x={x} y={y} />
      </g>
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
