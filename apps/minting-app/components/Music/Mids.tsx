import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import { Scale, transpose } from "tonal";
import { haloStyle } from "./HaloShapeMappings";
import * as Tone from "tone";

interface MidsProps {
  play: boolean;
}

const Mids: React.FC<MidsProps> = ({ play }) => {
  const { state, dispatch } = useAppContext();
  const [ready, setReady] = useState(false);

  let filter;
  let lfo;
  let melody;
  let reverb;
  let effect;
  let synth;

  const material = "major";
  // Scale.names()[
  //   Math.floor(mapValue(state.stone, 0, 360, 0, Scale.names().length))
  // ];
  const auraFreq = state.background.color.hue;

  const generateChords = () => {
    const chordNotes = 5;
    const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    const scale = Scale.notes(`${baseFreq}3 ${material}`).slice(0, chordNotes);
    const scale2 = Scale.notes(
      `${transpose(`${baseFreq}3`, "12M")} ${material}`
    ).slice(0, chordNotes);
    const scale3 = Scale.notes(
      `${transpose(`${baseFreq}3`, "5M")} ${material}`
    ).slice(0, chordNotes);
    const chords = [scale, scale2, scale3];

    return chords;
  };

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

    let prevNote;
    let i = 0;
    melody = new Tone.Loop((time) => {
      let note = generateChords()[i % generateChords().length];
      if (prevNote != note) {
        synth.triggerAttackRelease(note, "4m", time);
      }
      i++;
      prevNote = note;
    }, "4m");

    lfo.start(0);
    melody.start(0);

    synth.volume.rampTo(-19, 5);

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

export default Mids;
