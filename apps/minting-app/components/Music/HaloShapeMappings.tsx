// something is broken in how tone.js types its synth types, so
// passing in OmniOscillatorType (which contains all valid types)
// doesn't work. Explicitly limiting the strings in the array does
// work though.

type SynthTypes =
  | "fatsquare16"
  | "square16"
  | "triangle16"
  | "fattriangle16"
  | "fatsawtooth16"
  | "sawtooth16";

export const haloStyle: SynthTypes[] = [
  "fatsquare16", // 0
  "square16", // 1
  "triangle16", // 2
  "fattriangle16", // 3
  "fatsawtooth16", // 4
  "sawtooth16", // 5
];
