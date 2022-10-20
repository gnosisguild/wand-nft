import { useEffect, useRef } from "react";
import * as ToneLib from "tone";
import { Scale, transpose, Chord } from "tonal";

import { haloStyle } from "./HaloShapeMappings";
import { mapValue } from "../../utils/mapValue";
import { useAppContext } from "../../state";
interface Props {
  Tone: typeof ToneLib;
}

const useMidSynth = (props: Props) => {
  const { Tone } = props;
  const { state } = useAppContext();
  const midSynthRef = useRef<ToneLib.PolySynth>();
  const sequenceRef = useRef<ToneLib.Sequence>();
  const chords = useRef<string[]>([]);

  // setup synth on page load
  useEffect(() => {
    midSynthRef.current = new Tone.PolySynth({
      volume: -30,
    });
    midSynthRef.current.set({
      envelope: {
        attack: 2,
        decay: 0.3,
        sustain: 0.8,
        release: 2,
      },
    });

    const filter = new Tone.Filter(500, "bandpass", -24);
    const lfo = new Tone.LFO(0.1, 140, 600);
    lfo.connect(filter.frequency);
    const effect = new Tone.FeedbackDelay(1, 0.8);
    effect.wet.value = 0.8;
    const reverb = new Tone.Reverb({
      decay: 10,
      wet: 0.75,
    });

    midSynthRef.current.chain(filter, reverb, effect, Tone.Destination);
  }, []);

  // changes on every state update
  useEffect(() => {
    if (midSynthRef.current) {
      midSynthRef.current.releaseAll();
      // changing the oscillator is causing polysynth to get backed up and fail
      midSynthRef.current.set({
        oscillator: { type: haloStyle[state.halo.shape] },
      });
    }

    const scales = [
      "major",
      "minor",
      "minor pentatonic",
      "major pentatonic",
      "phrygian",
      "dorian",
    ];
    const material =
      scales[Math.floor(mapValue(state.stone, 0, 360, 0, scales.length))];

    // baseNote gives us note letter e.g. "C"
    const baseNote = Tone.Frequency(Math.abs(state.background.color.hue))
      .toNote()
      .charAt(0);

    // noteHeight gives us the frequency notation
    // of the note e.g. "3"
    const noteHeight = Math.floor(
      mapValue(Math.abs(state.background.color.lightness), 0, 360, 2, 5)
    );

    // noteFreq gives us a valid notation e.g. "C3"
    const noteFreq = baseNote + noteHeight.toString();
    const scaleChords = Scale.chords(material);
    // we can use the note and the material to get an array of chords
    const chord1 = Chord.notes(noteFreq, scaleChords[0]);
    const chord2 = Chord.notes(noteFreq, scaleChords[1]);
    const chord3 = Chord.notes(noteFreq, scaleChords[2]);
    const chord4 = Chord.notes(noteFreq, scaleChords[3]);

    // stringify array so Tone.Sequence doesn't use the array to create sub-sequences
    chords.current = [
      JSON.stringify(cleanScale(chord1)),
      JSON.stringify(cleanScale(chord2)),
      JSON.stringify(cleanScale(chord3)),
      JSON.stringify(cleanScale(chord4)),
    ];

    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }
    sequenceRef.current = new Tone.Sequence(
      (time, noteJSON) => {
        const noteArray = JSON.parse(noteJSON);
        midSynthRef.current?.triggerAttackRelease(noteArray, "4m");
      },
      chords.current,
      "4m"
    ).start();
  }, [
    state.stone,
    state.halo.shape,
    state.background.color.hue,
    state.background.color.lightness,
  ]);

  return midSynthRef.current;
};

// necessary because of bug in Scale lib that returns notes with
// improperly constructed notations — e.g. "F##5"
const cleanScale = (noteArray: string[]) => {
  return noteArray.map((note: string) =>
    Array.from(note)
      .filter((item, i, arr) => i === 0 || item !== arr[i - 1])
      .join("")
  );
};

export default useMidSynth;
