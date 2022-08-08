import { useEffect, useState } from "react";
import { useSpring, easings } from "@react-spring/web";

import useDragRotate from "./useDragRotate";
import { usePrevious } from "./usePrevious";
import assert from "assert";

function useInertialDragRotate<T>(
  value: number = 0,
  onChange: (angle: number) => void
) {
  // draggedRotation
  const {
    bind,
    rotation: draggedTo,
    hovering,
    dragging,
  } = useDragRotate<T>(value, (lastDraggedTo: number, velocity: number) => {
    if (velocity) {
      setRotation({ rotation: lastDraggedTo, velocity });
    } else {
      onChange(lastDraggedTo);
    }
  });

  // rotation
  const [{ rotation, velocity }, setRotation] = useState<{
    rotation: number;
    velocity: number;
  }>({ rotation: value, velocity: 0 });

  useEffect(() => {
    setRotation({ rotation: value, velocity: 0 });
  }, [value]);

  const to = dragging ? draggedTo : rotation;
  const from = usePrevious(to);

  const { transform } = useSpring({
    from: { transform: from },
    to: { transform: to },
    immediate: dragging,
    config: {
      decay: velocity > 0,
      velocity,
      easing: easings.easeInOutBack,
    },
    onRest: (spring) => {
      if (!dragging) {
        onChange(spring.value.transform);
      }
    },
  });

  return {
    bind,
    rotateTo: (next: number) => {
      setRotation({ rotation: next, velocity: 0 });
    },
    dragging,
    hovering,
    rotation: {
      value: transform.animation.values[0]?._value || 0,
      transform: transform.to((rotation) => `rotate(${rotation}deg)`),
    },
  };
}

export default useInertialDragRotate;
