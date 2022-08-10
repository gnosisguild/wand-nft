import { useEffect, useRef, useState } from "react";
import StoneViewer from "./StoneViewer";
import { stoneList } from "../../template";
import styles from "./StonePicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import { useEventListener } from "usehooks-ts";

const stoneCount = stoneList.length;
const radius = 123;

const step = 0.1;

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const knobRef = useRef<HTMLDivElement>(null);

  const dragStart = useRef<{ clientX: number; clientY: number }>();
  const [speed, setSpeed] = useState(0);

  const updateSpeed = (current: { clientX: number; clientY: number }) => {
    const start = dragStart.current;
    const knobEl = knobRef.current;
    if (!start || !knobEl) return;
    setSpeed(
      (Math.atan2(
        start.clientX - (knobEl.offsetLeft + knobEl.offsetWidth / 2),
        start.clientY - (knobEl.offsetTop + knobEl.offsetHeight / 2)
      ) -
        Math.atan2(
          current.clientX - (knobEl.offsetLeft + knobEl.offsetWidth / 2),
          current.clientY - (knobEl.offsetTop + knobEl.offsetHeight / 2)
        )) *
        radius
    );
    dragStart.current = current;
  };

  useEventListener("mouseup", () => {
    dragStart.current = undefined;
  });
  useEventListener("touchend", () => {
    dragStart.current = undefined;
  });

  const rotate = (360 / stoneCount) * state.stone;

  return (
    <div
      ref={knobRef}
      className={styles.container}
      onMouseDown={({ clientX, clientY }) => {
        dragStart.current = { clientX, clientY };
      }}
      onTouchStart={({ touches }) => {
        dragStart.current = {
          clientX: touches[0].pageX,
          clientY: touches[0].pageY,
        };
      }}
      onMouseMove={({ clientX, clientY }) => {
        if (dragStart.current) {
          updateSpeed({
            clientX,
            clientY,
          });
        }
      }}
      onTouchMove={({ touches }) => {
        if (dragStart.current) {
          updateSpeed({
            clientX: touches[0].pageX,
            clientY: touches[0].pageY,
          });
        }
      }}
    >
      <div style={{ transform: `rotate(${rotate}deg)` }}>
        <UiCircle>
          <div className={styles.stone}>
            <StoneViewer seed={state.tokenId} id={state.stone} />
          </div>
        </UiCircle>
      </div>
      <div className={styles.icon}>
        <IconButton icon="PickerStone" shadow />
      </div>
    </div>
  );
};

export default StonePicker;
