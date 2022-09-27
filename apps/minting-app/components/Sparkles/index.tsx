import React, { useEffect, useState } from "react";
import styles from "./Sparkles.module.css";
import * as Tone from "tone";

const Sparkle: React.FC = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!ready) {
      setReady(true);
      // setReady(Tone.Transport.state === "started");
    }
  }, []);

  const size = Math.random() * 10;
  const pos = {
    x: Math.random() * windowDimensions.width * 1.2 - 0.1,
    y: Math.random() * windowDimensions.height * 1.2 - 0.1,
  };
  const move = {
    x: `${Math.random() * 200 - 100}px`,
    y: `${Math.random() * 200 - 100}px`,
  };
  const opacity = 4 / size;
  const dur = Math.random() * 60 + 15;
  const delay = Math.random() * 2;
  return (
    <div
      className={styles.sparkleParent}
      style={
        {
          animationDuration: `${dur}s`,
          animationDelay: `${delay}s`,
          transition: "opacity 5s ease-in-out",
          opacity: ready ? 1 : 0,
          "--moveX": `${move.x}`,
          "--moveY": `${move.y}`,
        } as React.CSSProperties
      }
    >
      <div
        className={styles.sparkle}
        style={
          {
            animationDuration: `${dur / 3}s`,
            animationDelay: `${delay}s`,
            backgroundColor: `hsl(43,65%,${Math.random() * 60 + 30}%)`,
            filter: `blur(${size / 4}px)`,
            height: size,
            left: pos.x,
            opacity: 0,
            top: pos.y,
            width: size,
            "--opacity": opacity,
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};

const Sparkles: React.FC = () => {
  let numSparkles = 250;

  return (
    <div className={styles.wrapper}>
      {[...Array(numSparkles)].map((item, index) => (
        <Sparkle key={index} />
      ))}
    </div>
  );
};

export default React.memo(Sparkles);
