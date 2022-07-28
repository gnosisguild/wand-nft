import { useState, useRef, DOMElement } from "react";
import { useGesture } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "./trigonometry";

function useDragRotate<T>(
  value: number = 0,
  onDragEnd: (angle: number) => void
) {
  const container = useRef<T | null>(null);
  const [pin, setPin] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(value);

  const bind = useGesture({
    onHover: ({ hovering }) => setHovering(hovering as boolean),
    onDrag: ({
      dragging,
      first,
      last,
      initial: [initialX, initialY],
      xy: [x, y],
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
        onDragEnd(nextRotation);
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
