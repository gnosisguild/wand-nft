import { useAppContext } from "../../state";
import IconButton from "../IconButton";

export const SoundButton = () => {
  const { state, dispatch } = useAppContext();
  return (
    <IconButton
      icon={state.soundOn ? "SoundOn" : "SoundOff"}
      onClick={() => {
        dispatch({ type: "ChangeSound", value: !state.soundOn });
      }}
    />
  );
};
