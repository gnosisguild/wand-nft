import memo from "memoize-one";
import {
  calculateAspects,
  calculatePlanets,
  scaleAspects,
  scalePlanets,
} from "../../birthchart";
import { filterLayers, interpolateStone } from "../../mimicking";

import { AppState, TemplateInput } from "../../types";
import { transformColor } from "./transformColor";

export function transformForRendering(
  state: AppState,
  seed: number
): TemplateInput {
  state = transformColor(state);

  const { planets, aspects } = transformAstrology(
    state.latitude,
    state.longitude
  );

  return {
    planets,
    aspects,
    halo: transformHalo(state),
    frame: {
      level1: true,
      title: "",
    },
    background: state.background,
    filterLayers,
    sparkles: [],
    seed,
    stone: interpolateStone(state.stone),
    xp: {
      amount: 0,
      cap: 10000,
      crown: false,
    },
    handle: transformHandle(state.handle),
  };
}

function transformHalo(state: AppState) {
  return {
    halo0: state.halo.shape == 0,
    halo1: state.halo.shape == 1,
    halo2: state.halo.shape == 2,
    halo3: state.halo.shape == 3,
    halo4: state.halo.shape == 4,
    halo5: state.halo.shape == 5,
    hue: (state.background.color.hue + 180) % 360,
    rhythm: mirrorRhythm(state.halo.rhythm, isWideShape(state.halo.shape)),
  };
}

const transformAstrology = memo((latitude: number, longitude: number) => {
  const planets = scalePlanets(
    calculatePlanets(latitude, longitude, 0, new Date())
  );
  const aspects = scaleAspects(
    calculateAspects(latitude, longitude, 0, new Date())
  );

  return { planets, aspects };
});

function transformHandle(handle: 0 | 1 | 2 | 3 | 4 | 5) {
  return {
    [`handle${handle}`]: true,
  };
}

const mirrorRhythm = (rhythm: boolean[], isWide: boolean) => {
  if (rhythm.length !== 13) throw new Error("Rhythm must have length 13");
  const cleanRhythm = isWide
    ? rhythm.map((x, index) => x && index % 2 === 0)
    : rhythm;
  return [...cleanRhythm, ...cleanRhythm.slice(1, -1).reverse()];
};

const isWideShape = (shape: number) => ![1, 5].includes(shape);
