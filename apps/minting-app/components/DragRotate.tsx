import { useState, useRef, ReactNode } from "react";
import { useDrag } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "./trigonometry";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

type Props = {
  value?: number;
  onDragEnd: (nextValue: number) => void;
  children: (props: ChildrenProps) => ReactNode;
};

type ChildrenProps = {
  bind: (...args: any[]) => ReactDOMAttributes;
  rotation: number;
};

export type Bind = (...args: any[]) => ReactDOMAttributes;

const DragRotate: React.FC<Props> = ({ children, value = 0, onDragEnd }) => {
  const container = useRef<HTMLDivElement | null>(null);
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

      if (last) {
        onDragEnd(nextRotation);
      }
    }
  );

  return children({
    bind: () => ({ ...bind(), ref: container }),
    rotation,
  });
};

export default DragRotate;

export const useDragRotate = (value: number = 0) => {
  const container = useRef<HTMLDivElement | null>(null);

  const [{ isFirst, isLast, pin, rotation }, set] = useState<{
    isFirst: boolean;
    isLast: boolean;
    pin: number;
    rotation: number;
  }>({ isFirst: false, isLast: false, pin: 0, rotation: value });

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

      set({
        isFirst: first,
        isLast: last,
        pin: first ? rotation : pin,
        rotation: first ? rotation : (pin + delta) % 360,
      });
    }
  );

  return {
    bind: () => ({ ...bind(), ref: container }),
    isFirst,
    isLast,
    rotation,
  };
};
