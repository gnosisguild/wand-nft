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
