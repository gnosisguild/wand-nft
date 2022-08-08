import { useEffect, useState } from "react";

import useDragRotate from "./useDragRotate";
import useRotateAnimate from "./useRotateAnimate";

function useDragRotateAnimate<T>(
  value: number = 0,
  onChange: (angle: number) => void
) {
  useEffect(() => {
    setIsAnimating(false);
  }, [value]);

  const [isAnimating, setIsAnimating] = useState(false);

  const {
    bind,
    hovering,
    dragging,
    rotation: draggedRotation,
  } = useDragRotate<HTMLDivElement>(value, (nextRotation) => {
    onChange(nextRotation);
  });

  const {
    animateTo,
    rotation: { transform: animatedTransform, value: animatedRotation },
  } = useRotateAnimate({
    onStart: () => {
      setIsAnimating(true);
    },
    onRest: (nextRotation: number) => {
      onChange(nextRotation);
    },
  });

  const rotation = isAnimating ? animatedRotation : draggedRotation;
  const transform = isAnimating ? animatedTransform : `rotate(${rotation}deg)`;

  return {
    bind: isAnimating ? () => ({}) : bind,
    hovering,
    dragging,
    rotation: {
      transform,
      value: rotation,
    },
    animateTo,
  };
}

export default useDragRotateAnimate;
