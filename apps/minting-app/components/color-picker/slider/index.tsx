import React from "react";
import Gradient from "./Gradient";
import DragRotate from "../../DragRotate";

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
  onChange: (nextValue: number) => void;
}

interface Props2 {
  onChange: (nextValue: number) => void;
}

export const HueArc = ({ onChange }: Props2) => {
  return (
    <DragRotate onChange={onChange}>
      {({ ref, bind, rotation }) => {
        return (
          <g ref={ref} transform={`rotate(${rotation}, 500, 500)`}>
            <Gradient wide={true} />
            <path
              {...bind()}
              fill="none"
              stroke={"rgba(0,0,0,0)"}
              strokeWidth={60}
              d={CONFIG.WIDE.d}
            />
          </g>
        );
      }}
    </DragRotate>
  );
};

export const BackgroundArc = ({ onChange }: Props2) => {
  return (
    <DragRotate onChange={onChange}>
      {({ ref, bind, rotation }) => (
        <g ref={ref} transform={`rotate(${rotation}, 500, 500)`}>
          <Gradient wide={false} />
          <path
            {...bind()}
            fill="none"
            stroke={"url(#gray-gradient)"}
            strokeWidth={43}
            d={CONFIG.NARROW.d}
          />
        </g>
      )}
    </DragRotate>
  );
};

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
