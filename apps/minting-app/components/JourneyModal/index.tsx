import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import FrameImage from "./FrameImage";
import Modal from "../Modal";
import styles from "./JourneyModal.module.css";
import ZodiacIcon from "../../public/images/zodiac-icon.png";
import ZodiacEcosystem from "../../public/images/zodiac-ecosystem.png";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

interface ImageProps {
  path?: StaticImageData;
  animateIn?: string;
  persist?: boolean;
}

interface FrameProps {
  text?: string;
  image?: ImageProps;
  height?: string;
}

const frames: FrameProps[] = [
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
    image: { path: ZodiacIcon },
  },
  {
    text: `The Wand NFTs are a portal to the Zodiac ecosystem. We hope you hold them in common.`,
  },
  {
    image: {
      path: ZodiacEcosystem,
    },
    text: `The Zodiac ecosystem has the open standard at its heart, supported by the tools and wiki.`,
    height: `70vh`,
  },
  {
    image: {
      path: ZodiacEcosystem,
      persist: true,
      animateIn: "#governed-by",
    },
    text: `The Wand NFTs govern the Zodiac ecosystem. However, holding a wand alone does not confer governance power.`,
    height: `70vh`,
  },
  {
    image: {
      path: ZodiacEcosystem,
      persist: true,
      animateIn: "#governed-by",
    },
    text: `With evolved wands, you can vote, curate the wiki, and administrate the tools repository.`,
    height: `70vh`,
  },
];

const IncantationModal: React.FC<Props> = ({ onCancel }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  let [activeIndex, setActiveIndex] = useState<number>(0);

  const queueNextFrame = (delay = 1000) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setActiveIndex((activeIndex += 1));
    }, delay);
  };

  const handleClick = () => {
    queueNextFrame();
  };

  const wordDelay = 0.01;

  const activeFrame = frames[activeIndex];

  return (
    <Modal onClose={() => console.log("close")} maxWidth={"730px"}>
      <div
        className={styles.frameWrapper}
        style={{
          maxHeight: frames[activeIndex]?.height
            ? frames[activeIndex].height
            : undefined,
        }}
      >
        {activeFrame.image && (
          <FrameImage
            src={activeFrame?.image?.path.src}
            alt={""}
            className={classnames(
              styles.frameImage,
              !activeFrame?.image?.persist && styles.animateIn,
              isAnimating &&
                !frames[activeIndex + 1]?.image?.persist &&
                styles.animateOut
            )}
          />
        )}
        {activeFrame.text && (
          <div className={styles.frameTextWrapper}>
            {activeFrame.text.split(" ").map((word, j) => {
              return (
                <div
                  key={j}
                  style={{
                    "--fadeInDelay":
                      activeIndex === 0
                        ? `${0.75 + j * wordDelay}s`
                        : `${wordDelay * j}s`,
                    "--fadeOutDelay": `${
                      (wordDelay * j) / j ? j * wordDelay : wordDelay
                    }s`,
                  }}
                  className={classnames(
                    styles.frameText,
                    isAnimating && styles.animateOut,
                    styles.animateIn
                  )}
                >
                  {word}
                </div>
              );
            })}
          </div>
        )}
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
