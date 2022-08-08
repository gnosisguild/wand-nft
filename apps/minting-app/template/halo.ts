type ShapeId = 0 | 1 | 2 | 3 | 4 | 5;

export const generateHalo = (
  shape: ShapeId,
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
  rhythm: mirrorRhythm(rhythm, isWideShape(shape)),
});

const mirrorRhythm = (rhythm: boolean[], isWide: boolean) => {
  if (rhythm.length !== 13) throw new Error("Rhythm must have length 13");
  const cleanRhythm = isWide
    ? rhythm.map((x, index) => x && index % 2 === 0)
    : rhythm;
  return [...cleanRhythm, ...cleanRhythm.slice(1, -1).reverse()];
};

export const isWideShape = (shape: ShapeId) => ![1, 5].includes(shape);
