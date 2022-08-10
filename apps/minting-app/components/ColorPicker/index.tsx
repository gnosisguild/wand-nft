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
          <HueArc
            value={fromHue(background.color.hue)}
            onChange={(nextValue: number) => {
              handleChange({
                ...background,
                color: {
                  ...background.color,
                  hue: toHue(nextValue),
                },
              });
            }}
          />
          <LightnessArc
            value={fromLightness(background.color.lightness)}
            onChange={(nextValue: number) => {
              handleChange({
                ...background,
                color: {
                  ...background.color,
                  lightness: toLightness(nextValue),
                },
              });
            }}
          />
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
              fill={`hsl(0, 0%, ${background.color.lightness}%)`}
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
            handleChange({
              ...background,
              radial: randomInteger(1) === 1,
              dark: randomInteger(1) === 1,
              color: {
                ...background.color,
                hue: toHue(randomInteger(359)),
                lightness: toLightness(randomInteger(359)),
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

const LIGHTNESS_BOUNDS = [20, 70];

function toLightness(value: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  const spectrum = right - left;

  const mirrored = value < 180 ? value : 360 - value;
  // inverted progress
  const progress = 1 - mirrored / 180;

  return Math.round(left + progress * spectrum);
}

function fromLightness(value: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  const spectrum = right - left;

  // inverted progress
  const progress = 1 - (value - left) / spectrum;

  return progress * 180;
}
