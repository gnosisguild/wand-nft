import { useEffect, useRef } from "react";
import * as ToneLib from "tone";

import { useAppContext } from "../../state";
interface Props {
  Tone: typeof ToneLib;
}

const useDroneSynth = (props: Props) => {
  const { Tone } = props;
  const { state } = useAppContext();
  const droneSynthRef = useRef<ToneLib.Synth>();
  const sequenceRef = useRef<ToneLib.Sequence>();
  const chords = useRef<string[]>([]);

  // setup synth on page load
  useEffect(() => {
    const reverb = new Tone.Reverb({
      decay: 20,
      wet: 0.8,
      preDelay: 0.2,
    });

    const effect = new Tone.FeedbackDelay(0.2, 0.35);
    effect.wet.value = 0.5;

    const filter = new Tone.Filter(100, "lowpass");

    droneSynthRef.current = new Tone.Synth({
      oscillator: {
        type: "fatsquare",
        count: 3,
        spread: 20,
      },
      envelope: {
        attack: 0.5,
        decay: 0.1,
        sustain: 0.5,
        release: 0.1,
      },
      volume: -12,
    });

    droneSynthRef.current.chain(effect, reverb, filter, Tone.Destination);
  }, []);

  // changes on every state update
  useEffect(() => {
    droneSynthRef.current?.triggerRelease();
    const auraFreq = state.background.color.hue;
    const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    const droneNote = `${baseFreq}0`;

    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }
    sequenceRef.current = new Tone.Sequence(
      (time, note) => {
        droneSynthRef.current?.triggerAttackRelease(note, "4m");
      },
      [droneNote],
      "4m"
    ).start();
  }, [state.background.color.hue]);

  return droneSynthRef.current;
};

export default useDroneSynth;
