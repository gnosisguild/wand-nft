import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import useFadeIn from "../useFadeIn";
import styles from "./Sparkles.module.css";

export const Sparkles = () => {
  const [_, setFadeIn, fadeInClasses] = useFadeIn(300);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  const ref = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let ctx = canvasCtxRef.current;

  let start: number = 0;
  let elapsed: number = 0;

  function Circle(
    this: any,
    x: number,
    y: number,
    r: number,
    c: string,
    o: number,
    i: number
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.i = i + 1;
    this.o = o;
    this.duration = Math.random() * 0.01;

    this.dx = Math.random() - 0.5;
    this.dx *= Math.random() - 0.25;

    this.dy = Math.random() - 0.5;
    this.dy *= Math.random() - 0.25;

    this.draw = function () {
      if (ctx) {
        ctx?.beginPath();
        ctx!.fillStyle = `hsla(${this.c},${this.o}%)`;
        ctx?.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx?.fill();
      }
    };

    this.animate = function (elapsed: number) {
      this.dx += (Math.sin(elapsed + this.i * 200) * this.duration) / 100;
      this.dy += (Math.cos(elapsed + this.i * 200) * this.duration) / 100;
      this.x += this.dx;
      this.y += this.dy;
      const opacity =
        Math.sin(0.0002 * Math.sqrt(this.i) * elapsed) - 0.0001 * 16;

      this.o += opacity;

      if (this.x + this.r > windowSize.w || this.x - this.r < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.r > windowSize.h || this.y - this.r < 0) {
        this.dy = -this.dy;
      }

      this.draw();
    };
  }

  let balls: any = [];
  useEffect(() => {
    setFadeIn(true);
    const handleResize = () => {
      setWindowSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
      ctx!.clearRect(0, 0, windowSize.w, windowSize.h);
    };

    setWindowSize({
      w: window.innerWidth,
      h: window.innerHeight,
    });

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const update = (timestamp: number) => {
      if (start === 0 && timestamp) {
        start = timestamp;
      }
      elapsed = timestamp - start;

      ctx!.clearRect(0, 0, windowSize.w, windowSize.h);

      for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.animate(elapsed);
      }

      requestAnimationFrame(update);
    };

    balls = [];
    for (let i = 0; i < 150; i++) {
      let r = Math.random() * Math.round(windowSize.h / 200) + 1;
      let x = Math.random() * windowSize.w * 1.2 - 0.1;
      let y = Math.random() * windowSize.h * 1.2 - 0.1;
      let o = Math.random() * 60 + 5;
      let c = `${Math.random() * 65 + 18},35%,${Math.random() * 40 + 40}%`;
      balls.push(new (Circle as any)(x, y, r, c, o, i));
    }

    if (ref.current) {
      canvasCtxRef.current = ref.current.getContext("2d");
      ctx = canvasCtxRef.current;
      update(0);
    }
  }, [ref.current, windowSize]);

  return (
    <div className={classNames(styles.wrapper, fadeInClasses)}>
      <canvas ref={ref} width={windowSize.w} height={windowSize.h} />
    </div>
  );
};

export default React.memo(Sparkles);
