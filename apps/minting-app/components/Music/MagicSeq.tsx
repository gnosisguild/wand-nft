import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../state";
import Tonal, { Scale, transpose } from "tonal";
import * as Tone from "tone";

interface MidsProps {
  play: boolean;
}

const Mids: React.FC<MidsProps> = ({ play }) => {
  const { state, dispatch } = useAppContext();
  const [ready, setReady] = useState(false);

  let filter;
  let effect;
  let reverb;
  let synth;
  let scale = [];
  let melody;

  const mapValue = (n, start1, stop1, start2, stop2) => {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  const material =
    Scale.names()[
      Math.floor(mapValue(state.stone, 0, 360, 0, Scale.names().length))
    ];

  const auraFreq = state.background.color.hue;
  const haloRhythm = state.halo.rhythm;
  const lightness = state.background.color.lightness;

  const generateScale = () => {
    let baseOctave = Math.round(mapValue(lightness, 0, 360, 4, 5));
    let octaves = 6;
    let baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);

    let rhythm = [];
    let scale = Scale.notes(`${baseFreq}${baseOctave} ` + material);
    for (let i = baseOctave + 1; i < baseOctave + octaves; i++) {
      scale = scale.concat(Scale.notes(`${baseFreq}${i} ` + material));
    }

    for (let i = 0; i < scale.length; i++) {
      // rhythm.push(scale[i]);
      if (haloRhythm[i % haloRhythm.length]) {
        rhythm.push(scale[i]);
      } else {
        rhythm.push(0);
      }
    }

    if (state.background.dark) {
      // inverse order - downwards progression
      rhythm.reverse();
    }

    // if (state.background.radial) {
    //   // shuffle order
    //   rhythm = rhythm.sort(() => 0.5 - Math.random());
    // }

    return rhythm;
  };

  useEffect(() => {
    Tone.Transport.swing = 0.3;

    reverb = new Tone.Reverb({
      decay: 8,
      wet: 0.8,
      preDelay: 1,
    });

    effect = new Tone.FeedbackDelay(0.17, 0.7);
    effect.wet.value = 0.1;

    filter = new Tone.Filter(6000, "highpass", -48);

    synth = new Tone.Synth({
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0.8,
        release: 4,
      },
      volume: -45,
    });

    synth.connect(reverb);
    // filter.connect(effect);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    synth.volume.rampTo(-29, 8);

    Tone.Transport.bpm.value = 60;

    let prevNote;
    let index = 0;
    melody = new Tone.Loop((time) => {
      synth.portamento = Math.random() * 0.01;
      let note = generateScale()[index % generateScale().length];
      if (prevNote != note) {
        // (freq, noteDuration, time)
        synth.triggerAttackRelease(note, "64n", time);
      }
      if (index === 200) {
        Tone.Transport.bpm.rampTo(60, 10);
      }
      if (index === 500) {
        Tone.Transport.bpm.rampTo(120, 10);
      }
      if (index === 300) {
        Tone.Transport.bpm.rampTo(60, 10);
      }
      index++;
      prevNote = note;
    });

    // if the halo shape is wide, set a lower frequency interval
    melody.interval = [0, 3, 4].includes(state.halo.shape) ? "32n" : "48n";

    Tone.Transport.bpm.rampTo(120, 10);
    melody.start(0);

    setReady(true);
  }, [play]);

  useEffect(() => {
    if (!ready) return;
    if (play) {
      console.log("starting magic");
      Tone.Transport.start();
    } else {
      console.log("stopping magic");
      Tone.Transport.cancel();
      Tone.Transport.stop();
    }
  });

  return <></>;
};

export default Mids;
