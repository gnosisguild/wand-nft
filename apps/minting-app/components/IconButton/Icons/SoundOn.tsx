import React from "react";
import styles from "../IconButton.module.css";

const SoundOn: React.FC = () => {
  return (
    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style={{ mixBlendMode: "color-dodge" }}>
        <path
          className={styles.soundOnAnimation}
          style={{ "--soundDelay": `0.0s` }}
          d="M1.25 3V7"
          stroke="#D9D4AD"
          strokeWidth="0.75"
        />
        <path
          className={styles.soundOnAnimation}
          style={{ "--soundDelay": `0.8s` }}
          d="M2.75 3L2.75 7"
          stroke="#D9D4AD"
          strokeWidth="0.75"
        />
        <path
          className={styles.soundOnAnimation}
          style={{ "--soundDelay": `0.4s` }}
          d="M4.25 3L4.25 7"
          stroke="#D9D4AD"
          strokeWidth="0.75"
        />
        <path
          className={styles.soundOnAnimation}
          style={{ "--soundDelay": `1s` }}
          d="M5.75 3L5.75 7"
          stroke="#D9D4AD"
          strokeWidth="0.75"
        />
        <path
          className={styles.soundOnAnimation}
          style={{ "--soundDelay": `0.2s` }}
          d="M7.25 3L7.25 7"
          stroke="#D9D4AD"
          strokeWidth="0.75"
        />
        <path
          className={styles.soundOnAnimation}
          style={{ "--soundDelay": `0.6s` }}
          d="M8.75 3L8.75 7"
          stroke="#D9D4AD"
          strokeWidth="0.75"
        />
      </g>
    </svg>
    // <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <g style={{ mixBlendMode: "color-dodge" }}>
    //     <path d="M1.25 4V6" stroke="#D9D4AD" strokeWidth="0.75" />
    //     <path
    //       d="M2.75 4.46875L2.75 5.53101"
    //       stroke="#D9D4AD"
    //       strokeWidth="0.75"
    //     />
    //     <path
    //       d="M4.25 3.40625L4.25 6.59351"
    //       stroke="#D9D4AD"
    //       strokeWidth="0.75"
    //     />
    //     <path
    //       d="M5.75 2.46875L5.75 7.53101"
    //       stroke="#D9D4AD"
    //       strokeWidth="0.75"
    //     />
    //     <path
    //       d="M7.25 3.0625L7.25 6.93726"
    //       stroke="#D9D4AD"
    //       strokeWidth="0.75"
    //     />
    //     <path
    //       d="M8.75 4.65625L8.75 5.34351"
    //       stroke="#D9D4AD"
    //       strokeWidth="0.75"
    //     />
    //   </g>
    // </svg>
  );
};

export default SoundOn;
