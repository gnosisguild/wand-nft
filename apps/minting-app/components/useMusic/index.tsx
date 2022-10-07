import React, { useEffect, useRef } from "react";
import * as ToneLib from "tone";

import useMidSynth from "./useMidSynth";
import useDroneSynth from "./useDroneSynth";
import useArpSynth from "./useArpSynth";
import useBackgroundTrack from "./useBackgroundTrack";

const useMusic = () => {
  const toneRef = useRef(ToneLib);
  useMidSynth({ Tone: toneRef.current });
  useDroneSynth({ Tone: toneRef.current });
  useArpSynth({ Tone: toneRef.current });
  useBackgroundTrack({ Tone: toneRef.current });

  useEffect(() => {
    const handleMouseDown = async () => {
      await toneRef.current.start();
      toneRef.current.Transport.start();
      window.removeEventListener("mousedown", handleMouseDown);
    };
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
  }, []);

  return toneRef.current;
};

export default useMusic;
