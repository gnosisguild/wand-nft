import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import { transpose } from "tonal";
import * as Tone from "tone";

interface DroneProps {
  play: boolean;
}

const Drone: React.FC<DroneProps> = ({ play }) => {
  const { state, dispatch } = useAppContext();
  const [ready, setReady] = useState(false);

  let filter;
  let effect;
  let reverb;
  let loop;
  let synth;

  const auraFreq = state.background.color.hue;

  let baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
  const notes = [`${baseFreq}0`];
  for (let i = 1; i < 4; i++) {
    const increment = i < 2 ? 4 : 3;
    notes.push(transpose(notes[0], `${i * increment}M`));
  }

  useEffect(() => {
    // Setup a reverb with ToneJS
    reverb = new Tone.Reverb({
      decay: 10,
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

    synth.volume.rampTo(-8, 10);

    synth.connect(effect);
    effect.connect(reverb);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    loop = new Tone.Loop(() => {
      // triggered every eighth note.
      synth.triggerAttackRelease(notes[0], "1m", "+1m");
    }, "1m").start(0);

    setReady(true);
  }, [play]);

  useEffect(() => {
    if (!ready) return;
    if (play) {
      console.log("starting drone");
      Tone.Transport.start();
    } else {
      console.log("stopping drone");
      Tone.Transport.cancel();
      Tone.Transport.stop();
    }
  });

  return <></>;
};

export default Drone;
