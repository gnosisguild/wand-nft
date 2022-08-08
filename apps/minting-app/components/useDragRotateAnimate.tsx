import { useEffect, useState } from "react";
import { Interpolation } from "@react-spring/web";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

import useDragRotate from "./useDragRotate";
import useRotateAnimate from "./useRotateAnimate";

export type DragRotateAnimateReturn = {
  bind: () => ReactDOMAttributes;
  hovering: boolean;
  dragging: boolean;
  rotation: {
    transform: string | Interpolation<number, string>;
    value: number;
  };
  animateTo: (from: number, to: number) => void;
};

function useDragRotateAnimate<T>(
  value: number = 0,
  onChange: (angle: number) => void
): DragRotateAnimateReturn {
  useEffect(() => {
    setIsAnimating(false);
  }, [value]);

  const [isAnimating, setIsAnimating] = useState(false);

  const {
    bind,
    hovering,
    dragging,
    rotation: draggedRotation,
  } = useDragRotate<T>(value, (nextRotation) => {
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
