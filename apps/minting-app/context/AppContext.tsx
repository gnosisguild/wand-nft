import React, { useEffect, createContext, useContext, useReducer } from "react";

import { AppReducer, ActionTypes, initialState } from "./AppReducer";
import { TemplateInput } from "../types";

const AppContext = createContext<{
  state: TemplateInput;
  dispatch: React.Dispatch<ActionTypes>;
}>({ state: initialState, dispatch: () => {} });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let existingState;
  if (typeof window !== "undefined") {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      existingState = JSON.parse(storedState);
    }
  }
  const [state, dispatch] = useReducer(
    AppReducer,
    existingState ? existingState : initialState
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
