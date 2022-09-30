import { useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

import useDragRotate from "./useDragRotate";
import { usePrevious } from "./usePrevious";

function useDragRotateAnimate<T>(
  value: number = 0,
  onChange: (angle: number) => void
) {
  const [dragging, setDragging] = useState<boolean>(false);
  const [velocity, setVelocity] = useState(0);
  const [dragRotation, setDragRotation] = useState<number>(value);
  const prevDragRotation = usePrevious(dragRotation);

  const { rotation } = useSpring({
    from: { rotation: prevDragRotation },
    to: { rotation: dragRotation },
    immediate: dragging,
    config: {
      velocity: velocity,
      decay: velocity !== 0,
    },
    onChange() {
      // console.log("change", transform.get());
    },
    onRest() {
      if (!dragging) onChange(rotation.get());
    },
  });

  const { bind, hovering } = useDragRotate<T>(
    rotation,
    (rotation: number, velocity: number) => {
      setDragRotation(rotation);
      setVelocity(velocity);
      if (velocity === 0) onChange(rotation);
    }
  );

  return {
    bind,
    hovering,
    dragging,
    rotation,
  };
}

export default useDragRotateAnimate;
