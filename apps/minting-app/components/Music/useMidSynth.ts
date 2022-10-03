import { useEffect, useRef } from "react";
import * as ToneLib from "tone";
import { Scale, transpose } from "tonal";

import { mapValue } from "../../utils/mapValue";
import { useAppContext } from "../../state";
interface Props {
  Tone: typeof ToneLib,
}

const useMidSynth= (props: Props) => {
  const {Tone} = props;
  const {state} = useAppContext();
  const midSynthRef = useRef<ToneLib.PolySynth>();
  const sequenceRef = useRef<ToneLib.Sequence>();
  const chords = useRef<string[]>([]);
  
  // setup synth on page load
  useEffect(() =>{
    midSynthRef.current = new Tone.PolySynth({
      volume: -40,
    }).toDestination()
  }, [])

  // changes on every state update
  useEffect(() =>{
    console.log('update chords');
    const scales = ["major", "minor", "minor pentatonic", "phrygian", "dorian"];
    const material =
      scales[Math.floor(mapValue(state.stone, 0, 360, 0, scales.length))];
    const auraFreq = state.background.color.hue;

    const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    const scale1 = Scale.notes(
      `${transpose(`${baseFreq}3`, "5M")} ${material}`
    );
    const scale2 = Scale.notes(`${baseFreq}4 ${material}`);
    const scale3 = Scale.notes(
      `${transpose(`${baseFreq}4`, "7M")} ${material}`
    );
    const scale4 = Scale.notes(`${baseFreq}5 ${material}`);
    chords.current = [JSON.stringify(scale1), JSON.stringify(scale2), JSON.stringify(scale3), JSON.stringify(scale4)];

    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }

    sequenceRef.current = new Tone.Sequence((time, note) => {
        const chordSet = JSON.parse(note).slice(0,3);
        console.log('running sequence piece — ', JSON.stringify(chordSet))
        midSynthRef.current?.triggerAttackRelease(chordSet, "0.2");
      }, chords.current).start(0)
  },[state.stone, state.halo.shape, state.background.color.hue] )

  return midSynthRef.current;
}

export default useMidSynth