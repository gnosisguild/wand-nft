import { useCallback, useEffect } from "react";
import { useAppContext } from "../state";

const useHandleClock = () => {
  const { state, dispatch } = useAppContext();

  const determineHandle = useCallback(() => {
    const handle = getHandleFromHour();

    if (handle !== state.handle) {
      dispatch({ type: "changeHandle", value: handle });
    }
  }, [state.handle, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      determineHandle();
    }, 10 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, [determineHandle]);
};

export default useHandleClock;

export const getHandleFromHour = (): 0 | 1 | 2 | 3 => {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 9) {
    return 0;
  } else if (hour >= 9 && hour < 15) {
    return 1;
  } else if (hour >= 15 && hour < 21) {
    return 2;
  } else {
    return 3;
  }
};
