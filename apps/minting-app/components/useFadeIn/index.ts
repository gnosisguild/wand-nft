import { useEffect, useState } from "react";

import styles from "./FadeIn.module.css";

const useFadeIn = (
  delayMilli: number
): [
  boolean | undefined,
  React.Dispatch<React.SetStateAction<boolean>>,
  string
] => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const revealTimer = setTimeout(() => {
        setVisible(true);
      }, delayMilli);

      return () => clearTimeout(revealTimer);
    }
  });

  const classes = visible ? styles.fadeIn : styles.hidden;

  return [show, setShow, classes];
};

export default useFadeIn;
