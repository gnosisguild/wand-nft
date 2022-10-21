import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

import useMidSynth from "./useMidSynth";
import useDroneSynth from "./useDroneSynth";
import useArpSynth from "./useArpSynth";
import useBackgroundTrack from "./useBackgroundTrack";
import { useAppContext } from "../../state";

const useMusic = () => {
  const { state, dispatch } = useAppContext();
  useMidSynth();
  useDroneSynth();
  useArpSynth();
  useBackgroundTrack();

  useEffect(() => {
    if (state.soundOn) {
      Tone.getDestination().volume.rampTo(0);
    } else {
      Tone.getDestination().volume.rampTo(-Infinity);
    }
  }, [state.soundOn]);

  useEffect(() => {
    Tone.Transport.context.on("statechange", () => {
      console.log("transport state cahnge ");
    });
    Tone.getDestination().mute = true;
    const handleMouseDown = async () => {
      dispatch({ type: "ChangeSound", value: true });
      await Tone.start();
      Tone.Transport.start();
      Tone.getDestination().volume.rampTo(0);
      window.removeEventListener("mousedown", handleMouseDown);
    };
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
  }, []);

  return null;
};

export default useMusic;
