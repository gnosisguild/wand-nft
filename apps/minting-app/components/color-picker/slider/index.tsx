import React from "react";
import Gradient from "./Gradient";
import DragRotate from "../../DragRotate";

const SIZE = 1000;
const HUE_MARGIN = 0.1;
const LIGHTNESS_MARGIN = 0.5;

interface Props {
  value: number;
  onChange: (nextValue: number) => void;
}

export const HueArc = ({ value, onChange }: Props) => (
  <DragRotate value={value} onDragEnd={onChange}>
    {({ bind, rotation }) => (
      <g transform={`rotate(${rotation}, ${SIZE / 2}, ${SIZE / 2})`}>
        <Gradient wide={true} />
        <path
          {...bind()}
          fill="none"
          stroke={"rgba(0,0,0,0)"}
          strokeWidth={60}
          d={HUE_ARC_D}
          style={{ touchAction: "none" }}
        />
      </g>
    )}
  </DragRotate>
);

export const LightnessArc = ({ value, onChange }: Props) => (
  <DragRotate value={value} onDragEnd={onChange}>
    {({ bind, rotation }) => (
      <g transform={`rotate(${rotation}, ${SIZE / 2}, ${SIZE / 2})`}>
        <Gradient wide={false} />
        <path
          {...bind()}
          fill="none"
          stroke={"url(#gray-gradient)"}
          strokeWidth={43}
          d={LIGHTNESS_ARC_D}
          style={{ touchAction: "none" }}
        />
      </g>
    )}
  </DragRotate>
);

const HUE_ARC_D = arc(SIZE, HUE_MARGIN);
const LIGHTNESS_ARC_D = arc(SIZE, LIGHTNESS_MARGIN);

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
