import { useState } from "react";
import { useSpring, easings } from "@react-spring/web";

type Args = {
  onStart: (rotation: number) => void;
  onRest: (rotation: number) => void;
};

function useRotateAnimate({ onStart, onRest }: Args) {
  const [{ from, to, isAnimating }, setState] = useState({
    from: 0,
    to: 0,
    isAnimating: false,
  });

  const [rotation, setRotation] = useState(0);

  const { transform } = useSpring({
    from: { transform: from },
    to: { transform: to },
    config: {
      easing: easings.easeInOutQuart,
    },
    onStart: (spring) => {
      onStart(spring.value.transform);
    },
    onChange: (spring) => {
      setRotation(spring.value.transform);
    },
    onRest: (spring) => {
      onRest(spring.value.transform);
    },
  });

  return {
    isAnimating,
    animateTo: (from: number, to: number) => {
      setState({ isAnimating: true, from, to });
    },
    rotation: {
      value: rotation,
      transform: transform.to((rotation) => `rotate(${rotation}deg)`),
    },
  };
}

export default useRotateAnimate;
