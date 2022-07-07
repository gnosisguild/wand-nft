import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import classes from "./ColorPicker.module.css";

export const ColorPicker = () => {
  const { state, dispatch } = useAppContext();
  const ref = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let ctx = canvasCtxRef.current;

  const parentRef = useRef<HTMLDivElement | null>(null);

  // ----- CONFIG ----- //

  // Common
  const size = 200;
  const thickness = size / 20;
  const knobRadius = 15;
  let intiialKnobOffsetX = size / 2 - knobRadius;

  // Hue
  const hueRadius = size / 2;
  let [hueValue, setHueValue] = useState(state.background.color.hue);
  const [mouseDown, setMouseDown] = useState(false);
  let [hueCoords, setHueCoords] = useState({ x: 0, y: 0 });
  const [knobType, setKnobType] = useState("hue");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  let [hueKnobPos, setHueKnobPos] = useState({
    x: intiialKnobOffsetX,
    y: thickness / 2 - knobRadius,
  });

  // Lightness
  const lightnessSize = size * 0.6;
  const lightnessRadius = lightnessSize / 2;
  const lightnessRange = [80, 40]; // Max lightness, Min lightness
  let [lightnessValue, setLightnessValue] = useState(
    state.background.color.lightness
  );
  let [lightnessKnobPos, setLightnessKnobPos] = useState({
    x: intiialKnobOffsetX,
    y: (size - lightnessSize) / 2 + thickness / 2 - knobRadius,
  });
  const lightnessOffset = (size - lightnessSize) / 2;
  let [lightnessCoords, setLightnessCoords] = useState({
    x: lightnessOffset,
    y: lightnessOffset,
  });

  const setupSlider = () => {
    let pickerElement = parentRef.current;
    let pickerOffset = {
      left: pickerElement?.offsetLeft,
      top: pickerElement?.offsetTop,
    };
    setHueCoords({ x: pickerOffset.left, y: pickerOffset.top });
    setLightnessCoords({
      x: pickerOffset.left + lightnessOffset,
      y: pickerOffset.top + lightnessOffset,
    });

    drawHueArc();
    drawLightnessArc();
  };

  const drawHueArc = () => {
    // Create conical hue gradient
    let gradient, i;
    ctx!.arc(size / 2, size / 2, hueRadius, 0, 2 * Math.PI);
    gradient = ctx!.createConicGradient(-1.5708, hueRadius, hueRadius);
    for (i = 0; i <= 360; i++) {
      gradient.addColorStop(
        (1 / 360) * i,
        `hsl(${i}, ${state.background.color.saturation}%, 50%)`
      );
    }

    // Fill it
    ctx!.fillStyle = gradient;
    ctx!.fill();

    // Crop out center circle
    ctx!.save();
    ctx!.globalCompositeOperation = "destination-out";
    ctx!.beginPath();
    ctx!.arc(size / 2, size / 2, size / 2 - thickness, 0, Math.PI * 2);
    ctx!.closePath();
    ctx!.fill();
    ctx!.restore();
  };

  const drawLightnessArc = () => {
    // Create conical hue gradient
    let gradient, i;
    ctx!.beginPath();
    ctx!.arc(size / 2, size / 2, lightnessRadius, 0, 2 * Math.PI);
    ctx!.closePath();
    gradient = ctx!.createConicGradient(-1.5708, hueRadius, hueRadius);
    gradient.addColorStop(0, `hsl(0,0%,${lightnessRange[0]}%)`); // light
    gradient.addColorStop(1, `hsl(0,0%,${lightnessRange[1]}%)`); // darkest

    // Fill it
    ctx!.fillStyle = gradient;
    ctx!.fill();

    // Crop out center circle
    ctx!.save();
    ctx!.globalCompositeOperation = "destination-out";
    ctx!.beginPath();
    ctx!.arc(size / 2, size / 2, lightnessRadius - thickness, 0, Math.PI * 2);
    ctx!.closePath();
    ctx!.fill();
    ctx!.restore();
  };

  const getColorValue = (coords: { x: number; y: number }) => {
    let atan, value;
    let radius = knobType === "hue" ? hueRadius : lightnessRadius;
    let elementCoords = knobType === "hue" ? hueCoords : lightnessCoords;
    const mousePosition = {
      x: coords.x - elementCoords.x,
      y: coords.y - elementCoords.y,
    };
    atan = Math.atan2(mousePosition.x - radius, mousePosition.y - radius);
    value = -atan / (Math.PI / 180) + 180;

    return value;
  };

  const setKnobPosition = (target: number) => {
    let radius = knobType === "hue" ? hueRadius : lightnessRadius;
    let orbit = radius - thickness / 2; // the center radius of the radial slider.
    let knob = knobType === "hue" ? hueKnobPos : lightnessKnobPos;
    knob.x =
      Math.round(orbit * Math.sin((target * Math.PI) / 180)) +
      orbit -
      knobRadius +
      4;
    knob.y =
      Math.round(orbit * -Math.cos((target * Math.PI) / 180)) +
      orbit -
      knobRadius +
      4;
    if (knobType === "hue") {
      setHueKnobPos({ x: knob.x, y: knob.y });
    } else {
      let offset = (size - lightnessSize) / 2;
      setLightnessKnobPos({ x: knob.x + offset, y: knob.y + offset });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    setMouseDown(true);
    setKnobType(target.id);
  };

  const handleMouseUp = (e: MouseEvent) => {
    setMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setMouseX(e.x);
    setMouseY(e.y);
  };

  useEffect(() => {
    document.querySelector("body")?.addEventListener("mouseup", handleMouseUp);
    document
      .querySelector("body")
      ?.addEventListener("mousemove", handleMouseMove);

    if (ref.current) {
      canvasCtxRef.current = ref.current.getContext("2d");
      ctx = canvasCtxRef.current;
      setHueValue(hueValue);
      setupSlider();
    }

    return () => {
      document
        .querySelector("body")
        ?.removeEventListener("mouseup", handleMouseUp);
      document
        .querySelector("body")
        ?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (mouseDown) {
      if (knobType === "hue") {
        const hueVal = getColorValue({ x: mouseX, y: mouseY });
        dispatch({
          type: "changeBackground",
          value: {
            ...state.background,
            color: { ...state.background.color, hue: hueVal },
          },
        });
        setHueValue(hueVal);
        setKnobPosition(hueVal);
      } else {
        const lightnessTarget = getColorValue({ x: mouseX, y: mouseY });
        const lightnessVal = (lightnessTarget / 360) * 100;
        dispatch({
          type: "changeBackground",
          value: {
            ...state.background,
            color: {
              ...state.background.color,
              lightness: Math.round(
                lightnessRange[0] -
                  ((lightnessRange[0] - lightnessRange[1]) * lightnessValue) /
                    100
              ),
            },
          },
        });
        setLightnessValue(lightnessVal);
        setKnobPosition(lightnessTarget);
      }
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={parentRef}
      className={classes.colorPicker}
      style={{ width: size, height: size }}
    >
      <canvas ref={ref} width={size} height={size} />
      {["hue", "lightness"].map((colorType) => {
        let knob = colorType === "hue" ? hueKnobPos : lightnessKnobPos;
        return (
          <div
            key={colorType}
            id={colorType}
            className={classes.knob}
            onMouseDown={handleMouseDown}
            style={{
              backgroundColor:
                mouseDown && knobType === colorType ? "#c2c2c2" : "#e2e2e2",
              height: knobRadius * 2,
              left: knob.x,
              width: knobRadius * 2,
              top: knob.y,
            }}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ColorPicker);
