import { useState } from "react";
import IconButton from "./IconButton";

export const SoundButton = () => {
  const [active, setActive] = useState(true);

  return (
    <IconButton
      icon={active ? "SoundOn" : "SoundOff"}
      onClick={() => {
        setActive(!active);
      }}
    />
  );
};
