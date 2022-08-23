import React, { createContext, useContext, useReducer } from "react";

import { AppReducer, Action, zeroState } from "./AppReducer";
import { AppState } from "../types";

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: zeroState(), dispatch: () => {} });

export function AppWrapper({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: AppState;
}) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state: state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
