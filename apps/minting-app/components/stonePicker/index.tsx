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

const stoneCount = stoneList.length;

const VIEWBOX_SIZE = 1000;
const segments = describeSegments(stoneList.length, {
  percBorder: 0.041,
  percThickness: 0.048,
  gapInDegrees: 1,
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
            {segments.map((d, index) => (
              <path
                key={`${index}`}
                fill={i === index ? "red" : "yellow"}
                d={d}
              />
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

function angleToStoneIndex(angle: number) {
  const step = 360 / stoneCount;
  return Math.floor(angle / step);
}

const interpolateStone = (angle: number): Stone => {
  const ANGLE_STEP = 45;

  const i = Math.floor(angle / ANGLE_STEP) % stoneCount;
  const fromIndex = i < 0 ? stoneCount + i : i;
  const toIndex = (i + 1) % stoneCount;
  const fromStone = stoneList[fromIndex];
  const toStone = stoneList[toIndex];
  const progress = (angle % ANGLE_STEP) / ANGLE_STEP;
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

function angleDelta(angleStart: number, angleEnd: number) {
  if (angleStart < angleEnd) {
    return angleEnd - angleStart;
  } else {
    return (360 - angleStart + angleEnd) % 360;
  }
}
