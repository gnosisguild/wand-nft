import memo from "memoize-one";
import {
  calculateAspects,
  calculatePlanets,
  scaleAspects,
  scalePlanets,
} from "../../birthchart";
import { filterLayers, interpolateStone } from "../../mimicking";

import { MintOptions, TemplateInput } from "../../types";
import { transformRhythm } from "./transformRhythm";
import { transformRotations } from "./transformRotations";

export function transformForRendering(
  options: MintOptions,
  seed: number,
  date?: Date
): TemplateInput {
  options = transformRotations(options);
  options = transformRhythm(options);

  const { planets, aspects } = calculateAstrology(
    options.latitude,
    options.longitude,
    date
  );

  return {
    planets,
    aspects,
    handle: {
      [`handle${options.handle}`]: true,
    },
    halo: {
      halo0: options.halo.shape == 0,
      halo1: options.halo.shape == 1,
      halo2: options.halo.shape == 2,
      halo3: options.halo.shape == 3,
      halo4: options.halo.shape == 4,
      halo5: options.halo.shape == 5,
      hue: (options.background.color.hue + 180) % 360,
      rhythm: options.halo.rhythm,
    },
    frame: {
      level1: true,
      title: "",
    },
    background: options.background,
    filterLayers,
    sparkles: [],
    seed,
    stone: interpolateStone(options.stone),
    xp: {
      amount: 0,
      cap: 10000,
      crown: false,
    },
  };
}

const calculateAstrology = memo(
  (latitude: number, longitude: number, date?: Date) => {
    date = date || new Date();
    const planets = scalePlanets(
      calculatePlanets(latitude, longitude, 0, date)
    );
    const aspects = scaleAspects(
      calculateAspects(latitude, longitude, 0, date)
    );

    return { planets, aspects };
  }
);
