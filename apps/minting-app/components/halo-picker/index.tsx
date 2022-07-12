import styles from "./HaloPicker.module.css";
import { UiCircle } from "../";
import { useAppContext } from "../../context/AppContext";
import {
  NARROW_SEGMENTS,
  WIDE_SEGMENTS,
  VIEWBOX_WIDTH,
  VIEWBOX_HEIGHT,
} from "./rhythm";
import buttons from "./buttons";
import { Halo } from "../../types";

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { halo } = state;
  const segments = _isWide(halo) ? WIDE_SEGMENTS : NARROW_SEGMENTS;

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
              fill={isHaloSet(halo, index) ? "green" : "yellow"}
              onClick={() => {
                dispatch({ type: "changeHalo", value: setHalo(halo, index) });
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

function isHaloSet(halo: Halo, type: number) {
  if (type < 0 || type > 5) {
    throw new Error("Huuuuh?");
  }

  if (type === 0) {
    return halo.halo0;
  } else if (type === 1) {
    return halo.halo1;
  } else if (type === 2) {
    return halo.halo2;
  } else if (type === 3) {
    return halo.halo3;
  } else if (type === 4) {
    return halo.halo4;
  } else if (type === 5) {
    return halo.halo5;
  }
}

function setHalo(halo: Halo, type: number): Halo {
  if (type < 0 || type > 5) {
    throw new Error();
  }

  return {
    ...halo,
    halo0: type === 0,
    halo1: type === 1,
    halo2: type === 2,
    halo3: type === 3,
    halo4: type === 4,
    halo5: type === 5,
  };
}

function _isWide(halo: Halo): boolean {
  /*
    0 - wide
    1 - narrow
    2 - wide
    3 - wide
    4 - wide
    5 - narrow
  */
  if (halo.halo0) {
    return true;
  } else if (halo.halo1) {
    return false;
  } else if (halo.halo2) {
    return true;
  } else if (halo.halo3) {
    return true;
  } else if (halo.halo4) {
    return true;
  } else if (halo.halo5) {
    return false;
  }
  throw Error("huh??");
}

function teflonIndex(halo: Halo, index: number) {
  const isWide = _isWide(halo);
  const threshold = isWide ? 6 : 12;

  const deduped = index > threshold ? threshold - (index - threshold) : index;

  return isWide ? deduped * 2 : deduped;
}

export default HaloPicker;
