import React, { useEffect, useRef, useState } from "react";
import classes from "./ColorPicker.module.css";

export const Canvas = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let ctx = canvasCtxRef.current;

  // State
  // let [hueValue, setHueValue] = useState({ x: 0, y: 0 });
  // let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // let [elementPosition, setElementPosition] = useState({x: circleOffset.left, y: circleOffset.top})

  // ----- CONFIG ----- //

  // Common
  const size = 200;
  const thickness = size / 20;
  const knobRadius = 15;
  // let pickerElement = document.querySelector(".circlePicker")
  // let circleOffset = {top: pickerElement?.offsetTop, left: pickerElement?.offsetLeft};
  let mouseDown = false;
  let knobType;

  // Hue
  const hueRadius = size / 2;
  let hueTarget = 180;
  let hueKnobPos = { x: 0, y: 0 };

  // Lightness
  const lightnessSize = size * 0.75;
  const lightnessRadius = lightnessSize / 2;
  const lightnessRange = [80, 40]; // Max lightness, Min lightness

  const updateSlider = () => {
    setHueKnobPosition();
    drawHueArc();
    drawLightnessArc();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log(e.target.id);
    mouseDown = true;
    knobType = e.target.id;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    mouseDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDown) {
      if (knobType === "hue") {
        // setHueValue();
      } else {
        // setLightnessPosition(event);
      }
    }
  };

  const setHueKnobPosition = () => {
    hueKnobPos.x =
      Math.round(hueRadius * Math.sin((hueTarget * Math.PI) / 180)) +
      hueRadius -
      knobRadius +
      4;
    hueKnobPos.y =
      Math.round(hueRadius * -Math.cos((hueTarget * Math.PI) / 180)) +
      hueRadius -
      knobRadius +
      4;
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

  // const setHueValue = (e: React.MouseEvent) => {
  //   let atan, hueTarget, val;
  //   setMousePosition = {
  //     x: e.pageX - elementPosition.x,
  //     y: e.pageY - elementPosition.y
  //   };
  //   atan = Math.atan2(mousePosition.x - hueRadius, mousePosition.y - hueRadius);
  //   hueTarget = -atan / (Math.PI / 180) + 180;

  //   hueValue = hueTarget;

  //   return hueValue
  //   };
  // }

  useEffect(() => {
    if (ref.current) {
      canvasCtxRef.current = ref.current.getContext("2d");
      ctx = canvasCtxRef.current;
      document
        .querySelector("body")
        ?.addEventListener("mouseup", handleMouseUp);

      updateSlider();
    }
  }, []);

  return (
    <div className={classes.colorPicker} style={{ width: size, height: size }}>
      <canvas ref={ref} width={size} height={size} />
      <span className={classes.value}></span>
      <div
        id="hue"
        className={classes.knob}
        unselectable="on"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{
          height: knobRadius * 2,
          left: hueKnobPos.x,
          width: knobRadius * 2,
          top: hueKnobPos.y,
        }}
      />
      <div
        id="lightness"
        className={classes.knob}
        unselectable="on"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{ width: knobRadius * 2, height: knobRadius * 2 }}
      />
    </div>
  );
};

export default React.memo(Canvas);
