import React, { useCallback, useEffect, useRef, useState } from "react";
import { Scale, transpose } from "tonal";
import * as ToneLib from "tone";

import useMidSynth from "./useMidSynth";
import useDroneSynth from "./useDroneSynth";
import useArpSynth from "./useArpSynth";
import useBackgroundTrack from "./useBackgroundTrack";

const Music: React.FC = () => {
  const toneRef = useRef(ToneLib);
  useMidSynth({ Tone: toneRef.current });
  useDroneSynth({ Tone: toneRef.current });
  useArpSynth({ Tone: toneRef.current });
  useBackgroundTrack({ Tone: toneRef.current });

  // const setupBackgroundTrack = () => {
  //   const backgroundTracks: BackgroundTrack[] = [
  //     {
  //       name: "dawn",
  //       volume: -33,
  //       audio: Birds,
  //       filterRange: [100, 10000],
  //       filterType: "highpass",
  //     },
  //     {
  //       name: "day",
  //       volume: -6,
  //       audio: Window,
  //       filterRange: [300, 10000],
  //       filterType: "highpass",
  //     },
  //     {
  //       name: "dusk",
  //       volume: -16,
  //       audio: Forest,
  //       filterRange: [500, 10000],
  //       filterType: "highpass",
  //     },
  //     {
  //       name: "night",
  //       volume: -18,
  //       audio: Crickets,
  //       filterRange: [1000, 10000],
  //       filterType: "highpass",
  //     },
  //   ];

  //   const activeTrack = backgroundTracks[state.handle];

  //   new Tone.ToneAudioBuffer(activeTrack.audio);

  //   setBackgroundTrack(activeTrack);
  // };

  // const triggerBackgroundTrack = () => {
  //   if (!backgroundTrack) return;
  //   const filter = new Tone.Filter();
  //   if (backgroundTrack.filterRange) {
  //     filter.type = backgroundTrack.filterType || "lowpass";
  //     const lfo = new Tone.LFO(
  //       0.3,
  //       backgroundTrack.filterRange[0],
  //       backgroundTrack.filterRange[1]
  //     );
  //     lfo.connect(filter.frequency);
  //   }

  //   const reverb = new Tone.Reverb({
  //     decay: 4,
  //     wet: 0.7,
  //   });

  //   player.current = new Tone.Player(backgroundTrack.audio, () => {
  //     if (player && player.current) {
  //       player.current.loop = true;
  //       player.current.volume.value = -80;
  //       player.current.autostart = true;
  //       player.current.fadeIn = 1;
  //       player.current.fadeOut = 1;
  //       player.current.loop = true;
  //       player.current.volume.rampTo(backgroundTrack.volume, 3);
  //     }
  //   });

  //   player.current.connect(filter);
  //   filter.connect(reverb);
  //   reverb.connect(Tone.Destination);

  //   console.log(`starting background track: ${backgroundTrack.name}`);
  // };

  useEffect(() => {
    const handleMouseDown = () => {
      toneRef.current.start();
      toneRef.current.Transport.start();
      window.removeEventListener("mousedown", handleMouseDown);
    };
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
  }, []);

  return <></>;
};

export default Music;
