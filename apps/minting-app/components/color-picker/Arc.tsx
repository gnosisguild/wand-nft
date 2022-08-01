import React from "react";
import classNames from "classnames";
import { useSpring, animated, easings } from "@react-spring/web";

import { HueGradient, LightnessGradient } from "./Gradient";
import useDragRotate from "../useDragRotate";
import styles from "./ColorPicker.module.css";
import { usePrevious } from "../usePrevious";
import { delta } from "../trigonometry";

const SIZE = 1000;
const HUE_MARGIN = 0.124;
const LIGHTNESS_MARGIN = 0.48;

interface Props {
  value: number;
  onChange: (nextValue: number) => void;
}

export const HueArc = ({ value, onChange }: Props) => {
  const { bind, rotation, hovering, dragging } = useDragRotate<SVGPathElement>(
    value,
    onChange
  );

  const prevRotation = usePrevious(rotation);

  const { transform } = useSpring({
    from: { transform: `rotate(${prevRotation}deg)` },
    to: { transform: `rotate(${rotation}deg)` },
    immediate: dragging || delta(prevRotation, rotation) < 1,
    config: {
      easing: easings.easeInOutQuart,
    },
  });

  return (
    <animated.g
      style={{
        transform,
        transformOrigin: "center",
      }}
      className={classNames(styles.dragGroup, {
        [styles.hovering]: hovering,
      })}
    >
      <HueGradient />
      <path
        {...bind()}
        fill="none"
        stroke={"rgba(0,0,0,0)"}
        strokeWidth={90}
        d={HUE_D}
        className={classNames(styles.grabbableArc, {
          [styles.active]: dragging,
        })}
      />
      <circle
        cx="500"
        cy="500"
        r="434"
        fill="none"
        strokeWidth="65"
        strokeDasharray="7 7"
        className={styles.hueKnurl}
      />
    </animated.g>
  );
};

export const LightnessArc = ({ value, onChange }: Props) => {
  const { bind, rotation, hovering, dragging } = useDragRotate<SVGPathElement>(
    value,
    onChange
  );

  const prevRotation = usePrevious(rotation);
  const { transform } = useSpring({
    from: { transform: `rotate(${prevRotation}deg)` },
    to: { transform: `rotate(${rotation}deg)` },
    immediate: dragging || delta(prevRotation, rotation) < 1,
    config: {
      easing: easings.easeInOutQuart,
    },
  });

  return (
    <animated.g
      style={{
        transform,
        transformOrigin: "center",
      }}
      className={classNames(styles.dragGroup, {
        [styles.hovering]: hovering,
      })}
    >
      <LightnessGradient />
      <path
        fill="none"
        stroke={"url(#lightness-arc-gray-gradient)"}
        strokeWidth={70}
        d={LIGHTNESS_D}
        className={classNames(styles.grabbableArc)}
      />
      <path
        {...bind()}
        fill="none"
        stroke={"rgba(0,0,0,0)"}
        strokeWidth={85}
        d={LIGHTNESS_D}
        className={classNames(styles.grabbableArc, {
          [styles.active]: dragging,
        })}
        style={{
          transform: "scale(1)",
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
      <circle
        cx="500"
        cy="500"
        r="260"
        fill="none"
        strokeWidth="70"
        strokeDasharray="5 5"
        className={styles.lightnessKnurl}
      />
    </animated.g>
  );
};

function duration() {}

const HUE_D = arc(SIZE, HUE_MARGIN);
const LIGHTNESS_D = arc(SIZE, LIGHTNESS_MARGIN);

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
