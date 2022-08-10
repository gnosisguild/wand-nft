import { useSpring } from "@react-spring/web";

import useDragRotate from "./useDragRotate";
import { usePrevious } from "./usePrevious";

function useDragRotateAnimate<T>(
  value: number = 0,
  onChange: (angle: number) => void
) {
  const { bind, hovering, dragging, rotation } = useDragRotate<T>(
    value,
    (nextRotation) => {
      onChange(nextRotation);
    }
  );

  const prevRotation = usePrevious(rotation);

  const { transform } = useSpring({
    from: { transform: `rotate(${prevRotation}deg)` },
    to: { transform: `rotate(${rotation}deg)` },
    immediate: dragging,
  });

  return {
    bind,
    hovering,
    dragging,
    rotation: {
      transform,
      value: rotation,
    },
  };
}

export default useDragRotateAnimate;
