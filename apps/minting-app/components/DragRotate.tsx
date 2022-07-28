import { useState, useRef, ReactNode } from "react";
import { useGesture } from "@use-gesture/react";
import { clockwiseDelta, dimensions, toAngle } from "./trigonometry";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

type Props = {
  value?: number;
  onDragEnd: (nextValue: number) => void;
  children: (props: ChildrenProps) => ReactNode;
};

type ChildrenProps = {
  bind: (...args: any[]) => ReactDOMAttributes;
  hovering: boolean;
  dragging: boolean;
  rotation: number;
};

export type Bind = (...args: any[]) => ReactDOMAttributes;

const DragRotate: React.FC<Props> = ({ children, value = 0, onDragEnd }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [pin, setPin] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(value);
  const [hovering, setHovering] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

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
        container.current?.getBoundingClientRect() as DOMRect
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

  return children({
    bind: () => ({ ...bind(), ref: container }),
    hovering,
    dragging,
    rotation,
  });
};

export default DragRotate;

export const useDragRotate = (value: number = 0) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [pin, setPin] = useState<number>(0);
  const [last, setLast] = useState<boolean>(false);
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
        container.current?.getBoundingClientRect() as DOMRect
      );

      const delta = clockwiseDelta(
        //drag start angle
        toAngle(center, { x: initialX, y: initialY }),
        //drag current angle
        toAngle(center, { x, y })
      );

      const nextRotation = (pin + delta) % 360;

      setLast(last);
      setDragging(dragging as boolean);
      if (first) {
        setPin(rotation);
      } else {
        setRotation(nextRotation);
      }
    },
  });

  return {
    bind: () => ({ ...bind(), ref: container }),
    last,
    dragging,
    hovering,
    rotation,
  };
};
