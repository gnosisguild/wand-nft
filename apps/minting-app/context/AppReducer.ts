import { Settings, Background, Stone, Halo } from "../types";
import { filterLayers } from "../template";
import { sparklePresets } from "./presets/sparklePresets";
import {
  secondInDay,
  seasonsAmplitude,
  secondInYear,
} from "./presets/timePresets";
import stoneList from "./presets/stoneList";
import {
  calculateAspects,
  calculatePlanetPositions,
} from "../template/birthchart";

export const initialState: Settings = {
  frame: {
    title: "Crossed Spring Crux",
    level1: true,
  },
  filterLayers,
  background: {
    hue: 0,
    radial: true,
    dark: true,
    color: {
      hue: 281,
      saturation: 33,
      lightness: 41,
    },
  },
  halo: {
    halo2: true,
    rhythm: [
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    ],
    hue: 0,
  },
  handle: {
    handle0: true,
  },
  planets: calculatePlanetPositions(0, 0),
  aspects: calculateAspects(0, 0),
  sparkle: {
    sparkles: sparklePresets,
  },
  stone: { ...stoneList[5], seasonsAmplitude, secondInDay, secondInYear },
  stars: {
    starsSeed: 123,
  },
  xp: {
    cap: 10000,
    amount: 3221,
    crown: false,
  },
};

export interface ChangeSettingsAction {
  type: "changeSettings";
  value: Settings;
}

export interface ChangeBackgroundAction {
  type: "changeBackground";
  value: Background;
}

export interface ChangeHaloAction {
  type: "changeHalo";
  value: Halo;
}

export interface ChangeStoneAction {
  type: "changeStone";
  value: Stone;
}

export type ActionTypes =
  | ChangeSettingsAction
  | ChangeBackgroundAction
  | ChangeHaloAction
  | ChangeStoneAction;

export const AppReducer = (state: Settings, action: ActionTypes) => {
  switch (action.type) {
    case "changeSettings": {
      return {
        ...action.value,
      };
    }
    case "changeBackground": {
      return {
        ...state,
        background: action.value,
      };
    }
    case "changeHalo": {
      return {
        ...state,
        halo: action.value,
      };
    }
    case "changeStone": {
      return {
        ...state,
        stone: action.value,
      };
    }
  }
};
