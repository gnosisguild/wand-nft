import classnames from "classnames";
import { useState } from "react";
import Modal from "../Modal";
import styles from "./JourneyModal.module.css";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

const IncantationModal: React.FC<Props> = ({ onCancel }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const handleClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 4000);
  };

  const frame1 = `These myths, however, are not merely stories, they are also design systems, supported by artefacts like glyphs, charts, and cards that carry their resemblance through time…`;

  return (
    <Modal onClose={() => console.log("close")} mainClass={styles.modalLg}>
      <div className={styles.journeyModal}>
        <div className={styles.animationWrapper}>
          {frame1.split(" ").map((word, i) => (
            <div
              style={{
                animationDelay: `${0.01 * i}s`,
              }}
              className={classnames(
                styles.animateText,
                isAnimating && styles.isAnimatingText
              )}
            >
              {word}
              {` `}
            </div>
          ))}
        </div>
        <img
          width="500"
          className={classnames(
            styles.animate,
            isAnimating && styles.isAnimating
          )}
          src="https://mirror-media.imgix.net/publication-images/xsC-WpXuJpb2za6KwQw-4.png?height=750&width=1500&h=750&w=1500&auto=compress"
        />
        <button onClick={handleClick}>Click me</button>
      </div>
    </Modal>
  );
};

export default IncantationModal;
