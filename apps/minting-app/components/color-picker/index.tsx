import styles from "./HaloPicker.module.css";
import UiCircle from "../uiCircle";
import { createSlider } from "./Slider";
import { useAppContext } from "../../state";

const Slider = createSlider(0.1);

const HaloPicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { halo } = state;

  return (
    <div>
      <UiCircle>
        <Slider value={0} onChange={() => {}} />
      </UiCircle>
    </div>
  );
};

export default HaloPicker;
