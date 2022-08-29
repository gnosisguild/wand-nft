import { Background, Halo, Location } from "../types";
import { LOCATIONS } from "../birthchart";

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

export function randomLocation(): Location {
  return LOCATIONS[randomInteger(LOCATIONS.length - 1)];
}

function randomAngle() {
  return randomInteger(3599) / 10;
}

function randomInteger(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}
