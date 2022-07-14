import UiCircle from "../uiCircle";
import Slider from "./Slider";
import { useAppContext } from "../../state";

const HaloPicker: React.FC = () => {
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
        <svg viewBox={`0 0 1000 1000`}>
          <Slider
            wide={true}
            value={background.color.hue}
            onChange={(nextValue: number) => onHueChange(nextValue)}
          />
          <Slider
            wide={false}
            value={from100To360(background.color.lightness)}
            onChange={(nextValue: number) =>
              onLightnessChange(from360To100(nextValue))
            }
          />
        </svg>
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
