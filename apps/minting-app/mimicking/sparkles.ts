import { BigNumber, utils } from "ethers";
import { Sparkle } from "../types";

export function generateSparkles(tokenId: number): Sparkle[] {
  let result = [];
  const seed = BigNumber.from(
    utils.solidityKeccak256(["uint256"], [BigNumber.from(tokenId)])
  );
  const sparkleCount = 4 + seed.mod(4).toNumber();
  for (let i = 0; i < sparkleCount; i++) {
    result.push({
      tx: 1820 - pseudoRandom(seed.add(3 * i + 0), 1640),
      ty: 1880 - pseudoRandom(seed.add(3 * i + 1), 1640),
      scale: 30 + pseudoRandom(seed.add(3 * i + 2), 70),
    });
  }
  return result;
}

const pseudoRandom = (seed: BigNumber, modulus: number) =>
  BigNumber.from(utils.solidityKeccak256(["uint256"], [seed]))
    .mod(modulus)
    .toNumber();
