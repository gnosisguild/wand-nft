import React from "react";

interface Props {
  x: number;
  y: number;
}

const Knob = ({ x, y }: Props) => {
  return (
    <>
      <g>
        <circle cx={x} cy={y} r="50" fill="url(#paint0_radial_901_4892)" />
        <circle cx={x} cy={y} r="40" fill="url(#paint1_radial_901_4892)" />
      </g>
      <defs>
        <radialGradient r="0.2" id="paint0_radial_901_4892">
          <stop stopColor="#EDECE7" />
          <stop offset="1" stopColor="#49473A" />
        </radialGradient>
        <radialGradient r="1.2" id="paint1_radial_901_4892">
          <stop stopColor="#EDECE7" />
          <stop offset="1" stopColor="#858272" />
        </radialGradient>
      </defs>
    </>
  );
};

export default Knob;
