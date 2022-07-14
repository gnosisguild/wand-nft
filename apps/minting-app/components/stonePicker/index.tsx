import { useRef, useState } from "react";
import Draggable from "react-draggable";
import StoneViewer from "./StoneViewer";
import { stoneList } from "../../template";
import styles from "./StonePicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";

const DraggableNoType: any = Draggable;

const randomStonePosision = () => {
  const stoneWidth = 18;
  const angle = Math.random() * Math.PI * 2;
  const r = 41 * Math.sqrt(Math.random());
  const x = 41 + r * Math.cos(angle);
  const y = 41 + r * Math.sin(angle);

  return { top: `${y}%`, left: `${x}%` };
};

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [stonesWithPosition, setStonesWithPosition] = useState(
    stoneList.map((stone, id) => {
      return { id, position: randomStonePosision() };
    })
  );
  const nodeRef = useRef(null);

  return (
    <div className={styles.stoneBag}>
      <UiCircle>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bgCircle}
        >
          <defs>
            <linearGradient
              id="bg_grad"
              x1="60"
              y1="3.28491"
              x2="60"
              y2="118.027"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EFEBCE" stopOpacity="0.5" />
              <stop offset="1" stopColor="#EFEBCE" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#bg_grad)"
            strokeWidth="5"
            opacity="1"
            style={{ mixBlendMode: "color-dodge" }}
          />
          <circle
            cx="60"
            cy="60"
            r="57"
            stroke="url(#bg_grad)"
            strokeWidth="2"
            opacity="1"
            style={{ mixBlendMode: "color-dodge" }}
          />
        </svg>
        <ul>
          {stonesWithPosition.map(({ id, position }) => (
            <DraggableNoType key={id} bounds="parent" nodeRef={nodeRef}>
              <li
                ref={nodeRef}
                onClick={(e) => {
                  switch (e.detail) {
                    case 2:
                      // double click
                      dispatch({ type: "changeStone", value: id });
                      break;
                    default:
                      return;
                  }
                }}
                style={position}
              >
                <StoneViewer seed={state.tokenId} id={id} />
              </li>
            </DraggableNoType>
          ))}
        </ul>
      </UiCircle>
      <div className={styles.icon}>
        <IconButton icon="PickerStone" shadow />
      </div>
    </div>
  );
};

export default StonePicker;
