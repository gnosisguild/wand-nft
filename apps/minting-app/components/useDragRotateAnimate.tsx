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
  const { bind, hovering, dragging, rotation } = useDragRotate<T>(
    value,
    (nextRotation) => {
      onChange(nextRotation);
    }
  );

  const {
    isAnimating,
    rotation: { transform },
    animateTo,
  } = useRotateAnimate();

  return {
    bind: isAnimating ? () => ({}) : bind,
    hovering,
    dragging,
    rotation: {
      transform: isAnimating ? transform : `rotate(${rotation}deg)`,
      value: rotation,
    },
    animateTo,
  };
}

export default useDragRotateAnimate;
