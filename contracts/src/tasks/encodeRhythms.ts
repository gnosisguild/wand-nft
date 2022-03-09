import { task } from "hardhat/config";

const RHYTHMS = [
  [true], // every segment
  [true, false], // alternate
];

task(
  "encodeRhythms",
  "Encode the rhythms specified in RHYTHMS const into a bitmap"
).setAction(async () => {
  const bitmap = RHYTHMS.reduce((bitmap, rhythm, rhythmIndex) => {
    for (let i = 0; i < 24; i++) {
      if (rhythm[i % rhythm.length]) bitmap |= 1 << (rhythmIndex * 24 + i);
    }
    return bitmap;
  }, 0);
  console.log(`uint256 constant HALO_RHYTHMS = 0x${bitmap.toString(16)};`);
  console.log(`uint256 constant HALO_RHYTHM_LENGTH = ${RHYTHMS.length};`);
});
