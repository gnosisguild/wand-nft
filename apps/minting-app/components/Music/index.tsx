import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import MagicSeq from "./MagicSeq";
import Mids from "./Mids";
import Drone from "./Drone";

const Music: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [play, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(!play);
    window.setTimeout(() => setPlaying(true), 100);
  }, [state]);

  return (
    <>
      <MagicSeq play={play} />
      <Mids play={play} />
      <Drone play={play} />
    </>
  );
};

export default Music;
