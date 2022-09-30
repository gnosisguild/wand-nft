import { MintOptions } from "../../types";

export function transformRotations(options: MintOptions) {
  return {
    ...options,
    stone: toStoneId(options.stone),
    background: {
      ...options.background,
      color: {
        ...options.background.color,
        hue: toHue(options.background.color.hue),
        lightness: toLightness(options.background.color.lightness),
      },
    },
  };
}

function toHue(angle: number) {
  return Math.round(360 - angle) % 360;
}

const LIGHTNESS_BOUNDS = [20, 70];

// map an angle between (0deg: white, 180deg: black, 360deg: white) to a lightness between 20% and 70%
function toLightness(angle: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  return Math.round(left + ((right - left) * Math.abs(angle - 180)) / 180);
}

export function toStoneId(angle: number) {
  let normalizedAngle = angle % 360;
  if (normalizedAngle < 0) normalizedAngle += 360;
  const skew = (360 / 29) * 0.5;
  return Math.round((normalizedAngle + skew) * 10) % 3600;
}
