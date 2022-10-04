import { useRef, useEffect } from "react";
import { ModalFrames } from "./ModalFrames";
import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  maxWidth?: number | string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, maxWidth = 400, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (e.target === ref.current) {
        onClose();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    const element = ref?.current;
    element?.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      element?.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.main} style={{ maxWidth: maxWidth }}>
        <ModalFrames />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
