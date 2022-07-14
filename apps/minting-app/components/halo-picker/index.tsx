import classNames from "classnames";
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
import IconButton from "../IconButton";

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { halo } = state;
  const segments = isWideShape(halo.shape) ? WIDE_SEGMENTS : NARROW_SEGMENTS;

  return (
    <div>
      <UiCircle>
        <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
          <circle
            cy="500"
            cx="500"
            r="475"
            stroke="#D9D4AD"
            strokeWidth="16"
            opacity="0.7"
            style={{ mixBlendMode: "color-dodge" }}
          />
          {segments.map((d, index) => (
            <path
              className={classNames(styles.rhythm, {
                [styles.rhythmActive]: isRhythmSet(halo, index),
              })}
              key={index}
              d={d}
              onClick={() => {
                dispatch({
                  type: "changeHalo",
                  value: setRhythm(halo, index),
                });
              }}
            />
          ))}
        </svg>
        <div className={styles.buttonContainer}>
          {[0, 1, 2, 3, 4, 5].map((haloNum) => (
            <div
              key={haloNum}
              className={classNames(
                styles.haloButtonContainer,
                styles[`halo${haloNum}`]
              )}
            >
              <IconButton
                thickBorder
                active={halo.shape === haloNum}
                icon={`Halo${haloNum}`}
                onClick={() => {
                  dispatch({
                    type: "changeHalo",
                    value: { ...halo, shape: haloNum as Halo["shape"] },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </UiCircle>
      <div className={styles.icon}>
        <IconButton icon="PickerHalo" shadow />
      </div>
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
