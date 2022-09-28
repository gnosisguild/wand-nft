import React from "react";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../state";
import { Scale, transpose } from "tonal";
import { haloStyle } from "./HaloShapeMappings";
import { mapValue } from "../../utils/mapValue";
import Birds from "../../public/background-tracks/birds.mp3";
import Window from "../../public/background-tracks/window.mp3";
import Forest from "../../public/background-tracks/forest.mp3";
import Crickets from "../../public/background-tracks/crickets.mp3";
import * as Tone from "tone";

const Music: React.FC = () => {
  const { state } = useAppContext();
  const [chords, setChords] = useState();
  const [mids, setMids] = useState();
  const [midSchedule, setMidSchedule] = useState(0);
  const [droneNote, setDroneNote] = useState();
  const [drone, setDrone] = useState();
  const [droneSchedule, setDroneSchedule] = useState(0);
  const [sequence, setSequence] = useState();
  const [sequencer, setSequencer] = useState();
  const [sequencerSchedule, setSequencerSchedule] = useState(0);
  const [backgroundTrack, setBackgroundTrack] = useState();
  const [ready, setReady] = useState(false);

  const player = useRef();

  let filter;
  let lfo;
  let reverb;
  let effect;
  let synth;
  let droneSynth;
  let bpm;

  const setupMids = () => {
    // const material = "major";
    // const scales = Scale.names();
    const scales = ["major", "minor", "ionic", "phrygian", "dorian"];
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
    let _chords = [scale1, scale2, scale3, scale4];

    console.log(_chords);
    setChords(_chords);

    filter = new Tone.Filter(500, "bandpass", -12);

    lfo = new Tone.LFO(0.01, 140, 240);
    lfo.connect(filter.frequency);

    reverb = new Tone.Reverb({
      decay: 14,
      wet: 0.75,
    });

    effect = new Tone.FeedbackDelay(0.1, 0.4);
    effect.wet.value = 0.1;

    synth = new Tone.PolySynth({
      volume: -75,
    });
    synth.set({
      oscillator: {
        type: haloStyle[state.halo.shape],
      },
      envelope: {
        attack: 4,
        decay: 0.1,
        sustain: 0.8,
        release: 4,
      },
    });

    synth.connect(reverb);
    reverb.connect(filter);
    filter.connect(effect);
    effect.connect(Tone.Destination);
    synth.volume.rampTo(-40, 5);

    setMids(synth);
  };

  const setupDrone = () => {
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

    droneSynth.volume.rampTo(-10, 4);

    droneSynth.connect(effect);
    effect.connect(reverb);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    setDrone(droneSynth);
  };

  const setupSequencer = () => {
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
    bpm = mapValue(lightness, 0, 360, 10, 80);
    Tone.Transport.bpm.value = bpm;

    reverb = new Tone.Reverb({
      decay: 2,
      wet: 0.8,
      preDelay: 1,
    });

    effect = new Tone.FeedbackDelay(0.17, 0.7);
    effect.wet.value = 0.1;

    filter = new Tone.Filter(8000, "bandpass", -48);

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
      volume: -70,
    });

    sequencerSynth.connect(reverb);
    // filter.connect(effect);
    reverb.connect(filter);
    filter.connect(Tone.Destination);

    sequencerSynth.volume.rampTo(-35, 8);

    setSequencer(sequencerSynth);
  };

  const setupBackgroundTrack = () => {
    const backgroundTracks = [
      {
        name: "dawn",
        volume: -33,
        audio: Birds,
        filterRange: [100, 10000],
        filterType: "highpass",
      },
      {
        name: "day",
        volume: -6,
        audio: Window,
        filterRange: [300, 10000],
        filterType: "highpass",
      },
      {
        name: "dusk",
        volume: -16,
        audio: Forest,
        filterRange: [500, 10000],
        filterType: "highpass",
      },
      {
        name: "night",
        volume: -18,
        audio: Crickets,
        filterRange: [1000, 10000],
        filterType: "highpass",
      },
    ];

    const activeTrack = backgroundTracks[state.handle];

    new Tone.ToneAudioBuffer(activeTrack.audio);

    setBackgroundTrack(activeTrack);
  };

  const triggerMids = () => {
    let i = 0;
    if (chords) {
      console.log("mid", midSchedule);
      Tone.Transport.clear(midSchedule);
      const scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        let note = chords[i % chords.length];
        mids.triggerAttackRelease(note, "4m", time);
        i++;
      }, "4m");
      setMidSchedule(scheduleRepeat);
    }
  };

  const triggerDrone = () => {
    if (drone) {
      console.log("drone", droneSchedule);
      Tone.Transport.clear(droneSchedule);
      const scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        drone.triggerAttackRelease(droneNote, "1m", "+1m" + time);
      }, "1m");
      setDroneSchedule(scheduleRepeat);
    }
  };

  const triggerSequencer = () => {
    if (sequencer && sequence) {
      console.log("sequencer", sequencerSchedule);
      Tone.Transport.clear(sequencerSchedule);
      let index = 0;
      const interval = [0, 3, 4].includes(state.halo.shape) ? "72n" : "96n";
      const scheduleRepeat = Tone.Transport.scheduleRepeat((time) => {
        let sequencerNote = sequence[index % sequence.length];
        if (sequencerNote) {
          sequencer.triggerAttackRelease(sequencerNote, interval, time);
        }
        index++;
      }, interval);
      setSequencerSchedule(scheduleRepeat);
    }
  };

  const triggerBackgroundTrack = () => {
    if (!backgroundTrack) return;
    const filter = new Tone.Filter();
    if (backgroundTrack.filterRange) {
      filter.type = backgroundTrack.filterType || "lowpass";
      const lfo = new Tone.LFO(
        0.3,
        backgroundTrack.filterRange[0],
        backgroundTrack.filterRange[1]
      );
      lfo.connect(filter.frequency);
    }

    const reverb = new Tone.Reverb({
      decay: 4,
      wet: 0.7,
    });

    player.current = new Tone.Player(backgroundTrack.audio, () => {
      player.loop = true;
      player.current.volume.value = -80;
      player.current.autostart = true;
      player.current.fadeIn = 1;
      player.current.fadeOut = 1;
      player.current.loop = true;
      player.current.volume.rampTo(backgroundTrack.volume, 3);
    });

    player.current.connect(filter);
    filter.connect(reverb);
    reverb.connect(Tone.Destination);

    console.log(`starting background track: ${backgroundTrack.name}`);
  };

  useEffect(() => {
    if (ready) {
      setupMids();
    }
  }, [ready, state.stone, state.background.color.hue]);

  useEffect(() => {
    if (ready) {
      setupDrone();
    }
  }, [ready, state.background.color.hue]);

  useEffect(() => {
    if (ready) {
      setupSequencer();
    }
  }, [ready, state.stone, state.background.color.hue, state.halo]);

  useEffect(() => {
    if (ready) {
      setupBackgroundTrack();
    }
  }, [ready, state.handle]);

  // // debounce every 1M
  // const debounceTime = Tone.Time("1m").toSeconds();
  // console.log(debounceTime);

  useEffect(() => {
    if (ready) {
      triggerMids();
    }
  }, [ready, mids]);

  useEffect(() => {
    if (ready) {
      triggerDrone();
    }
  }, [ready, drone]);

  useEffect(() => {
    if (ready) {
      triggerSequencer();
    }
  }, [ready, sequencer]);

  useEffect(() => {
    if (ready) {
      triggerBackgroundTrack();
    }
  }, [ready, backgroundTrack]);

  useEffect(() => {
    const handleMouseDown = () => {
      if (!ready) {
        Tone.Transport.start();
        setReady(true);
        window.removeEventListener("mousedown", handleMouseDown);
      }
    };
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
  }, []);

  return <></>;
};

export default React.memo(Music);
