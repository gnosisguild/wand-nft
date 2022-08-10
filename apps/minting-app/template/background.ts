import { Background } from "../types";

export function transformBackground(background: Background): Background {
  return {
    ...background,
    color: {
      ...background.color,
      lightness: toLightness(background.color.lightness),
    },
  };
}

const LIGHTNESS_BOUNDS = [20, 70];

function toLightness(value: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  const spectrum = right - left;

  const mirrored = value < 180 ? value : 360 - value;
  // inverted progress
  const progress = 1 - mirrored / 180;

  return Math.round(left + progress * spectrum);
}
