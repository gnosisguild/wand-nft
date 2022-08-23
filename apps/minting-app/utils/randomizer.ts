import { Background, Halo } from "../types";
import randomInteger from "./randomInteger";

export function randomStone(): number {
  return randomAngle();
}

export function randomHalo(): Halo {
  return {
    shape: randomInteger(5) as 0 | 1 | 2 | 3 | 4 | 5,
    rhythm: new Array(13).fill(null).map(() => randomInteger(1) === 1),
  };
}

export function randomBackground(): Background {
  return {
    dark: randomInteger(1) == 1,
    radial: randomInteger(1) == 1,
    color: {
      saturation: 33,
      hue: randomAngle(),
      lightness: randomAngle(),
    },
  };
}

function randomAngle() {
  return randomInteger(3599) / 10;
}
