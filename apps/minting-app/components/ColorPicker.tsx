import React, { useEffect, useRef } from "react";

export const Canvas = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let ctx = canvasCtxRef.current;

  // ----- CONFIG ----- //

  // Common
  const size = 200;
  const thickness = size / 20;

  // Hue
  const hueRadius = size / 2;

  // Lightness
  const lightnessSize = size * 0.75;
  const lightnessRadius = lightnessSize / 2;
  const lightnessRange = [80, 40]; // Max lightness, Min lightness

  const updateSlider = () => {
    drawHueArc();
    drawLightnessArc();
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

  useEffect(() => {
    if (ref.current) {
      canvasCtxRef.current = ref.current.getContext("2d");
      ctx = canvasCtxRef.current;

      updateSlider();
    }
  }, []);

  return <canvas ref={ref} width={size} height={size} />;
};

export default React.memo(Canvas);
