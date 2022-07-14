import styles from "./HaloPicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import {
  NARROW_SEGMENTS,
  WIDE_SEGMENTS,
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
} from "./rhythm";
import buttons from "./buttons";
import { Halo } from "../../types";
import { isWideShape } from "../../template";

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { halo } = state;
  const segments = isWideShape(halo.shape) ? WIDE_SEGMENTS : NARROW_SEGMENTS;

  return (
    <div>
      <UiCircle>
        <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
          {segments.map((d, index) => (
            <path
              className={
                isRhythmSet(halo, index) ? styles.rhythmOn : styles.rhythmOff
              }
              key={index}
              stroke="red"
              d={d}
              onClick={() => {
                dispatch({
                  type: "changeHalo",
                  value: setRhythm(halo, index),
                });
              }}
            />
          ))}
          {buttons.map(({ x, y, r }, index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={r}
              fill={halo.shape === index ? "green" : "yellow"}
              onClick={() => {
                dispatch({
                  type: "changeHalo",
                  value: { ...halo, shape: index as Halo["shape"] },
                });
              }}
            />
          ))}
        </svg>
      </UiCircle>
    </div>
  );
};

function isRhythmSet(halo: Halo, index: number) {
  return halo.rhythm[teflonIndex(halo, index)];
}

function setRhythm(halo: Halo, index: number): Halo {
  const realIndex = teflonIndex(halo, index);

  return {
    ...halo,
    rhythm: [
      ...halo.rhythm.slice(0, realIndex),
      !halo.rhythm[realIndex],
      ...halo.rhythm.slice(realIndex + 1),
    ],
  };
}

function teflonIndex(halo: Halo, index: number) {
  const isWide = isWideShape(halo.shape);
  const threshold = isWide ? 6 : 12;

  const deduped = index > threshold ? threshold - (index - threshold) : index;

  return isWide ? deduped * 2 : deduped;
}

export default HaloPicker;
