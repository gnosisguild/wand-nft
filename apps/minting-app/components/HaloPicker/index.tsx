import { useRef, useEffect, useState } from "react";
import classNames from "classnames";

import { Halo } from "../../types";
import { useAppContext } from "../../state";
import { normalizeAngle } from "../../state/transforms/transformRotations";

import { describeSegments, describeFillers } from "../../utils/rhythm";
import { randomHalo } from "../../utils/randomizer";

import UiCircle from "../UiCircle";
import IconButton from "../IconButton";

// import * as Tone from "tone";

import styles from "./HaloPicker.module.css";

const VIEWBOX_SIZE = 1000;
const CONFIG = {
  SEGMENT: {
    percBorder: 0.041,
    percThickness: 0.048,
    percSkew: 0.5,
    gapInDegrees: 2,
    viewBoxSize: VIEWBOX_SIZE,
  },
  FILLER: {
    percBorder: 0.031,
    percThickness: 0.07,
    percSkew: 0.5,
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

  // const [note, setNote] = useState<string>("C");

  // const synthRef = useRef<Tone.Synth>();

  const { halo } = state;
  const isWide = isWideShape(halo.shape);
  const [segments, fillers] = isWide ? WIDE : NARROW;

  // useEffect(() => {
  //   const auraFreq = normalizeAngle(state.background.color.hue);
  //   const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
  //   setNote(baseFreq);
  // }, [state.background.color.hue]);

  // useEffect(() => {
  //   synthRef.current = new Tone.Synth({
  //     volume: -20,
  //     envelope: {
  //       attack: 0.1,
  //       decay: 0.5,
  //     },
  //   });

  //   const reverb = new Tone.Reverb({
  //     decay: isWide ? 1 : 0.5,
  //     wet: 0.5,
  //   });

  //   const filter = new Tone.Filter(5000, "lowpass", -12);

  //   const lfo = new Tone.LFO(
  //     3,
  //     Tone.Frequency(`${note}6`).toFrequency(),
  //     Tone.Frequency(`${note}8`).toFrequency()
  //   );

  //   lfo.connect(filter.frequency);

  //   synthRef.current?.chain(filter, reverb, Tone.Destination);
  // }, [halo.shape]);

  // useEffect(() => {
  //   if (state.soundOn) {
  //     synthRef.current?.frequency.rampTo(`${note}8`, 0.02);
  //     synthRef.current?.triggerAttackRelease(`${note}3`, 0.11);
  //   }
  // }, [halo.rhythm]);

  return (
    <>
      <UiCircle>
        <svg
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          className={classNames(styles.haloSvg, styles.frameSvg)}
        >
          <circle
            cy="500"
            cx="500"
            r="475"
            stroke="#D9D4AD"
            strokeWidth="16"
            fill="none"
            opacity="0.7"
          />
          {fillers.map((d, index) => (
            <path
              key={`${isWide}-${index}`}
              d={d}
              fill="#D9D4AD"
              opacity="0.7"
            />
          ))}
        </svg>
        <svg
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          className={classNames(styles.haloSvg, styles.segmentSvg)}
        >
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
        </svg>
        <div className={styles.buttonContainer}>
          {([0, 1, 2, 3, 4, 5] as const).map((haloNum) => (
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
        <IconButton
          icon="PickerHalo"
          shadow
          onClick={() => {
            dispatch({
              type: "changeHalo",
              value: randomHalo(),
            });
          }}
        />
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

function isWideShape(shape: number) {
  return ![1, 5].includes(shape);
}

export default HaloPicker;
