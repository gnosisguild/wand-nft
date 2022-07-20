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
import { dimensions, toAngle } from "../trigonometry";
import { describeSegments } from "../rhythm";
import StoneFilter from "./StoneFilter";

const stoneCount = stoneList.length;

const VIEWBOX_SIZE = 1000;
const segments = describeSegments(stoneList.length, {
  percBorder: 0.041,
  percThickness: 0.048,
  percSkew: 0,
  gapInDegrees: 2,
  viewBoxSize: VIEWBOX_SIZE,
});

type Rotation = {
  pinned: number;
  current: number;
};

const StonePicker: React.FC = () => {
  const { state } = useAppContext();
  const [rotation, setRotation] = useState<Rotation>({
    pinned: 0,
    current: 0,
  });

  const bind = useDrag(({ first, initial, xy, target }) => {
    const { center } = dimensions(target.getBoundingClientRect());
    const start = toAngle(center, { x: initial[0], y: initial[1] });
    const end = toAngle(center, { x: xy[0], y: xy[1] });
    const delta = angleDelta(start, end);

    setRotation({
      pinned: first ? rotation.current : rotation.pinned,
      current: (rotation.pinned + delta) % 360,
    });
  });

  const i = angleToStoneIndex(rotation.current);

  return (
    <div className={styles.container}>
      <div {...bind()}>
        <UiCircle rotation={rotation.current}>
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            className={styles.haloSegmentSvg}
          >
            <circle
              cy="500"
              cx="500"
              r="410"
              stroke="turquoise"
              strokeWidth="125"
              fill="none"
              opacity="1"
              strokeDasharray="10% 800%"
              style={{
                transform: `rotate(${rotation.current}deg)`,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            ></circle>
            <circle
              cy="500"
              cx="500"
              r="475"
              stroke="#D9D4AD"
              strokeWidth="16"
              fill="none"
              opacity="0.7"
              style={{ mixBlendMode: "color-dodge" }}
            ></circle>
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
                  <path d={d} filter={`url(#stone-segment-${index})`} />
                  <path d={d} fill="rgba(200,200,200,0.6)" />
                </g>
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

// TODO fix all this
function angleToStoneIndex(angle: number) {
  const step = 360 / stoneCount;
  return Math.floor(angle / step);
}
function angleToStoneBounds(angle: number) {
  const step = 360 / stoneCount;
  const i = Math.floor(angle / step);
  return [i * step, (i + 1) * step];
}

function angleToInterpolationParams(angle: number) {
  const step = 360 / stoneCount;
  // if we are 50% inside the angle no interpolation
  const index = angleToStoneIndex(angle);
  const [left, right] = angleToStoneBounds(angle);

  const midway = left + (right - left) / 2;
  if (angle < midway) {
    // going left
    const progress = (midway - angle) / step;
    return [index, index - 1, progress];
  } else {
    // going right
    const progress = (angle - midway) / step;
    return [index, index + 1, progress];
  }
}

const interpolateStone = (angle: number): Stone => {
  let [from, to, progress] = angleToInterpolationParams(angle);

  // TODO fix this by making the above math more robust
  from = Math.max(Math.min(from, stoneCount - 1), 0);
  to = Math.max(Math.min(to, stoneCount - 1), 0);

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

// TODO FIX ALL THIS
function angleDelta(angleStart: number, angleEnd: number) {
  if (angleStart < angleEnd) {
    return angleEnd - angleStart;
  } else {
    return (360 - angleStart + angleEnd) % 360;
  }
}
