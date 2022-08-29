import { useEffect, useState } from "react";
import { useAppContext } from "../../state";

const HandleClock: React.FC = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("changing handle");
      dispatch({type: "changeHandle", value: getHandleFromHour()});
    }, 10 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getHandleFromHour = (): 0 | 1 | 2 | 3 => {
    const hour = new Date().getHours();
    if (hour >= 3 && hour <9) {
      return 0
    } else if (hour >= 9 && hour <15) {
      return 1
    } else if (hour >= 15 && hour <21) {
      return 2
    } else if (hour >= 21 || hour <3) {
      return 3
    }
    return 0;
  };
  return <></>;
};

export default HandleClock;