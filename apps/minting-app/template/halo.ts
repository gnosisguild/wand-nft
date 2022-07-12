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
  rhythm: rhythm,
});

export const encodeHalo = (shapeId: number, rhythm: boolean[]) =>
  shapeId.toString(2).padStart(3, "0") +
  rhythm.map((x) => (x ? "1" : "0")).join("");
