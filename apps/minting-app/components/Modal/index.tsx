import { useRef, useEffect } from "react";
import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  handleClose: () => void;
  show: boolean;
}

const Modal: React.FC<Props> = ({ children, show = false, handleClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupFunc = () => {};
    const handleClick = (e: Event) => {
      console.log("click");
      if (e.target === ref.current) {
        handleClose();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    if (ref && ref.current) {
      const el = ref.current;
      el.addEventListener("click", handleClick);

      cleanupFunc = () => {
        el.removeEventListener("click", handleClick);
      };
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      cleanupFunc();
    };
  }, []);

  return (
    <>
      {show ? (
        <div className={styles.container} ref={ref}>
          <div className={styles.main}>
            <svg
              viewBox="0 0 680 590"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.frame}
            >
              <path d="M673.165 75V515M679 75V515" />
              <path d="M75 583.165H605M75 589H605" />
              <path d="M75 6.83508H605M75 1H605" />
              <path d="M6.83508 75V515M1 75V515" />
              <path d="M673.165 6.83508V1H679V6.83508H673.165ZM673.165 6.83508V75M673.165 6.83508H605M679 75V22.125L657.875 1H605" />
              <path d="M673.165 583.165H679V589H673.165V583.165ZM673.165 583.165H605M673.165 583.165V515M605 589H657.875L679 567.875V515" />
              <path d="M6.83508 583.165V589H1V583.165H6.83508ZM6.83508 583.165L6.83508 515M6.83508 583.165H75M1 515L1 567.875L22.125 589H75" />
              <path d="M1 61.5903V24.3403M1 61.5903L6.83508 55.7552M1 61.5903V75M61.5903 1H24.3403M61.5903 1L55.7552 6.83508M61.5903 1H75M1 24.3403V1H24.3403M1 24.3403H6.83508M24.3403 1V6.83508M24.3403 24.3403L31.2952 31.2952M24.3403 24.3403H6.83508M24.3403 24.3403V6.83508M31.2952 31.2952L55.7552 6.83508M31.2952 31.2952L6.83508 55.7552M6.83508 24.3403V55.7552M24.3403 6.83508H55.7552M75 6.83508H61.5903L47.9015 20.5239V47.9015H20.5239L6.83508 61.5903V75" />
              <circle cx="42" cy="42" r="2" />
            </svg>

            <div className={styles.content}>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
