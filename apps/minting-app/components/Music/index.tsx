import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import MagicSeq from "./MagicSeq";
import Mids from "./Mids";
import Drone from "./Drone";

const Music: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [ready, setReady] = useState(false);
  const [play, setPlaying] = useState(false);

  useEffect(() => {
    if (ready) {
      setPlaying(!play);
      window.setTimeout(() => setPlaying(true), 100);
    }
  }, [state]);

  const handleClick = () => {
    if (ready) {
      setPlaying(!play);
    } else {
      setReady(true);
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
