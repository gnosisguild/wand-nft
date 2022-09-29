import { useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

import useDragRotate from "./useDragRotate";
import { usePrevious } from "./usePrevious";

function useDragRotateAnimate<T>(
  value: number = 0,
  onChange: (angle: number) => void
) {
  const [velocity, setVelocity] = useState(0);

  const { bind, hovering, dragging, rotation } = useDragRotate<T>(
    value,
    (next: number, velocity: number) => {
      // onChange(next);
      setVelocity(velocity);
    }
  );

  const prevRotation = usePrevious(rotation);

  const { transform } = useSpring({
    from: { transform: prevRotation },
    to: { transform: rotation },
    immediate: dragging,
    config: {
      velocity: velocity,
      decay: velocity !== 0,
    },
  });

  useEffect(() => {
    transform.start({ config: { velocity } });
  }, [velocity]);

  return {
    bind,
    hovering,
    dragging,
    rotation: {
      transform: transform.to((rotation) => `rotate(${rotation}deg)`),
      value: rotation,
    },
  };
}

export default useDragRotateAnimate;
