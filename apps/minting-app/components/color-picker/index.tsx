import classNames from "classnames";
import UiCircle from "../uiCircle";
import Slider from "./Slider";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import styles from "./ColorPicker.module.css";

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

  const { background } = state;

  const onHueChange = (nextValue: number) => {
    dispatch({
      type: "changeBackground",
      value: {
        ...background,
        color: {
          ...background.color,
          hue: Math.round(nextValue),
        },
      },
    });
  };

  const onLightnessChange = (nextValue: number) => {
    dispatch({
      type: "changeBackground",
      value: {
        ...background,
        color: {
          ...background.color,
          lightness: Math.round(nextValue),
        },
      },
    });
  };

  return (
    <div>
      <UiCircle>
        <svg viewBox={`0 0 1000 1000`} className={styles.svg}>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset={"0%"} stopColor="#e40303" />
            <stop offset={"20%"} stopColor="#ff8c00" />
            <stop offset={"40%"} stopColor="#ffed00" />
            <stop offset={"60%"} stopColor="#008026" />
            <stop offset={"80%"} stopColor="#004dff" />
            <stop offset={"100%"} stopColor="#750787" />
          </linearGradient>
          <Slider
            wide={true}
            stroke={"url(#gradient)"}
            value={background.color.hue}
            onChange={(nextValue: number) => onHueChange(nextValue)}
          />
          <Slider
            wide={false}
            stroke={"url(#gradient)"}
            value={from100To360(background.color.lightness)}
            onChange={(nextValue: number) =>
              onLightnessChange(from360To100(nextValue))
            }
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
            <IconButton thickBorder icon="Dark" />
          </div>
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.lightButton
            )}
          >
            <IconButton thickBorder icon="Light" />
          </div>
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.radialButton
            )}
          >
            <IconButton thickBorder icon="Radial" />
          </div>
          <div
            className={classNames(
              styles.auraButtonContainer,
              styles.linearButton
            )}
          >
            <IconButton thickBorder icon="Linear" />
          </div>
        </div>
      </UiCircle>
      <div className={styles.icon}>
        <IconButton icon="PickerHalo" shadow />
      </div>
    </div>
  );
};

export default ColorPicker;

function from100To360(value: number) {
  return 360 * (value / 100);
}

function from360To100(value: number) {
  return 100 * (value / 360);
}
