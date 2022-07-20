import classNames from "classnames";
import styles from "./HaloPicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import { describeSegments, describeFillers } from "../rhythm";
import { Halo } from "../../types";
import { isWideShape } from "../../template";
import IconButton from "../IconButton";

const VIEWBOX_SIZE = 1000;
const CONFIG = {
  SEGMENT: {
    percBorder: 0.041,
    percThickness: 0.048,
    gapInDegrees: 2,
    viewBoxSize: VIEWBOX_SIZE,
  },
  FILLER: {
    percBorder: 0.031,
    percThickness: 0.07,
    spanInDegrees: 2,
    viewBoxSize: VIEWBOX_SIZE,
  },
};

const WIDE = [
  describeSegments(12, CONFIG.SEGMENT),
  describeFillers(12, CONFIG.FILLER),
];
const NARROW = [
  describeSegments(24, CONFIG.SEGMENT),
  describeFillers(24, CONFIG.FILLER),
];

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { halo } = state;
  const isWide = isWideShape(halo.shape);
  const [segments, fillers] = isWide ? WIDE : NARROW;

  return (
    <>
      <UiCircle>
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
            <path
              className={classNames(styles.rhythm, {
                [styles.rhythmActive]: isRhythmSet(halo, index),
              })}
              key={`${isWide}-${index}`}
              d={d}
              onClick={() => {
                dispatch({
                  type: "changeHalo",
                  value: setRhythm(halo, index),
                });
              }}
            />
          ))}
          {fillers.map((d, index) => (
            <path
              key={`${isWide}-${index}`}
              d={d}
              fill="#D9D4AD"
              opacity="0.7"
              style={{ mixBlendMode: "color-dodge" }}
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
    </>
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
  const [midway, multiplier] = isWideShape(halo.shape) ? [6, 2] : [12, 1];

  const skew = Math.max(0, index - midway);
  return (skew > 0 ? midway - skew : index) * multiplier;
}

export default HaloPicker;
