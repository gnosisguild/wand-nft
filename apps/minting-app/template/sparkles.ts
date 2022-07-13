import { BigNumber, utils } from "ethers";
import { Sparkle } from "../types";

export const generateSparkles = (tokenId: number): Sparkle[] => {
  let result = [];
  const seed = BigNumber.from(
    utils.keccak256(BigNumber.from(tokenId).toHexString())
  );
  const sparkleCount = 4 + seed.mod(4).toNumber();
  for (let i = 0; i < sparkleCount; i++) {
    result.push({
      tx: 1820 - pseudoRandom(seed.add(10 * i + 0), 1640),
      ty: 1880 - pseudoRandom(seed.add(0 * i + 1), 1640),
      scale: 30 + pseudoRandom(seed.add(10 * i + 2), 70),
    });
  }
  return result;
};

const pseudoRandom = (seed: BigNumber, modulus: number) =>
  BigNumber.from(utils.keccak256(seed.toHexString())).mod(modulus).toNumber();
