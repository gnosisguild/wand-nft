import { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "../utils/trigonometry";

function useDragRotate<T>(
  value: number = 0,
  onDragEnd: (angle: number, velocity: number) => void
) {
  const container = useRef<T | null>(null);
  const valueAtStart = useRef(value);
  const [dragging, setDragging] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(value);

  useEffect(() => {
    valueAtStart.current = value;
  }, [value]);

  const bind = useGesture({
    onHover: ({ hovering }) => setHovering(hovering as boolean),
    onDrag: ({
      dragging,
      first,
      last,
      initial: [initialX, initialY],
      xy: [x, y],
      velocity: absVelocity,
      movement,
    }) => {
      const { center } = dimensions(
        (container.current as Element).getBoundingClientRect()
      );

      const initialAngle = toAngle(center, { x, y });
      const currentAngle = toAngle(center, { x: initialX, y: initialY });
      const delta = currentAngle - initialAngle;
      const nextRotation = valueAtStart.current - delta;

      const velocity = [
        absVelocity[0] * Math.sign(movement[0]),
        absVelocity[1] * Math.sign(movement[1]),
      ];

      if (first) {
        console.log("first", valueAtStart.current, x, y);
        valueAtStart.current = value;
      }

      const veloTarget = { x: x + velocity[0], y: y + velocity[1] };
      const angularVelocity =
        toAngle(center, veloTarget) - toAngle(center, { x, y });

      // the length of the vector from the center to the release+velocity position is a measure of the spinning lever
      // const lever = Math.sqrt(
      //   Math.pow(veloTarget.x - center.x, 2) +
      //     Math.pow(veloTarget.y - center.y, 2)
      // );

      setDragging(dragging as boolean);

      setRotation(nextRotation);

      if (last) {
        console.log("last", nextRotation, movement, velocity, angularVelocity);
        onDragEnd(nextRotation, angularVelocity);
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
