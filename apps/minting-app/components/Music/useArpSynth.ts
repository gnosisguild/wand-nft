import { useEffect, useRef } from "react";
import * as ToneLib from "tone";
import { Scale, transpose, Chord } from "tonal";

import { haloStyle } from "./HaloShapeMappings";
import { mapValue } from "../../utils/mapValue";
import { useAppContext } from "../../state";
interface Props {
  Tone: typeof ToneLib;
}

const useArpSynth = (props: Props) => {
  const { Tone } = props;
  const { state } = useAppContext();
  const arpSynthRef = useRef<ToneLib.Synth>();
  const sequenceRef = useRef<ToneLib.Sequence>();
  const chords = useRef<string[]>([]);

  // setup synth on page load
  useEffect(() => {
    const reverb = new Tone.Reverb({
      decay: 2,
      wet: 0.8,
      preDelay: 1,
    });

    const effect = new Tone.FeedbackDelay(0.17, 0.7);
    effect.wet.value = 0.1;

    const filter = new Tone.Filter(8000, "bandpass", -48);

    arpSynthRef.current = new Tone.Synth({
      oscillator: {
        type: haloStyle[state.halo.shape],
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0.8,
        release: 1,
      },
      volume: -25,
    });

    arpSynthRef.current.chain(reverb, filter, Tone.Destination);
  }, []);

  // changes on every state update
  useEffect(() => {
    const material =
      Scale.names()[
        Math.floor(mapValue(state.stone, 0, 360, 0, Scale.names().length))
      ];

    const auraFreq = state.background.color.hue;
    const haloRhythm = state.halo.rhythm;
    const lightness = state.background.color.lightness;

    let baseOctave = 4;
    let octaves = 4;
    let baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);

    let noteArray = [];
    let scale = Scale.notes(`${baseFreq}${baseOctave} ` + material);
    for (let i = baseOctave + 1; i < baseOctave + octaves; i++) {
      scale = scale.concat(Scale.notes(`${baseFreq}${i} ` + material));
    }

    for (let i = 0; i < scale.length; i++) {
      // noteArray.push(scale[i]);
      if (haloRhythm[i % haloRhythm.length]) {
        noteArray.push(scale[i]);
      } else {
        noteArray.push(0);
      }
    }

    if (state.background.dark) {
      // inverse order - downwards progression
      noteArray.reverse();
    }

    // if (state.background.radial) {
    //   // shuffle order
    //   rhythm = rhythm.sort(() => 0.5 - Math.random());
    // }

    // how long the sequence should take before repeating in seconds (last two values are the range)
    const sequenceLength = mapValue(lightness, 0, 360, 1, 5);

    const interval = [0, 3, 4].includes(state.halo.shape) ? "72n" : "96n";

    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }
    sequenceRef.current = new Tone.Sequence(
      (time, note) => {
        arpSynthRef.current?.triggerAttackRelease(note, interval);
      },
      noteArray,
      sequenceLength
    ).start();
  }, [
    state.stone,
    state.halo.shape,
    state.background.color.hue,
    state.background.dark,
    state.background.color.lightness,
  ]);

  return arpSynthRef.current;
};

export default useArpSynth;
