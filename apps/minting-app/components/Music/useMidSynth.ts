import { useEffect, useRef } from "react";
import * as ToneLib from "tone";
import { Scale, transpose, Chord } from "tonal";

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
    }).toDestination();
  }, []);

  // changes on every state update
  useEffect(() => {
    console.log("update chords");
    const scales = ["major", "minor", "minor pentatonic", "phrygian", "dorian"];
    const material =
      scales[Math.floor(mapValue(state.stone, 0, 360, 0, scales.length))];

    // baseNote gives us note letter e.g. "C"
    const baseNote = Tone.Frequency(state.background.color.hue)
      .toNote()
      .charAt(0);

    // noteHeight gives us the frequency notation
    // of the note e.g. "3"
    const noteHeight = Math.floor(
      mapValue(state.background.color.lightness, 0, 360, 1, 6)
    );

    // noteFreq gives us a valid notation e.g. "C3"
    const noteFreq = baseNote + noteHeight.toString();
    const scaleChords = Scale.chords(material);

    // we can use the note and the material to get an array of chords
    const chord1 = Chord.notes(noteFreq, scaleChords[0]);
    const chord2 = Chord.notes(noteFreq, scaleChords[1]);
    const chord3 = Chord.notes(noteFreq, scaleChords[2]);
    const chord4 = Chord.notes(noteFreq, scaleChords[3]);

    chords.current = [
      JSON.stringify(cleanScale(chord1)),
      JSON.stringify(cleanScale(chord2)),
      JSON.stringify(cleanScale(chord3)),
      JSON.stringify(cleanScale(chord4)),
    ];

    console.log(chords.current);
    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }

    sequenceRef.current = new Tone.Sequence((time, noteJSON) => {
      const noteArray = JSON.parse(noteJSON);
      midSynthRef.current?.triggerAttackRelease(noteArray, "0.2");
    }, chords.current).start(0);
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
