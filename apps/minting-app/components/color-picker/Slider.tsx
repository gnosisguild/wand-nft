import React, { useEffect, useRef, useState } from "react";
import {
  angleToPosition,
  closestPointInCircumference,
  centerAndRadius,
  toUnscaledPoint,
} from "./trigonometry";

import useEventListener from "../useEventListener";

const WIDTH = 1000;
const touchSupported = false; //"ontouchstart" in window;
const SLIDER_EVENT = {
  DOWN: touchSupported ? "touchstart" : "mousedown",
  UP: touchSupported ? "touchend" : "mouseup",
  MOVE: touchSupported ? "touchmove" : "mousemove",
};

interface Props {
  value: number;
  onChange: () => void;
}

export function createSlider(marginPerc: number) {
  const CENTER = { x: WIDTH / 2, y: WIDTH / 2 };
  const RADIUS = (WIDTH * (1 - marginPerc)) / 2;
  const D = arc(marginPerc);

  const Slider = ({ value, onChange = () => {} }: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [{ x, y }, setPosition] = useState({ x: WIDTH / 2, y: WIDTH / 2 });
    const arcRef = useRef<SVGPathElement | null>(null);
    const containerRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
      setPosition(angleToPosition(CENTER, RADIUS, value || 0));
      // componentDidMOunt
    }, []);

    const onMouseDown = () => {
      setIsDragging(true);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
      if (!isDragging) return;
      event.preventDefault();

      const { center, radius } = centerAndRadius(
        arcRef.current?.getBoundingClientRect() as DOMRect
      );

      console.log(event);

      const point = closestPointInCircumference(center, radius, {
        x: event.clientX,
        y: event.clientY,
      });

      const unscaledPoint = toUnscaledPoint(
        containerRef.current?.getBoundingClientRect() as DOMRect,
        point,
        WIDTH
      );

      setPosition(unscaledPoint);
    };

    useEventListener(SLIDER_EVENT.MOVE, onMouseMove);
    useEventListener(SLIDER_EVENT.UP, onMouseUp);

    return (
      <svg viewBox={`0 0 ${WIDTH} ${WIDTH}`} ref={containerRef}>
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
