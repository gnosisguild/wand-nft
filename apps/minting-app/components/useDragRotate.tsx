import { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "../utils/trigonometry";

function useDragRotate<T>(
  value: number = 0,
  onDragEnd: (angle: number, velocity: number) => void
) {
  const container = useRef<T | null>(null);
  const [pin, setPin] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(value);

  useEffect(() => {
    setRotation(value);
  }, [setRotation, value]);

  const bind = useGesture({
    onHover: ({ hovering }) => setHovering(hovering as boolean),
    onDrag: ({
      dragging,
      first,
      last,
      initial: [initialX, initialY],
      xy: [x, y],
      velocity,
    }) => {
      const { center } = dimensions(
        (container.current as Element).getBoundingClientRect()
      );

      const delta = clockwiseDelta(
        //drag start angle
        toAngle(center, { x: initialX, y: initialY }),
        //drag current angle
        toAngle(center, { x, y })
      );

      const nextRotation = (pin + delta) % 360;

      setDragging(dragging as boolean);
      if (first) {
        setPin(rotation);
      } else {
        setRotation(nextRotation);
      }

      if (last) {
        onDragEnd(
          nextRotation,
          Math.sqrt(Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2))
        );
      }
    },
  });

  return {
    bind: () => ({ ...bind(), ref: container }),
    dragging,
    hovering,
    rotation,
  };
}

export default useDragRotate;
