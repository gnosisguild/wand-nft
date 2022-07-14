import styles from "./HaloPicker.module.css";
import UiCircle from "../uiCircle";
import Slider from "./Slider";
import { useAppContext } from "../../state";

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { background } = state;

  const handleHue = (nextValue: number) => {
    dispatch({
      type: "changeBackground",
      value: {
        ...background,
        color: {
          ...background.color,
          hue: nextValue,
        },
      },
    });
  };

  const handleLightness = (nextValue: number) => {
    dispatch({
      type: "changeBackground",
      value: {
        ...background,
        color: {
          ...background.color,
          lightness: nextValue,
        },
      },
    });
  };

  return (
    <div>
      <UiCircle>
        {/* <Slider wide={true} value={background.color.hue} onChange={handleHue} /> */}
        <Slider
          wide={false}
          value={from100To360(background.color.lightness)}
          onChange={(nextValue: number) =>
            handleLightness(from360To100(nextValue))
          }
        />
      </UiCircle>
    </div>
  );
};

export default HaloPicker;

function from100To360(value: number) {
  return 360 * (value / 100);
}

function from360To100(value: number) {
  return 100 * (value / 360);
}
