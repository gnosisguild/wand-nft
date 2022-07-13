import React from "react";

const RadialIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        style={{ mixBlendMode: "color-dodge" }}
        cx="5"
        cy="5"
        r="4.76562"
        stroke="#D9D4AD"
        strokeWidth="0.25"
      />
      <circle
        style={{ mixBlendMode: "color-dodge" }}
        cx="5"
        cy="5"
        r="3.5"
        stroke="#D9D4AD"
        strokeWidth="0.75"
      />
      <circle
        style={{ mixBlendMode: "color-dodge" }}
        cx="5"
        cy="5"
        r="1.5"
        stroke="#D9D4AD"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default RadialIcon;
