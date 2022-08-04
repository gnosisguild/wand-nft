import { AppState, Background, Stone, Halo } from "../types";

export const initialState: AppState = {
  background: {
    radial: true,
    dark: true,
    color: {
      hue: 281,
      saturation: 33,
      lightness: 41,
    },
  },
  halo: {
    shape: 2,
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
    ],
  },
  handle: 0,
  stone: 5,
  tokenId: 123,
  latitude: 0,
  longitude: 0,
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

export interface ChangeHandleAction {
  type: "changeHandle";
  value: 0 | 1 | 2 | 3;
}

export type Action =
  | ChangeBackgroundAction
  | ChangeHaloAction
  | ChangeStoneAction
  | ChangeHandleAction;

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
    case "changeHandle": {
      return {
        ...state,
        handle: action.value,
      };
    }
  }
};
