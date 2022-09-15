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
    if (ref && ref.current) {
      const el = ref.current;
      el.addEventListener("click", handleClick);

      return () => {
        el.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const handleClick = (e: Event) => {
    if (e.target === ref.current) {
      handleClose();
    }
  };

  return (
    <>
      {show ? (
        <div className={styles.container} ref={ref}>
          <div className={styles.main}>{children}</div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
