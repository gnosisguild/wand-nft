import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

import { AppReducer, initialState, Action } from "./AppReducer";
import { AppState } from "../types";

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    // https://nextjs.org/docs/messages/react-hydration-error#possible-ways-to-fix-it
    setIsClient(true);
  }, []);

  return (
    <AppContext.Provider
      value={{ state: isClient ? state : ssrState, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

export const ssrState: AppState = {
  minting: false,
  background: {
    radial: true,
    dark: true,
    color: {
      hue: 281,
      saturation: 33,
      lightness: 40,
    },
  },
  halo: {
    shape: 3,
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
  stone: 0,
  tokenId: 0,
  latitude: 0,
  longitude: 0,
};
