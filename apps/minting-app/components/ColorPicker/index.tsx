import React from "react";
import classNames from "classnames";

import { Background } from "../../types";
import { useAppContext } from "../../state";

import UiCircle from "../UiCircle";
import IconButton from "../IconButton";

import { HueArc, LightnessArc } from "./Arc";
import ButtonBackground from "./ButtonBackground";
import styles from "./ColorPicker.module.css";
import randomInteger from "../randomInteger";
import useDragRotateAnimate from "../useDragRotateAnimate";

const ColorPicker: React.FC = () => {
  const {
    state: { background },
    dispatch,
  } = useAppContext();

  const handleChange = (value: Background) => {
    dispatch({
      type: "changeBackground",
      value,
    });
  };

  const hueProps = useDragRotateAnimate<SVGPathElement>(
    fromHue(background.color.hue),
    (nextRotation: number) => {
      handleChange({
        ...background,
        color: {
          ...background.color,
          hue: toHue(nextRotation),
        },
      });
    }
  );

  const lightnessProps = useDragRotateAnimate<SVGPathElement>(
    background.color.lightness,
    (nextRotation: number) => {
      handleChange({
        ...background,
        color: {
          ...background.color,
          lightness: nextRotation,
        },
      });
    }
  );

  return (
    <div>
      <UiCircle>
        <svg viewBox={`0 0 1000 1000`} className={styles.svg}>
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
          <HueArc {...hueProps} />
          <LightnessArc {...lightnessProps} />
          <g style={{ pointerEvents: "none" }}>
            <rect
              className={classNames(
                styles.viewfinderPath,
                styles.viewFinderRect
              )}
              width="70"
              height="70"
              x="470"
              y="30"
              fill={`hsl(${background.color.hue}, 100%, 50%)`}
            />
            <rect
              className={classNames(
                styles.viewfinderPath,
                styles.viewFinderRect
              )}
              width="70"
              height="70"
              x="470"
              y="210"
              fill={`hsl(0, 0%, ${
                (Math.abs(background.color.lightness - 180) / 180) * 100
              }%)`}
            />
          </g>
        </svg>
        <div className={styles.buttonContainer}>
          <ButtonBackground className={styles.realmBackground} />
          <ButtonBackground className={styles.typeBackground} />
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.darkButton
            )}
          >
            <IconButton
              thickBorder
              icon="Dark"
              active={background.dark}
              onClick={() => handleChange({ ...background, dark: true })}
            />
          </div>
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.lightButton
            )}
          >
            <IconButton
              thickBorder
              icon="Light"
              active={!background.dark}
              onClick={() => handleChange({ ...background, dark: false })}
            />
          </div>
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.radialButton
            )}
          >
            <IconButton
              thickBorder
              icon="Radial"
              active={background.radial}
              onClick={() => handleChange({ ...background, radial: true })}
            />
          </div>
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.linearButton
            )}
          >
            <IconButton
              thickBorder
              icon="Linear"
              active={!background.radial}
              onClick={() => handleChange({ ...background, radial: false })}
            />
          </div>
        </div>
      </UiCircle>
      <div className={styles.icon}>
        <IconButton
          icon="PickerAura"
          shadow
          onClick={() => {
            const hueTo = randomInteger(3599) / 10;
            const lightnessTo = randomInteger(3599) / 10;

            handleChange({
              ...background,
              dark: randomInteger(1) == 1,
              radial: randomInteger(1) == 1,
              color: {
                ...background.color,
                hue: toHue(hueTo),
                lightness: lightnessTo,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default ColorPicker;

function toHue(value: number): number {
  return Math.round(360 - value) % 360;
}

function fromHue(value: number): number {
  return 360 - value;
}
