import { BigNumber, utils } from "ethers";
import { Sparkle } from "../types";

export const generateSparkles = (seed: number): Sparkle[] => {
  let result = [];
  const sparkleCount = 4 + pseudoRandom(seed, 4);
  for (let i = 0; i < sparkleCount; i++) {
    result.push({
      tx: 1820 - pseudoRandom(seed + 10 * i + 0, 1640),
      ty: 1880 - pseudoRandom(seed + 10 * i + 1, 1640),
      scale: 30 + pseudoRandom(seed + 10 * i + 2, 70),
    });
  }
  return result;
};

const pseudoRandom = (seed: number, modulus: number) =>
  BigNumber.from(utils.keccak256(`0x${seed.toString(16)}`))
    .mod(modulus)
    .toNumber();
