import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import { transpose } from "tonal";
import * as Tone from "tone";

const Drone: React.FC = () => {
  const { state } = useAppContext();
  const [notes, setNotes] = useState([]);

  let filter;
  let effect;
  let reverb;
  let loop;
  let synth: any;
  let baseFreq;

  useEffect(() => {
    const auraFreq = state.background.color.hue;

    baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    setNotes([`${baseFreq}0`]);
    // for (let i = 1; i < 3; i++) {
    //   const increment = i < 2 ? 4 : 3;
    //   _notes.push(transpose(_notes[0], `${i * increment}M`));
    // }
    // setNotes(_notes);
  }, [state]);

  useEffect(() => {
    // Setup a reverb with ToneJS
    reverb = new Tone.Reverb({
      decay: 20,
      wet: 0.8,
      preDelay: 0.2,
    });

    // Create an effect node that creates a feedback delay
    effect = new Tone.FeedbackDelay(0.2, 0.35);
    effect.wet.value = 0.5;

    // Create a new filter for the X slider
    filter = new Tone.Filter(100, "lowpass");

    // Setup a synth with ToneJS
    synth = new Tone.Synth({
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
        attackCurve: "exponential",
      },
      volume: -Infinity,
    });

    synth.volume.rampTo(-8, 4);

    synth.connect(effect);
    effect.connect(reverb);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    let scheduleRepeat;
    if (scheduleRepeat) {
      Tone.Transport.clear(scheduleRepeat);
    }
    scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
      console.log(notes[0], time, Tone.Transport);
      synth.triggerAttackRelease(notes[0], "1m", "+1m" + time);
    }, "1m");
  }, [notes]);

  useEffect(() => {
    Tone.Transport.start();
  }, []);

  return <></>;
};

export default Drone;
