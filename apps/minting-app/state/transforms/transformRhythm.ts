import assert from "assert";
import { MintOptions } from "../../types";

export function transformRhythm(options: MintOptions) {
  assert(options.halo.rhythm.length === 13);

  const isNarrow = [1, 5].includes(options.halo.shape);

  //cleanup odd indices for wide rhythms
  return {
    ...options,
    halo: {
      ...options.halo,
      rhythm: [
        ...options.halo.rhythm,
        ...options.halo.rhythm.slice(1, -1).reverse(),
      ].map((x, index) => x && (isNarrow || index % 2 === 0)),
    },
  };
}
