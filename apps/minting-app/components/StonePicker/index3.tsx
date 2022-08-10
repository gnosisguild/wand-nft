import { useEffect, useRef, useState } from "react";
import { animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import StoneViewer from "./StoneViewer";
import { stoneList } from "../../template";
import styles from "./StonePicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import useInertia from "./useInertia";
import { Stone } from "../../types";
import StoneGlass from "./StoneGlass";

const stoneCount = stoneList.length;

const ANGLE_STEP = 45;

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [tempStone, setTempStone] = useState(state.stone);
  const [angle, setAngle] = useState(state.stone * ANGLE_STEP);
  // const rotate = (360 / stoneCount) * state.stone;

  const [{ rotation }, set] = useInertia({
    rotation: ANGLE_STEP * tempStone,
    onChange(rotation: number) {
      if (isNaN(rotation)) return;
      setAngle(rotation);
    },
    // onChange(rotation: any) {
    //   if (isNaN(rotation)) return;
    //   const i = Math.round(rotation / ANGLE_STEP) % stoneCount;
    //   const stoneIndex = i < 0 ? stoneCount + i : i;
    //   if (stoneIndex !== tempStone) {
    //     setTempStone(stoneIndex);
    //   }
    // },
  });

  if (!rotation) throw new Error("huh");

  const bind = useDrag(
    ({ down, movement: [mx, my], vxvy: [vx, vy] }) => {
      if (down) {
        // console.log({
        //   mx,
        //   my,
        //   vx,
        //   vy,
        //   rotation: Math.atan2(mx, my),
        //   velocity: Math.sqrt(vx ** vx + vy ** vy),
        // });
        set({
          rotation: Math.atan2(mx, my),
          immediate: true,
          config: { decay: false },
        });
      } else {
        set({
          rotation: Math.atan2(mx, my),
          turbFreqX: stoneList[tempStone + 1].turbFreqX,

          immediate: false,
          config: () => ({
            inertia: true,
            bounds: [-100, 100],
            velocity: Math.sqrt(vx ** vx + vy ** vy),
          }),
        });
      }
    },
    {
      initial: () => [0, 0],
      threshold: 10,
      bounds: { top: -250, bottom: 250, left: -100, right: 100 },
      rubberband: true,
    }
  );

  return (
    <div className={styles.container}>
      <animated.div
        {...bind()}
        style={{
          transform: rotation.interpolate((angle) => `rotate(${angle}deg)`),
        }}
      >
        <UiCircle>
          <div className={styles.stone}>
            <StoneViewer seed={state.tokenId} stone={interpolateStone(angle)} />
          </div>
        </UiCircle>
      </animated.div>
      <div className={styles.stone}>
        <StoneGlass />
      </div>
      <div className={styles.icon}>
        <IconButton icon="PickerStone" shadow />
      </div>
    </div>
  );
};

export default StonePicker;

const interpolateStone = (angle: number): Stone => {
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
