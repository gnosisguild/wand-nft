import { useEffect, useState } from "react";
import { useSpring, easings } from "@react-spring/web";

import useDragRotate from "./useDragRotate";
import { usePrevious } from "./usePrevious";
import assert from "assert";
import { delta } from "./trigonometry";

function useDragRotateAnimate<T>(
  value: number = 0,
  onChange: (angle: number) => void
) {
  /*
   * This hook expands on useDragRotate, by adding animation
   * We keep track of three rotations:
   * - draggedRotation > mouse down drag
   * - animatedRotation > real time angle while rotation
   * - rotation > the final value, once everything settles
   *
   * We pipe everything though the spring animation pipeline and rely
   * on `immediate` and `onRest` to make this work (onRest is called
   * spring's movement comes to a halt)
   */

  // draggedRotation
  const {
    bind,
    rotation: draggedRotation,
    hovering,
    dragging,
  } = useDragRotate<T>(value, (next: number, velocity: number) => {
    setRotation({ rotation: next, velocity });
  });
  // animatedRotation
  const [animatedRotation, setAnimatedRotation] = useState<number>(value);
  // rotation
  const [{ rotation, velocity }, setRotation] = useState<{
    rotation: number;
    velocity: number;
  }>({ rotation: value, velocity: 0 });

  useEffect(() => {
    setRotation({ rotation: value, velocity: 0 });
  }, [setRotation, value]);

  const to = dragging ? draggedRotation : rotation;
  const from = usePrevious(to);

  const { transform } = useSpring({
    from: { transform: from },
    to: { transform: to },
    immediate: dragging, //|| //delta(from, to) < 1,
    config: {
      decay: velocity !== 0,
      velocity,
    },
    onChange: (spring) => {
      const next = extractRotation(spring.value.transform);
      setAnimatedRotation(next);
    },
    onRest: (spring) => {
      if (!dragging) {
        const next = extractRotation(spring.value.transform);
        onChange(next);
      }
    },
  });

  /*
   * Note:
   * when `immediate: true` spring skips animation and just updates,
   * however onChange and onRest still called.
   */

  return {
    bind,
    rotateTo: (next: number) => {
      console.log("set", next);
      setRotation({ rotation: next, velocity: 0 });
    },
    dragging,
    hovering,
    rotation: {
      value: animatedRotation,
      transform: transform.to((rotation) => `rotate(${rotation}deg)`),
    },
  };
}

export default useDragRotateAnimate;

const DECIMAL = /[-]?\d+(\.\d+)?/;

function extractRotation(text: string) {
  assert(DECIMAL.test(text));

  return Number((DECIMAL.exec(text) as string[])[0]);
}
