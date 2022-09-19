import { AppState, Background, MintStage } from "../types";
import {
  randomStone,
  randomHalo,
  randomBackground,
  randomLocation,
} from "../utils/randomizer";

export interface ChangeBackgroundAction {
  type: "changeBackground";
  value: Background;
}

export interface ChangeHaloAction {
  type: "changeHalo";
  value: AppState["halo"];
}

export interface ChangeStoneAction {
  type: "changeStone";
  value: number;
}

export interface ChangeMintStageAction {
  type: "changeMintStage";
  value: MintStage;
}

export interface RandomizeWandAction {
  type: "randomizeWand";
}

export interface ChangeHandleAction {
  type: "changeHandle";
  value: 0 | 1 | 2 | 3;
}

export type Action =
  | ChangeBackgroundAction
  | ChangeHaloAction
  | ChangeStoneAction
  | ChangeMintStageAction
  | ChangeHandleAction
  | RandomizeWandAction;

export const AppReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
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
    case "changeMintStage": {
      return {
        ...state,
        stage: action.value,
      };
    }
    case "changeHandle": {
      return {
        ...state,
        handle: action.value,
      };
    }
    case "randomizeWand": {
      const { latitude, longitude } = randomLocation();
      return {
        ...state,
        background: randomBackground(),
        halo: randomHalo(),
        stone: randomStone(),
        latitude,
        longitude,
      };
    }
  }
};

export function randomState(): AppState {
  const { latitude, longitude } = randomLocation();
  return {
    stage: MintStage.IDLE,
    background: randomBackground(),
    halo: randomHalo(),
    handle: 0,
    stone: randomStone(),
    tokenId: 0,
    latitude,
    longitude,
  };
}

export function zeroState(): AppState {
  return {
    stage: MintStage.IDLE,
    background: {
      radial: false,
      dark: false,
      color: {
        hue: 0,
        saturation: 0,
        lightness: 0,
      },
    },
    halo: {
      shape: 0,
      rhythm: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
    handle: 0,
    stone: 0,
    tokenId: 0,
    latitude: 0,
    longitude: 0,
  };
}
