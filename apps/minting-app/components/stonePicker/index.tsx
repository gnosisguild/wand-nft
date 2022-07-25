import { useState } from "react";
import { useDrag } from "@use-gesture/react";
import StoneViewer from "./StoneViewer";
import { stoneList } from "../../template";
import styles from "./StonePicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import { Stone } from "../../types";
import StoneGlass from "./StoneGlass";
import { clockwiseDelta, dimensions, toAngle } from "../trigonometry";
import {
  describeFillers,
  describeSegments,
  findSegmentCenters,
  path,
} from "../rhythm";
import StoneFilter from "./StoneFilter";
import assert from "assert";

const stoneCount = stoneList.length;

const VIEWBOX_SIZE = 1000;

const CONFIG = {
  segment: {
    percBorder: 0.041,
    percThickness: 0.048,
    percSkew: 0.5,
    gapInDegrees: 1,
    viewBoxSize: VIEWBOX_SIZE,
  },
  filler: {
    percBorder: 0.031,
    percThickness: 0.07,
    percSkew: 0.5,
    spanInDegrees: 1,
    viewBoxSize: VIEWBOX_SIZE,
  },
  pointer: {
    percBorder: 0.037,
    percThickness: 0.054,
    viewBoxSize: VIEWBOX_SIZE,
  },
};

const segments = describeSegments(stoneList.length, CONFIG.segment);
const fillers = describeFillers(stoneList.length, CONFIG.filler);
const describePath = (angleStart: number, angleEnd: number) =>
  path(CONFIG.pointer, angleStart, angleEnd);
const segmentCenters = findSegmentCenters(stoneCount, CONFIG.segment);

type Rotation = {
  pinned: number;
  current: number;
};

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [rotation, setRotation] = useState<Rotation>({
    pinned: 0,
    current: stoneIndexToAngle(state.stone),
  });

  const bind = useDrag(({ first, last, initial, xy, target }) => {
    const { center } = dimensions(target.getBoundingClientRect());
    const start = toAngle(center, { x: initial[0], y: initial[1] });
    const end = toAngle(center, { x: xy[0], y: xy[1] });

    const nextAngle = add(rotation.pinned, clockwiseDelta(start, end));

    if (first) {
      setRotation({
        pinned: rotation.current,
        current: rotation.current,
      });
    } else {
      setRotation({
        pinned: rotation.pinned,
        current: nextAngle,
      });
    }

    if (last) {
      dispatch({
        type: "changeStone",
        value: angleToStoneIndex(nextAngle),
      });
    }
  });

  return (
    <div className={styles.container}>
      <div {...bind()}>
        <UiCircle rotation={rotation.current} showIndicator>
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            className={styles.haloSegmentSvg}
          >
            <path
              d={describePath(rotation.current - 6, rotation.current + 6)}
              fill="red"
            />
            <circle
              cy="500"
              cx="500"
              r="475"
              stroke="#D9D4AD"
              strokeWidth="16"
              fill="none"
              opacity="0.7"
              style={{ mixBlendMode: "color-dodge" }}
            />
            {segments.map((d, index) => (
              <g key={`${index}`}>
                <clipPath id={`stone-clip-${index}`}>
                  <path d={d} />
                </clipPath>
                <g clipPath={`url(#stone-clip-${index})`}>
                  <StoneFilter
                    seed={state.tokenId}
                    stone={stoneList[index]}
                    filterUniqueId={`stone-segment-${index}`}
                  />
                </g>
              </g>
            ))}
            {fillers.map((d, index) => (
              <path key={index} d={d} fill="pink" />
            ))}
            {segmentCenters.map(({ x, y }, index) => (
              <g key={index} clipPath={`url(#stone-clip-${index})`}>
                <circle
                  cx={x}
                  cy={y}
                  r={300}
                  filter={`url(#stone-segment-${index})`}
                  style={{
                    transform: "scale(0.15)",
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />

                <path d={segments[index]} fill="rgba(200,200,200,0.4)" />
              </g>
            ))}
          </svg>
        </UiCircle>
      </div>
      <div className={styles.stone}>
        <StoneViewer
          seed={state.tokenId}
          stone={interpolateStone(rotation.current)}
        />
        <StoneGlass />
      </div>
      <div className={styles.icon}>
        <IconButton icon="PickerStone" shadow />
      </div>
    </div>
  );
};

export default StonePicker;

function stoneIndexToAngle(index: number) {
  const step = 360 / stoneCount;
  const skew = step * CONFIG.segment.percSkew;
  return sub(step * index, skew);
}
function angleToStoneIndex(angle: number) {
  const step = 360 / stoneCount;
  const skew = step * CONFIG.segment.percSkew;
  return Math.floor(add(angle, skew) / step);
}

function angleToInterpolationParams(angle: number) {
  const index = angleToStoneIndex(angle);
  const step = 360 / stoneCount;
  const skew = step * CONFIG.segment.percSkew;
  const left = sub(index * step, skew);
  const midway = add(left, step / 2);

  const isGoingLeft =
    clockwiseDelta(angle, midway) < clockwiseDelta(midway, angle);

  if (isGoingLeft) {
    const progress = sub(midway, angle) / step;
    return [index, sub(index, 1, stoneCount - 1), progress];
  } else {
    const progress = sub(angle, midway) / step;
    return [index, add(index, 1, stoneCount - 1), progress];
  }
}

const interpolateStone = (angle: number): Stone => {
  let [from, to, progress] = angleToInterpolationParams(angle);

  const fromStone = stoneList[from];
  const toStone = stoneList[to];

  return {
    turbFreqX: interpolateValue(
      fromStone.turbFreqX,
      toStone.turbFreqX,
      progress
    ),
    turbFreqY: interpolateValue(
      fromStone.turbFreqY,
      toStone.turbFreqY,
      progress
    ),
    turbOct: Math.round(
      interpolateValue(fromStone.turbOct, toStone.turbOct, progress)
    ),
    redAmp: interpolateValue(fromStone.redAmp, toStone.redAmp, progress),
    redExp: interpolateValue(fromStone.redExp, toStone.redExp, progress),
    redOff: interpolateValue(fromStone.redOff, toStone.redOff, progress),
    greenAmp: interpolateValue(fromStone.greenAmp, toStone.greenAmp, progress),
    greenExp: interpolateValue(fromStone.greenExp, toStone.greenExp, progress),
    greenOff: interpolateValue(fromStone.greenOff, toStone.greenOff, progress),
    blueAmp: interpolateValue(fromStone.blueAmp, toStone.blueAmp, progress),
    blueExp: interpolateValue(fromStone.blueExp, toStone.blueExp, progress),
    blueOff: interpolateValue(fromStone.blueOff, toStone.blueOff, progress),
    fractalNoise:
      progress < 0.5 ? fromStone.fractalNoise : toStone.fractalNoise,
    rotation: interpolateValue(fromStone.rotation, toStone.rotation, progress),
  };
};

const interpolateValue = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

export function add(a: number, b: number, overflow: number = 360) {
  assert(a >= 0 && a <= overflow);
  assert(b >= 0 && b <= overflow);

  return (a + b) % overflow;
}

export function sub(a: number, b: number, overflow: number = 360) {
  assert(a >= 0 && a <= overflow);
  assert(b >= 0 && b <= overflow);

  return a > b ? a - b : overflow - (b - a);
}
