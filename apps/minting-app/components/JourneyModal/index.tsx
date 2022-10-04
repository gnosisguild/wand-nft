import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./JourneyModal.module.css";
import ZodiacIcon from "../../public/images/zodiac-icon.png";
import ZodiacEcosystem from "../../public/images/zodiac-ecosystem.png";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

interface FrameProps {
  text?: string;
  image?: StaticImageData;
}

const frames = [
  {
    text: `Myths are resilient.`,
  },
  {
    text: `Take, for instance, the stories we tell ourselves about the stars.`,
  },
  {
    text: `The characters that accompany the constellations, like the Great Bear, the Bull, or the Seven Sisters, appear to pass easily from one generation to the next.`,
  },
  {
    text: `These myths, however, are not merely stories, they are also design systems, supported by artefacts like glyphs, charts, and cards that carry their resemblance through time…`,
  },
  {
    image: ZodiacIcon,
  },
  {
    text: `The Wand NFTs are a portal to the Zodiac ecosystem. We hope you hold them in common.`,
  },
  {
    image: ZodiacEcosystem,
    text: `The Zodiac ecosystem has the open standard at its heart, supported by the tools and wiki.`,
    height: `70vh`,
  },
];

const IncantationModal: React.FC<Props> = ({ onCancel }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  let [activeFrame, setActiveFrame] = useState<number>(0);

  const queueNextFrame = (delay = 1000) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setActiveFrame((activeFrame += 1));
    }, delay);
  };

  const handleClick = () => {
    queueNextFrame();
  };

  return (
    <Modal onClose={() => console.log("close")} maxWidth={"40vmax"}>
      <div
        className={styles.frameWrapper}
        style={{
          maxHeight: frames[activeFrame]?.height
            ? frames[activeFrame].height
            : undefined,
        }}
      >
        {frames.map((frame, i) => {
          if (activeFrame === i) {
            return (
              <>
                {frame.text && (
                  <div className={styles.frameTextWrapper}>
                    {frame.text.split(" ").map((word, j) => {
                      return (
                        <div
                          key={j}
                          style={{
                            "--fadeInDelay":
                              activeFrame === 0
                                ? `${0.75 + j * 0.03}s`
                                : `${0.03 * j}s`,
                            "--fadeOutDelay": `${
                              (0.03 * j) / j ? j * 0.03 : 0.03
                            }s`,
                          }}
                          className={classnames(
                            styles.frameText,
                            activeFrame === i &&
                              isAnimating &&
                              styles.animateOut,
                            activeFrame === i && styles.animateIn
                          )}
                        >
                          {word}
                        </div>
                      );
                    })}
                  </div>
                )}
                {frame.image && (
                  <img
                    className={classnames(
                      styles.frameImage,
                      activeFrame === i && isAnimating && styles.animateOut,
                      activeFrame === i && styles.animateIn
                    )}
                    src={frame.image.src}
                    alt=""
                  />
                )}
              </>
            );
          }
        })}
        <button
          className={styles.button}
          onClick={isAnimating ? undefined : handleClick}
          disabled={isAnimating}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default IncantationModal;
