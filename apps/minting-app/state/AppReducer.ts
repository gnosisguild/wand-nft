import { AppState, Background } from "../types";
import { randomizeStone } from "../components/StonePicker";
import { randomizeBackground } from "../components/ColorPicker";
import { randomizeHalo } from "../components/HaloPicker";
import locations from "./locations";
import { Location } from "../types";

function randomLocation(): Location {
  return locations[Math.floor(Math.random() * locations.length)];
}

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

export type Action =
  | ChangeBackgroundAction
  | ChangeHaloAction
  | ChangeStoneAction
  | ChangeMintingStateAction
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
    case "changeMintingState": {
      return {
        ...state,
        minting: action.value,
      };
    }
    case "randomizeWand": {
      const randLocation = randomLocation();
      return {
        ...state,
        background: randomizeBackground(),
        halo: randomizeHalo(),
        stone: randomizeStone(),
        latitude: randLocation.latitude,
        longitude: randLocation.longitude,
      };
    }
  }
};

export function randomState(): AppState {
  const randLocation = randomLocation();
  return {
    minting: false,
    background: randomizeBackground(),
    halo: randomizeHalo(),
    handle: 0,
    stone: randomizeStone(),
    tokenId: 0,
    latitude: randLocation.latitude,
    longitude: randLocation.longitude,
  };
}

export function zeroState(): AppState {
  return {
    minting: false,
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
