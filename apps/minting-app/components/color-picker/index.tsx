import { useState } from "react";

import classNames from "classnames";
import UiCircle from "../uiCircle";
import Slider from "./slider";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import styles from "./ColorPicker.module.css";
import { Background } from "../../types";

interface ButtonBgProps {
  className: string;
}

const ButtonBackground: React.FC<ButtonBgProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 41 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(styles.buttonBackground, className)}
    >
      <g style={{ mixBlendMode: "color-dodge" }} opacity="0.2">
        <path
          d="M4.84389 20.645C-0.978571 15.9522 -0.424258 9.26499 3.23448 4.70766C6.79698 0.270156 14.6286 -0.766953 19.3595 4.23887C24.7345 9.92625 20.9798 14.3196 23.5001 16.4419C26.162 18.6836 29.3252 14.8711 35.4502 18.6836C41.1326 22.2206 41.7501 29.8638 38.1564 34.5825C33.8751 39.9575 26.0678 40.2478 21.9689 35.9106C16.1604 29.7645 20.0134 24.8708 17.5157 23.0982C14.8518 21.2077 10.0782 24.8638 4.84389 20.645Z"
          fill="url(#paint0_linear_909_5381)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_909_5381"
          x1="20.4334"
          y1="0.909668"
          x2="20.4334"
          y2="38.914"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EFEBCE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#EFEBCE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ColorPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [innerSlider, setInnerSlider] = useState(
    fromLightness(state.background.color.lightness)
  );
  const { background } = state;

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
          <Slider
            wide={true}
            value={fromHue(background.color.hue)}
            onChange={(nextValue: number) =>
              handleChange({
                ...background,
                color: {
                  ...background.color,
                  hue: toHue(nextValue),
                },
              })
            }
          />
          <Slider
            wide={false}
            value={innerSlider}
            onChange={(nextValue: number) => {
              setInnerSlider(nextValue);
              handleChange({
                ...background,
                color: {
                  ...background.color,
                  lightness: toLightness(nextValue),
                },
              });
            }}
          />
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
        <IconButton icon="PickerAura" shadow />
      </div>
    </div>
  );
};

export default ColorPicker;

function toHue(value: number): number {
  return Math.round(value);
}

function fromHue(value: number): number {
  return value;
}

const LIGHTNESS_BOUNDS = [40, 80];

function toLightness(value: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  const stretch = right - left;

  const mirrored = value < 180 ? value : 360 - value;
  // inverted progress
  const progress = 1 - mirrored / 180;

  return Math.round(left + progress * stretch);
}

function fromLightness(value: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  const stretch = right - left;

  // inverted progress
  const progress = 1 - (value - left) / stretch;

  return progress * 180;
}
