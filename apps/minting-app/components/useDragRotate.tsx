import { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "../utils/trigonometry";
import { usePrevious } from "./usePrevious";
import { useSpring } from "@react-spring/web";

function useDragRotate<T>(value: number = 0, onRest: (angle: number) => void) {
  const container = useRef<T | null>(null);
  const valueAtStart = useRef(value);
  const [dragging, setDragging] = useState<boolean>(false);

  // This state is not read, but used to trigger view updates while dragging/spinning.
  // For reading we use the rotation spring value instead.
  const [, setRotation] = useState<number>(value);

  const [velocity, setVelocity] = useState(0);
  const [hovering, setHovering] = useState<boolean>(false);
  const [dragRotation, setDragRotation] = useState<number>(value);
  const prevDragRotation = usePrevious(dragRotation);

  const { rotation: rotationSpring } = useSpring({
    from: { rotation: prevDragRotation },
    to: { rotation: dragRotation },
    immediate: dragging,
    config: {
      velocity: velocity,
      decay: velocity !== 0,
    },
    onChange: () => {
      if (!dragging) {
        setRotation(rotationSpring.get());
      }
    },
    onRest() {
      if (!dragging) {
        onRest(rotationSpring.get());
      }
    },
  });

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
      if (first) {
        valueAtStart.current = rotationSpring.get();
      }

      const { center } = dimensions(
        (container.current as Element).getBoundingClientRect()
      );
      const initialAngle = polarAngle(
        minus({ x: initialX, y: initialY }, center)
      );
      const currentAngle = polarAngle(minus({ x, y }, center));

      const delta = currentAngle - initialAngle;
      const nextRotation = valueAtStart.current + delta;

      const velocity = {
        x: absVelocity[0] * Math.sign(movement[0]),
        y: absVelocity[1] * Math.sign(movement[1]),
      };

      // calculate the component of the velocity in tangential direction (i.e. perpendicular to the vector from center to current drag position)
      const velocityAngle = polarAngle(velocity);
      const velocityMagnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      const velocityAngleToTangent = currentAngle - velocityAngle + 90;
      const tangentialVelocity =
        Math.cos((velocityAngleToTangent / 180) * Math.PI) * velocityMagnitude;

      setDragging(dragging as boolean);
      setDragRotation(nextRotation);
      setRotation(nextRotation);

      if (last) {
        setVelocity(tangentialVelocity);
        if (tangentialVelocity === 0) onRest(nextRotation);
      }
    },
  });

  return {
    bind: () => ({ ...bind(), ref: container }),
    dragging,
    hovering,
    rotation: rotationSpring,
  };
}

export default useDragRotate;

type Point = { x: number; y: number };

const minus = (a: Point, b: Point) => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

const polarAngle = (point: Point) =>
  (Math.atan2(point.y, point.x) * 180) / Math.PI;
