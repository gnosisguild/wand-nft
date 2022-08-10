import { useState } from "react";
import { useSpring, easings } from "@react-spring/web";

function useRotateAnimate() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [{ from, to }, setState] = useState({
    from: 0,
    to: 0,
  });

  const { transform } = useSpring({
    from: { transform: from },
    to: { transform: to },
    config: {
      easing: easings.easeInOutQuart,
    },
    onStart: () => {
      setIsAnimating(true);
    },
    onRest: () => {
      setIsAnimating(false);
    },
  });

  return {
    isAnimating,
    animateTo: (from: number, to: number) => {
      setState({ from, to });
    },
    rotation: {
      transform: transform.to((rotation) => `rotate(${rotation}deg)`),
    },
  };
}

export default useRotateAnimate;
