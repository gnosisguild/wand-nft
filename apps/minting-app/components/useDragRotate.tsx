import { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "../utils/trigonometry";
import { usePrevious } from "./usePrevious";
import { useSpring } from "@react-spring/web";

function useDragRotate<T>(value: number = 0, onRest: (angle: number) => void) {
  const container = useRef<T | null>(null);
  const valueAtStart = useRef(value);
  const [dragging, setDragging] = useState<boolean>(false);

  const [velocity, setVelocity] = useState(0);
  const [dragRotation, setDragRotation] = useState<number>(value);
  const [hovering, setHovering] = useState<boolean>(false);

  const prevDragRotation = usePrevious(dragRotation);

  const { rotation } = useSpring({
    from: { rotation: prevDragRotation },
    to: { rotation: dragRotation },
    immediate: dragging,
    config: {
      velocity: velocity,
      decay: velocity !== 0,
    },
    onRest() {
      if (!dragging) onRest(rotation.get());
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
      const { center } = dimensions(
        (container.current as Element).getBoundingClientRect()
      );

      const initialAngle = toAngle(center, { x: initialX, y: initialY });
      const currentAngle = toAngle(center, { x, y });
      const delta = currentAngle - initialAngle;
      const nextRotation = valueAtStart.current + delta;

      const velocity = [
        absVelocity[0] * Math.sign(movement[0]),
        absVelocity[1] * Math.sign(movement[1]),
      ];

      if (first) {
        valueAtStart.current = rotation.get();
        console.log("first", valueAtStart.current);
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
      setDragRotation(nextRotation);

      if (last) {
        console.log("last", nextRotation, movement, velocity, angularVelocity);

        setVelocity(angularVelocity);
        if (angularVelocity === 0) onRest(nextRotation);
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
