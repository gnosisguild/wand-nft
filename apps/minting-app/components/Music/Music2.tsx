import { useEffect, useState } from "react";
import { useAppContext } from "../../state";
import { Scale, transpose } from "tonal";
import { haloStyle } from "./HaloShapeMappings";
import { mapValue } from "../../utils/mapValue";
import * as Tone from "tone";

const Mids: React.FC = () => {
  const { state } = useAppContext();
  const [chords, setChords] = useState();
  const [mids, setMids] = useState();
  const [droneNote, setDroneNote] = useState();
  const [drone, setDrone] = useState();
  const [sequence, setSequence] = useState();
  const [sequencer, setSequencer] = useState();

  let filter;
  let lfo;
  let reverb;
  let effect;
  let synth;
  let droneSynth;
  let bpm;

  // setup mids
  useEffect(() => {
    // set up chords
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
    synth.volume.rampTo(-19, 5);

    setMids(synth);
  }, [state]);

  useEffect(() => {
    const auraFreq = state.background.color.hue;

    const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    setDroneNote(`${baseFreq}0`);

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
    droneSynth = new Tone.Synth({
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

    droneSynth.volume.rampTo(-8, 4);

    droneSynth.connect(effect);
    effect.connect(reverb);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    setDrone(droneSynth);
  }, [state]);

  useEffect(() => {
    const material =
      Scale.names()[
        Math.floor(mapValue(state.stone, 0, 360, 0, Scale.names().length))
      ];

    const auraFreq = state.background.color.hue;
    const haloRhythm = state.halo.rhythm;
    const lightness = state.background.color.lightness;

    let baseOctave = 5;
    let octaves = 4;
    let baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);

    let _sequence = [];
    let scale = Scale.notes(`${baseFreq}${baseOctave} ` + material);
    for (let i = baseOctave + 1; i < baseOctave + octaves; i++) {
      scale = scale.concat(Scale.notes(`${baseFreq}${i} ` + material));
    }

    for (let i = 0; i < scale.length; i++) {
      // _sequence.push(scale[i]);
      if (haloRhythm[i % haloRhythm.length]) {
        _sequence.push(scale[i]);
      } else {
        _sequence.push(0);
      }
    }

    if (state.background.dark) {
      // inverse order - downwards progression
      _sequence.reverse();
    }

    // if (state.background.radial) {
    //   // shuffle order
    //   rhythm = rhythm.sort(() => 0.5 - Math.random());
    // }

    setSequence(_sequence);

    Tone.Transport.swing = 0.3;
    bpm = mapValue(lightness, 0, 360, 10, 200);
    Tone.Transport.bpm.value = bpm;

    reverb = new Tone.Reverb({
      decay: 8,
      wet: 0.8,
      preDelay: 1,
    });

    effect = new Tone.FeedbackDelay(0.17, 0.7);
    effect.wet.value = 0.1;

    filter = new Tone.Filter(6000, "highpass", -48);

    const sequencerSynth = new Tone.Synth({
      oscillator: {
        type: haloStyle[state.halo.shape],
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0.8,
        release: 4,
      },
      volume: -50,
    });

    sequencerSynth.connect(reverb);
    // filter.connect(effect);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    sequencerSynth.volume.rampTo(-35, 8);

    setSequencer(sequencerSynth);
  }, [state]);

  useEffect(() => {
    let i = 0;

    let scheduleRepeat = 0;
    if (chords) {
      // Tone.Transport.cancel();
      Tone.Transport.cancel();
      Tone.Transport.start();
      scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        let note = chords[i % chords.length];
        mids.triggerAttackRelease(note, "4m", time);
        i++;
      }, "4m");
    }
  }, [mids]);

  useEffect(() => {
    let scheduleRepeat;
    if (scheduleRepeat) {
      Tone.Transport.cancel();
      Tone.Transport.start();
    }
    if (drone) {
      scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        drone.triggerAttackRelease(droneNote, "1m", "+1m" + time);
      }, "1m");
    }
  }, [drone]);

  useEffect(() => {
    let scheduleRepeat;
    if (scheduleRepeat) {
      Tone.Transport.cancel();
      Tone.Transport.start();
    }
    if (sequencer && sequence) {
      let index = 0;
      const interval = [0, 3, 4].includes(state.halo.shape) ? "48n" : "64n";
      scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        let sequencerNote = sequence[index % sequence.length];
        if (sequencerNote) {
          sequencer.triggerAttackRelease(sequencerNote, interval, time);
        }
        // if (index === 200) {
        //   Tone.Transport.bpm.rampTo(bpm, 10);
        // }
        // if (index === 300) {
        //   Tone.Transport.bpm.rampTo(bpm * 2, 10);
        // }
        // if (index === 500) {
        //   Tone.Transport.bpm.rampTo(bpm * 1.2, 40);
        // }
        index++;
      }, interval);
    }

    // melody.start(0);
  }, [sequencer]);

  useEffect(() => {
    Tone.Transport.start();
  }, []);

  return <></>;
};

export default Mids;
