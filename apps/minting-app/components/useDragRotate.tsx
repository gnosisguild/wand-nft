import { useState, useRef, ReactNode } from "react";
import { useDrag } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "./trigonometry";

const useDragRotate = (value: number = 0) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [pin, setPin] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(value);

  const bind = useDrag(
    ({ first, last, initial: [initialX, initialY], xy: [x, y] }) => {
      const { center } = dimensions(
        container.current?.getBoundingClientRect() as DOMRect
      );

      const delta = clockwiseDelta(
        //drag start angle
        toAngle(center, { x: initialX, y: initialY }),
        //drag current angle
        toAngle(center, { x, y })
      );

      const nextRotation = (pin + delta) % 360;

      if (first) {
        setPin(rotation);
      } else {
        setRotation(nextRotation);
      }

      setIsLast(last);
    }
  );

  return { bind: () => ({ ...bind(), ref: container }), isLast, rotation };
};

export default useDragRotate;
