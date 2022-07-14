import React, { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import {
  centerAndRadius,
  closestPointInCircumference,
  angleToPosition,
  positionToAngle,
} from "./trigonometry";

const SIZE = 1000;
const WIDE_MARGIN = 0.1;
const NARROW_MARGIN = 0.5;

const WIDE = {
  size: SIZE,
  radius: (SIZE * (1 - WIDE_MARGIN)) / 2,
  center: { x: SIZE / 2, y: SIZE / 2 },
  d: arc(SIZE, WIDE_MARGIN),
};

const NARROW = {
  size: SIZE,
  radius: (SIZE * (1 - NARROW_MARGIN)) / 2,
  center: { x: SIZE / 2, y: SIZE / 2 },
  d: arc(SIZE, NARROW_MARGIN),
};

interface Props {
  wide: boolean;
  value: number;
  onChange: (nextValue: number) => void;
}

const Slider = ({ wide, value, onChange }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const arcRef = useRef<SVGPathElement | null>(null);

  const config = wide ? WIDE : NARROW;

  const onMouseDown = () => {
    setIsDragging(true);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (event: Event) => {
    if (!isDragging) return;
    event.preventDefault();

    const { clientX, clientY } =
      event as unknown as React.MouseEvent<SVGSVGElement>;

    const { center, radius } = centerAndRadius(
      arcRef.current?.getBoundingClientRect() as DOMRect
    );

    onChange(
      positionToAngle(
        center,
        closestPointInCircumference(center, radius, {
          x: clientX,
          y: clientY,
        })
      )
    );
  };

  useEventListener("mousemove", onMouseMove);
  useEventListener("mouseup", onMouseUp);

  const { x, y } = angleToPosition(config.center, config.radius, value);

  return (
    <>
      <path
        ref={arcRef}
        fill="none"
        stroke="red"
        strokeWidth="15"
        d={config.d}
      />
      <circle fill="yellow" cx={x} cy={y} r={33} onMouseDown={onMouseDown} />
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
