import { AppState } from "../../types";

export function fromAngleToColor(state: AppState) {
  return {
    ...state,
    background: {
      ...state.background,
      color: {
        ...state.background.color,
        lightness: toLightness(state.background.color.lightness),
        hue: toHue(state.background.color.hue),
      },
    },
  };
}

function toHue(angle: number) {
  return Math.round(360 - angle) % 360;
}

const LIGHTNESS_BOUNDS = [20, 70];

// map an angle between (0deg: white, 180deg: black, 360deg: white) to a lightness between 20% and 70%
export function toLightness(angle: number): number {
  const [left, right] = LIGHTNESS_BOUNDS;
  return Math.round(left + ((right - left) * Math.abs(angle - 180)) / 180);
}
