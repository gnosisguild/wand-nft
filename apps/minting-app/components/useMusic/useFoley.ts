import { useEffect, useRef, useState } from "react";
import * as ToneLib from "tone";

interface Props {
  Tone: typeof ToneLib;
  active?: boolean;
  trigger?: boolean;
  type: 0 | 1;
}

interface Foley {
  name: string;
  volume: number;
  audioURL: string;
  transpose?: number,
  playback?: number,
}

const foleyTracks: Foley[] = [
  {
    name: "drag",
    volume: -10,
    audioURL: "/foley/wheel.mp3",
    transpose: -4,
    playback: 0.7
  },
  {
    name: "tap",
    volume: 0,
    audioURL: "/foley/tap.mp3",
    playback: 1,
  },
];

const useFoley = (props: Props) => {
  const { Tone, active, trigger, type } = props;
  const [loaded, setLoaded] = useState(false);
  const playersRef = useRef<ToneLib.Players>();
  const playerRef = useRef<ToneLib.Player>();
  const tracks = useRef<Foley[]>(foleyTracks);

  // setup synth on page load
  useEffect(() => {
    playersRef.current = new Tone.Players(
      {
        drag: tracks.current[0].audioURL,
        tap: tracks.current[1].audioURL,
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
      if(!active) { return };
      const currentTrack = tracks.current[type];
      playerRef.current = playersRef.current?.player(currentTrack.name);
      playerRef.current?.set({
        loop: !trigger,
        volume: currentTrack.volume,
        fadeIn: 0.125,
        fadeOut: 0.125,
        playbackRate: currentTrack.playback, // todo: update based on intertia of rotation
      });

      var pitchShift = new Tone.PitchShift({
        pitch: currentTrack.transpose // todo: update (slightly) based on intertia of rotation
      }).toDestination();

      playerRef.current?.chain(pitchShift, Tone.Destination);

      if (Tone.context.state === "running" && playerRef.current?.loaded && (active || trigger) ) {
        playerRef.current?.start();
      }
    }
  }, [loaded, Tone.context.state, active]);

  return playersRef.current;
};

export default useFoley;
