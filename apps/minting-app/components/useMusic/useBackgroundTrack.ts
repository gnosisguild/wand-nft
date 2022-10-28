import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

import { useAppContext } from "../../state";
import { Loop } from "tone";

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
    volume: -13,
    audioURL: "/background-tracks/birds.mp3",
    filterRange: [100, 10000],
    filterType: "highpass",
  },
  {
    name: "day",
    volume: 3,
    audioURL: "/background-tracks/window.mp3",
    filterRange: [300, 10000],
    filterType: "highpass",
  },
  {
    name: "dusk",
    volume: -3,
    audioURL: "/background-tracks/forest.mp3",
    filterRange: [500, 10000],
    filterType: "highpass",
  },
  {
    name: "night",
    volume: -19,
    audioURL: "/background-tracks/crickets.mp3",
    filterRange: [1000, 10000],
    filterType: "highpass",
  },
];

const useBackgroundTrack = () => {
  const { state } = useAppContext();
  const [loaded, setLoaded] = useState(false);
  const playersRef = useRef<Tone.Players>();
  const playerRef = useRef<Tone.Player>();
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
    if (loaded) {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
      const currentTrack = tracks.current[state.handle];
      playerRef.current = playersRef.current?.player(currentTrack.name);
      playerRef.current?.set({
        loop: true,
        volume: currentTrack.volume,
        autostart: true,
        fadeIn: 1,
        fadeOut: 1,
      });

      // const filter = new Tone.Filter();

      // filter.type = currentTrack.filterType || "lowpass";
      // const lfo = new Tone.LFO(
      //   0.3,
      //   currentTrack.filterRange[0],
      //   currentTrack.filterRange[1]
      // );
      // lfo.connect(filter.frequency);

      // const effect = new Tone.PingPongDelay(0.5, 0.45);
      // effect.wet.value = 0.05;

      playerRef.current?.chain(Tone.Destination);

      if (Tone.context.state === "running" && playerRef.current?.loaded) {
        playerRef.current?.start();
      }
    }
  }, [loaded, state.handle, Tone.context.state]);

  return playersRef.current;
};

export default useBackgroundTrack;
