import React from "react";
import StoneViewer from "./StoneViewer";
import { stoneList } from "../../template";
import styles from "./StonePicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import { Stone } from "../../types";
import StoneGlass from "./StoneGlass";
import {
  describeFillers,
  describeSegments,
  findSegmentCenters,
} from "../rhythm";
import StoneFilter from "./StoneFilter";
import assert from "assert";
import DragRotate from "../DragRotate";

const stoneCount = stoneList.length;

const VIEWBOX_SIZE = 1000;
const CONFIG = {
  segment: {
    percBorder: 0.041,
    percThickness: 0.048,
    percSkew: 0.5,
    gapInDegrees: 2,
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
const segmentCenters = findSegmentCenters(stoneCount, CONFIG.segment);

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const onChange = (nextValue: number) =>
    dispatch({
      type: "changeStone",
      value: angleToStoneIndex(nextValue),
    });

  return (
    <DragRotate value={stoneIndexToAngle(state.stone)} onDragEnd={onChange}>
      {({ bind, rotation }) => (
        <div className={styles.container}>
          <div {...bind()} className={styles.drag}>
            <UiCircle rotation={rotation} showIndicator>
              <svg
                viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
                className={styles.haloSegmentSvg}
              >
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
                  <path
                    key={index}
                    d={d}
                    fill="#D9D4AD"
                    opacity="0.7"
                    style={{ mixBlendMode: "color-dodge" }}
                  />
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
              stone={interpolateStone(rotation)}
            />
            <StoneGlass />
          </div>
          <div className={styles.icon}>
            <IconButton icon="PickerStone" shadow />
          </div>
        </div>
      )}
    </DragRotate>
  );
};

export default StonePicker;

function stoneIndexToAngle(index: number) {
  const step = 360 / stoneCount;
  return withSkew(step * index + step / 2);
}

function angleToStoneIndex(angle: number) {
  const step = 360 / stoneCount;
  return Math.floor(withoutSkew(angle) / step);
}

function interpolationParams(angle: number) {
  angle = withoutSkew(angle);

  const step = 360 / stoneCount;
  const index = Math.floor(angle / step);
  const midway = step * index + step / 2;

  if (angle < midway) {
    // going left
    const progress = (midway - angle) / step;
    return [index, stoneIndex(index - 1), progress];
  } else {
    // going right
    const progress = (angle - midway) / step;
    return [index, stoneIndex(index + 1), progress];
  }
}

const interpolateStone = (angle: number): Stone => {
  const [from, to, progress] = interpolationParams(angle);
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

function stoneIndex(unbound: number): number {
  return unbound < 0 ? stoneCount - 1 : unbound % stoneCount;
}

function withoutSkew(angle: number) {
  const step = 360 / stoneCount;
  return (angle + step * CONFIG.segment.percSkew) % 360;
}

function withSkew(angle: number) {
  const step = 360 / stoneCount;
  const result = angle - step * CONFIG.segment.percSkew;
  assert(result >= 0);
  return result;
}
