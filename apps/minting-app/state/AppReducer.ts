import { AppState, Background, Stone, Halo } from "../types";
import { randomizeStone } from "../components/StonePicker";
import randomInteger from "../components/randomInteger";
import { randomizeBackground } from "../components/ColorPicker";
import { randomizeHalo } from "../components/HaloPicker";

// TODO: these are coordinates of Berlin, replace them with the coordinates of user's IP location
const latitude = 52.5422;
const longitude = 13.3495;

export const initialState: AppState = {
  minting: false,
  background: randomizeBackground(),
  halo: randomizeHalo(),
  handle: 0,
  stone: randomizeStone(),
  tokenId: 123,
  latitude,
  longitude,
};

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
      return {
        ...state,
        background: randomizeBackground(state.background),
        halo: randomizeHalo(),
        stone: randomizeStone(),
      };
    }
  }
};
