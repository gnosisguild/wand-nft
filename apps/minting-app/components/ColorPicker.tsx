import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./ColorPicker.module.css";

export const Canvas = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let ctx = canvasCtxRef.current;

  const parentRef = useRef<HTMLDivElement | null>(null);

  // ----- CONFIG ----- //

  // Common
  const size = 200;
  const thickness = size / 20;
  const knobRadius = 15;
  // let mouseDown = false;
  // let knobType;
  // let mousePosition;
  // let elementPosition;
  let raf;

  // Hue
  const hueRadius = size / 2;
  let [hueValue, setHueValue] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [elementCoords, setElementCoords] = useState({ x: 0, y: 0 });
  const [knobType, setKnobType] = useState("hue");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  // Todo: figure out how to set initial state to top center dynamically by calling setHueKnobPosition().
  let [hueKnobPos, setHueKnobPos] = useState({ x: 85, y: -11 });

  // Lightness
  const lightnessSize = size * 0.75;
  const lightnessRadius = lightnessSize / 2;
  const lightnessRange = [80, 40]; // Max lightness, Min lightness

  const setupSlider = () => {
    let pickerElement = parentRef.current;
    let pickerOffset = {
      left: pickerElement?.offsetLeft,
      top: pickerElement?.offsetTop,
    };
    setElementCoords({ x: pickerOffset.left, y: pickerOffset.top });
    // let mousePosition = { x: 0, y: 0 };

    drawHueArc();
    drawLightnessArc();
  };

  const setHueKnobPosition = (target) => {
    let orbit = hueRadius - thickness / 2; // the center radius of the radial slider.
    hueKnobPos.x =
      Math.round(orbit * Math.sin((target * Math.PI) / 180)) +
      orbit -
      knobRadius +
      4;
    hueKnobPos.y =
      Math.round(orbit * -Math.cos((target * Math.PI) / 180)) +
      orbit -
      knobRadius +
      4;
    setHueKnobPos({ x: hueKnobPos.x, y: hueKnobPos.y });
  };

  const drawHueArc = () => {
    // Create conical hue gradient
    let gradient, i;
    ctx!.arc(size / 2, size / 2, hueRadius, 0, 2 * Math.PI);
    gradient = ctx!.createConicGradient(-1.5708, hueRadius, hueRadius);
    for (i = 0; i <= 360; i++) {
      gradient.addColorStop((1 / 360) * i, `hsl(${i},100%, 50%)`);
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

  const getHueValue = (coords: { x: number; y: number }) => {
    let atan, value;
    const mousePosition = {
      x: coords.x - elementCoords.x,
      y: coords.y - elementCoords.y,
    };
    atan = Math.atan2(mousePosition.x - hueRadius, mousePosition.y - hueRadius);
    value = -atan / (Math.PI / 180) + 180;

    return value;
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
        const hueVal = getHueValue({ x: mouseX, y: mouseY });
        setHueValue(hueVal);
        setHueKnobPosition(hueVal);
      } else {
        // setLightnessPosition(event);
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
      <span
        className={classes.value}
        style={{
          backgroundColor: `hsl(${Math.round(hueValue)}deg, 100%, 50%)`,
        }}
      ></span>
      <div
        id="hue"
        className={classes.knob}
        onMouseDown={handleMouseDown}
        style={{
          backgroundColor: mouseDown ? "#c2c2c2" : "#e2e2e2",
          height: knobRadius * 2,
          left: hueKnobPos.x,
          width: knobRadius * 2,
          top: hueKnobPos.y,
        }}
      />
      <div
        id="lightness"
        className={classes.knob}
        onMouseDown={handleMouseDown}
        style={{ width: knobRadius * 2, height: knobRadius * 2 }}
      />
    </div>
  );
};

export default React.memo(Canvas);
