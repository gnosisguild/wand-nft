import { useState } from "react";
import MagicSeq from "./MagicSeq";
import Mids from "./Mids";
import Drone from "./Drone";

const Music: React.FC = () => {
  const [play, setPlaying] = useState(false);

  const handleClick = () => {
    if (play) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return (
    <>
      <MagicSeq play={play} />
      <Mids play={play} />
      <Drone play={play} />
      <button
        style={{ position: "relative", zIndex: 99999 }}
        onClick={() => handleClick()}
      >
        {`${play ? "Pause" : "Play"} Magic`}
      </button>
    </>
  );
};

export default Music;
