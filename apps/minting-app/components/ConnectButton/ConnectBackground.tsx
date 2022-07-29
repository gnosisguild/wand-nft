import React from "react";
import styles from "./ConnectButton.module.css";

const ConnectBackground: React.FC = () => {
  return (
    <svg
      viewBox="0 0 163 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.connectBackground}
    >
      <g>
        <path
          d="M13.8293 0.36377L0.600098 13.593L13.987 26.98H148.621L162.008 13.593L148.779 0.36377H13.8293Z"
          fill="#948F6B"
        />
      </g>
      <g style={{ mixBlendMode: "soft-light" }}>
        <path
          d="M3.71924 13.5938H0.602051L13.8364 0.367188L14.9536 2.35938L3.71924 13.5938Z"
          fill="#D9D9D9"
          fill-opacity="0.6"
        />
        <path
          d="M158.891 13.5938H162.008L148.774 0.367188L147.657 2.35938L158.891 13.5938Z"
          fill="#D9D9D9"
          fill-opacity="0.8"
        />
        <path
          d="M147.657 2.35938L148.774 0.367188H13.8364L14.9536 2.35938H147.657Z"
          fill="#D9D9D9"
        />
      </g>
      <g style={{ mixBlendMode: "multiply" }}>
        <path
          d="M3.71924 13.5972H0.602051L13.8364 26.8237L14.9536 24.8315L3.71924 13.5972Z"
          fill="#D9D9D9"
          fill-opacity="0.6"
        />
        <path
          d="M158.891 13.5972H162.008L148.774 26.8237L147.657 24.8315L158.891 13.5972Z"
          fill="#D9D9D9"
          fill-opacity="0.8"
        />
        <path
          d="M147.657 24.8315L148.774 26.8237H13.8364L14.9536 24.8315H147.657Z"
          fill="#D9D9D9"
        />
      </g>
    </svg>
  );
};

export default ConnectBackground;
