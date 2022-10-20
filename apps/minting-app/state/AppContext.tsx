import React, { createContext, useContext, useEffect, useReducer } from "react";

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

  useEffect(() => {
    // only show the journey on load if localstorage doesn't have the "seenJourney" value set
    // we can only check for this value on the client
    const hasSeenJourney = localStorage.getItem("seenJourney") || false;
    dispatch({ type: "ChangeJourney", value: hasSeenJourney ? false : true });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
