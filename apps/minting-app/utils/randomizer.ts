import { Background, Halo, Location } from "../types";
import { LOCATIONS } from "../birthchart";

export function randomStone(currentStone = 0): number {
  return randomAngle(currentStone);
}

export function randomHalo(): Halo {
  return {
    shape: randomInteger(5) as 0 | 1 | 2 | 3 | 4 | 5,
    rhythm: new Array(13).fill(null).map(() => randomInteger(1) === 1),
  };
}

export function randomBackground(currentBackground?: Background): Background {
  return {
    dark: randomInteger(1) == 1,
    radial: randomInteger(1) == 1,
    color: {
      saturation: 33,
      hue: randomAngle(currentBackground?.color.hue),
      lightness: randomAngle(currentBackground?.color.lightness),
    },
  };
}

export function randomLocation(): Location {
  return LOCATIONS[randomInteger(LOCATIONS.length - 1)];
}

function randomAngle(currentAngle = 0) {
  return currentAngle + (randomInteger(3599) - 1800) / 10;
}

function randomInteger(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}
