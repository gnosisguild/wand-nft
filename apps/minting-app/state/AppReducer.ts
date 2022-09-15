import { AppState, Background, ModalState } from "../types";
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

export interface ChangeMintingStateAction {
  type: "changeMintingState";
  value: boolean;
}

export interface RandomizeWandAction {
  type: "randomizeWand";
}

export interface ChangeHandleAction {
  type: "changeHandle";
  value: 0 | 1 | 2 | 3;
}

export interface ChangeModalAction {
  type: "changeModal";
  value: ModalState;
}

export type Action =
  | ChangeBackgroundAction
  | ChangeHaloAction
  | ChangeStoneAction
  | ChangeMintingStateAction
  | ChangeHandleAction
  | RandomizeWandAction
  | ChangeModalAction;

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
    case "changeMintingState": {
      return {
        ...state,
        minting: action.value,
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
    case "changeModal": {
      return {
        ...state,
        modal: action.value,
      }
    }
  }
};

export function randomState(): AppState {
  const { latitude, longitude } = randomLocation();
  return {
    minting: false,
    modal: {
      show: false,
    },
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
    minting: false,
    modal: {
      show: false,
    },
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
