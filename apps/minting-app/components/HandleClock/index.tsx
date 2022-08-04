import { useEffect, useState } from "react";
import SunCalc from "suncalc";
import { useAppContext } from "../../state";

const HandleClock: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { handle } = state;

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("changing handle");
    }, 10 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getHandleFromSun = (): 0 | 1 | 2 | 3 => {
    return 0;
  };
  return <></>;
};

export default HandleClock;
