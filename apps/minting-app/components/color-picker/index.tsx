import styles from "./HaloPicker.module.css";
import UiCircle from "../uiCircle";
import { createSlider } from "./Slider";
import { useAppContext } from "../../state";

const Slider = createSlider(0.1);

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { background } = state;

  return (
    <div>
      <UiCircle>
        <Slider
          value={background.color.hue}
          onChange={(nextValue) => {
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
          }}
        />
      </UiCircle>
    </div>
  );
};

export default HaloPicker;
