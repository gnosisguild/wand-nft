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

const stoneCount = stoneList.length;

const ANGLE_STEP = 5;

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [tempStone, setTempStone] = useState(state.stone);
  // const rotate = (360 / stoneCount) * state.stone;

  const [{ rotation, turbFreqX }, set] = useInertia({
    rotation: ANGLE_STEP * tempStone,
    turbFreqX: stoneList[tempStone].turbFreqX,
    onChange(rotation: any) {
      if (isNaN(rotation)) return;
      const i = Math.round(rotation / ANGLE_STEP) % stoneCount;
      const stoneIndex = i < 0 ? stoneCount + i : i;
      if (stoneIndex !== tempStone) {
        setTempStone(stoneIndex);
      }
    },
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
            <StoneViewer
              seed={state.tokenId}
              stone={{
                ...stoneList[tempStone],
                turbFreqX: turbFreqX?.get() || stoneList[tempStone].turbFreqX,
              }}
            />
          </div>
        </UiCircle>
      </animated.div>
      <div className={styles.icon}>
        <IconButton icon="PickerStone" shadow />
      </div>
    </div>
  );
};

export default StonePicker;
