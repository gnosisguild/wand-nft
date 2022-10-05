import { useEffect, useRef, useState } from "react";
import * as ToneLib from "tone";

import { useAppContext } from "../../state";
import { Loop } from "tone";

interface Props {
  Tone: typeof ToneLib;
}

interface BackgroundTrack {
  name: string;
  volume: number;
  audioURL: string;
  filterRange: number[];
  filterType: BiquadFilterType;
}

const backgroundTracks: BackgroundTrack[] = [
  {
    name: "dawn",
    volume: -33,
    audioURL: "/background-tracks/birds.mp3",
    filterRange: [100, 10000],
    filterType: "highpass",
  },
  {
    name: "day",
    volume: -6,
    audioURL: "/background-tracks/window.mp3",
    filterRange: [300, 10000],
    filterType: "highpass",
  },
  {
    name: "dusk",
    volume: -16,
    audioURL: "/background-tracks/forest.mp3",
    filterRange: [500, 10000],
    filterType: "highpass",
  },
  {
    name: "night",
    volume: -18,
    audioURL: "/background-tracks/crickets.mp3",
    filterRange: [1000, 10000],
    filterType: "highpass",
  },
];

const useBackgroundTrack = (props: Props) => {
  const { Tone } = props;
  const { state } = useAppContext();
  const [loaded, setLoaded] = useState(false);
  const playersRef = useRef<ToneLib.Players>();
  const playerRef = useRef<ToneLib.Player>();
  const tracks = useRef<BackgroundTrack[]>(backgroundTracks);

  // setup synth on page load
  useEffect(() => {
    playersRef.current = new Tone.Players(
      {
        dawn: tracks.current[0].audioURL,
        day: tracks.current[1].audioURL,
        dusk: tracks.current[2].audioURL,
        night: tracks.current[3].audioURL,
      },
      () => {
        setLoaded(true);
      }
    );
  }, []);

  // changes on every state update
  useEffect(() => {
    console.log("tone context", Tone.context.state);
    if (loaded) {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
      const currentTrack = tracks.current[state.handle];
      playerRef.current = playersRef.current?.player(currentTrack.name);
      playerRef.current?.set({
        loop: true,
        volume: 10,
        autostart: true,
        fadeIn: 1,
        fadeOut: 1,
      });

      const filter = new Tone.Filter();

      filter.type = currentTrack.filterType || "lowpass";
      const lfo = new Tone.LFO(
        0.3,
        currentTrack.filterRange[0],
        currentTrack.filterRange[1]
      );
      lfo.connect(filter.frequency);
      const reverb = new Tone.Reverb({
        decay: 4,
        wet: 0.7,
      });

      playerRef.current?.chain(filter, reverb, Tone.Destination);
      console.log(
        playerRef.current?.loaded,
        Tone.context.state,
        playerRef.current?.get().volume
      );
      if (Tone.context.state === "running" && playerRef.current?.loaded) {
        playerRef.current?.start();
      }
    }
  }, [loaded, state.handle, Tone.context.state]);

  return playersRef.current;
};

export default useBackgroundTrack;
