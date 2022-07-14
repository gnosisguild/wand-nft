import React, { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import {
  centerAndRadius,
  closestPointInCircumference,
  angleToPosition,
  positionToAngle,
} from "./trigonometry";

const WIDTH = 1000;

interface Props {
  value: number;
  onChange: (nextValue: number) => void;
}

export function createSlider(marginPerc: number) {
  const D = arc(marginPerc);
  const CENTER = { x: WIDTH / 2, y: WIDTH / 2 };
  const RADIUS = (WIDTH * (1 - marginPerc)) / 2;

  const Slider = ({ value, onChange = () => {} }: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const arcRef = useRef<SVGPathElement | null>(null);

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

    const { x, y } = angleToPosition(CENTER, RADIUS, value);

    return (
      <svg viewBox={`0 0 ${WIDTH} ${WIDTH}`}>
        <path ref={arcRef} fill="none" stroke="red" strokeWidth="15" d={D} />
        <circle fill="yellow" cx={x} cy={y} r={20} onMouseDown={onMouseDown} />
      </svg>
    );
  };

  return Slider;
}

function arc(percMargin: number) {
  const radius = (WIDTH * (1 - percMargin)) / 2;

  const topCenter = { x: WIDTH / 2, y: WIDTH / 2 - radius };
  const bottomCenter = { x: WIDTH / 2, y: WIDTH / 2 + radius };

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
