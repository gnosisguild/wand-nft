import { useRef, useState } from "react";
import Draggable from "react-draggable";
import StoneViewer from "./StoneViewer";
import stones from "../../context/presets/stoneList";
import styles from "./StonePicker.module.css";
import { UiCircle } from "../";
import { useAppContext } from "../../context/AppContext";

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
    stones.map((stone) => {
      return { ...stone, position: randomStonePosision() };
    })
  );
  const nodeRef = useRef(null);

  return (
    <div className={styles.stoneBag}>
      <UiCircle>
        <ul>
          {stonesWithPosition.map((stone, index) => (
            <DraggableNoType key={index} bounds="parent" nodeRef={nodeRef}>
              <li
                ref={nodeRef}
                onClick={(e) => {
                  switch (e.detail) {
                    case 2:
                      // double click
                      dispatch({ type: "changeStone", value: stone });
                      break;
                    default:
                      return;
                  }
                }}
                style={stone.position}
              >
                <StoneViewer settings={stone} />
              </li>
            </DraggableNoType>
          ))}
        </ul>
      </UiCircle>
    </div>
  );
};

export default StonePicker;
