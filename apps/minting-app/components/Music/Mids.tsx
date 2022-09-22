import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import { Scale, transpose } from "tonal";
import { haloStyle } from "./HaloShapeMappings";
import * as Tone from "tone";

const Mids: React.FC = () => {
  const { state } = useAppContext();
  const [ready, setReady] = useState(false);
  const [chords, setChords] = useState();

  let filter;
  let lfo;
  let melody;
  let reverb;
  let effect;
  let synth;

  useEffect(() => {
    const material = "major";
    // Scale.names()[
    //   Math.floor(mapValue(state.stone, 0, 360, 0, Scale.names().length))
    // ];
    const auraFreq = state.background.color.hue;

    const chordNotes = 5;
    const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    const scale = Scale.notes(`${baseFreq}3 ${material}`).slice(0, chordNotes);
    const scale2 = Scale.notes(
      `${transpose(`${baseFreq}3`, "12M")} ${material}`
    ).slice(0, chordNotes);
    const scale3 = Scale.notes(
      `${transpose(`${baseFreq}3`, "5M")} ${material}`
    ).slice(0, chordNotes);
    let _chords = [scale, scale2, scale3];

    _chords.sort(() => 0.5 - Math.random());

    setChords(_chords);
  }, [state]);

  useEffect(() => {
    Tone.Transport.bpm.value = 80;

    filter = new Tone.Filter(200, "bandpass", -12);

    lfo = new Tone.LFO(0.5, 140, 240);
    lfo.connect(filter.frequency);

    reverb = new Tone.Reverb({
      decay: 8,
      wet: 0.8,
    });

    effect = new Tone.FeedbackDelay(0.18, 0.4);
    effect.wet.value = 0.1;

    synth = new Tone.PolySynth({
      volume: -75,
    });
    synth.set({
      oscillator: {
        type: haloStyle[state.halo.shape],
      },
      envelope: {
        attack: 30,
        sustain: 1,
        release: 50,
      },
    });

    synth.connect(reverb);
    reverb.connect(filter);
    filter.connect(effect);
    effect.connect(Tone.Destination);

    // Tone.Transport.cancel();
    // console.log("cancel");
    let i = 0;

    let scheduleRepeat;
    if (chords) {
      if (scheduleRepeat) {
        Tone.Transport.scheduleRepeat.clear(scheduleRepeat);
      }
      scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        let note = chords[i % chords.length];
        console.log(note, time, Tone.Transport);
        synth.triggerAttackRelease(note, "4m", time);
        i++;
      }, "4m");
    }

    // let prevNote;
    // let i = 0;
    // melody = new Tone.Loop((time) => {
    //   let note = chords[i % chords.length];
    //   if (prevNote != note) {
    //     synth.triggerAttackRelease(note, "4m", time);
    //   }
    //   i++;
    //   prevNote = note;
    // }, "4m");

    // melody.start(0);
    // lfo.start(0);

    synth.volume.rampTo(-19, 5);
  }, [chords]);

  useEffect(() => {
    Tone.Transport.start();
    setReady(true);
  }, []);

  return <></>;
};

export default Mids;
