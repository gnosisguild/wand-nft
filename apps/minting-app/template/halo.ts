export const generateHalo = (
  shape: number,
  rhythm: boolean[],
  backgroundHue: number
) => ({
  halo0: shape == 0,
  halo1: shape == 1,
  halo2: shape == 2,
  halo3: shape == 3,
  halo4: shape == 4,
  halo5: shape == 5,
  hue: (backgroundHue + 180) % 360,
  rhythm: mirrorRhythm(rhythm),
});

const mirrorRhythm = (rhythm: boolean[]) => {
  if (rhythm.length !== 13) throw new Error("Rhythm must have length 13");
  return [...rhythm, ...rhythm.slice(1, -1).reverse()];
};

export const encodeHalo = (shapeId: number, rhythm: boolean[]) => {
  if (rhythm.length !== 13) throw new Error("Rhythm must have length 13");
  return parseInt(
    rhythm
      .map((x) => (x ? "1" : "0"))
      .reverse()
      .join("") + shapeId.toString(2).padStart(3, "0"),
    2
  );
};
