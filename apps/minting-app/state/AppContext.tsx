import React, { useEffect, createContext, useContext, useReducer } from "react";
import { useRouter } from "next/router";

import { AppReducer, initialState, Action } from "./AppReducer";
import { AppState } from "../types";

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  // get geo coords from server
  const router = useRouter();
  const lat = router.query.lat || "0";
  const long = router.query.long || "0";
  initialState.latitude = parseFloat(lat as string);
  initialState.longitude = parseFloat(long as string);
  console.log("lat", initialState.latitude);
  console.log("long", initialState.longitude);
  const [state, dispatch] = useReducer(
    AppReducer,
    initialState,
    (initialState: AppState): AppState => {
      let existingState;
      if (typeof window !== "undefined") {
        const storedState = localStorage.getItem("appState");
        if (storedState) {
          existingState = JSON.parse(storedState);
        }
      }
      return existingState ? existingState : initialState;
    }
  );

  const contextValue = { state, dispatch };

  useEffect(() => {
    if (state && state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
