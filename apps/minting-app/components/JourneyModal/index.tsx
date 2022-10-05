import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import IconButton from "../IconButton";
import FrameImage from "./FrameImage";
import Modal from "../Modal";
import styles from "./JourneyModal.module.css";
import ZodiacIcon from "../../public/images/zodiac-icon.png";
import ZodiacEcosystem from "../../public/images/zodiac-ecosystem.png";
import Wand1 from "../../public/images/wand-1.png";
import Wand2 from "../../public/images/wand-2.png";
import Wand3 from "../../public/images/wand-3.png";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

interface ImageProps {
  paths?: StaticImageData[];
  animateIn?: string;
  persist?: boolean;
  reverse?: boolean;
}

interface FrameProps {
  text?: string;
  images?: ImageProps;
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
    images: {
      paths: [ZodiacIcon],
    },
  },
  {
    text: `The Wand NFTs are a portal to the Zodiac ecosystem. We hope you hold them in common.`,
  },
  {
    images: {
      paths: [ZodiacEcosystem],
    },
    text: `The Zodiac ecosystem has the open standard at its heart, supported by the tools and wiki.`,
    height: `70vh`,
  },
  {
    images: {
      paths: [ZodiacEcosystem],
      persist: true,
      animateIn: "#governed-by",
    },
    text: `The Wand NFTs govern the Zodiac ecosystem. However, holding a wand alone does not confer governance power.`,
    height: `70vh`,
  },
  {
    images: {
      paths: [ZodiacEcosystem],
      persist: true,
      animateIn: "#governed-by",
    },
    text: `With evolved wands, you can vote, curate the wiki, and administrate the tools repository.`,
    height: `70vh`,
  },
  {
    text: `To evolve your Wand NFT, you can contribute to the Zodiac ecosystem over time.

    This will be reflected in greater governance power attributed to your account.
    `,
  },
  {
    images: {
      paths: [Wand1, Wand2, Wand3],
      reverse: true,
    },
    text: `As well as an evolved wand…`,
    height: `70vh`,
  },
  {
    images: {
      paths: [Wand3],
      persist: true,
      reverse: true,
    },
    text: `You can choose to sell your evolved Wand NFT.`,
    height: `70vh`,
  },
  {
    text: `But you won’t be able to actively participate in Zodiac ecosystem governance until you hold a Wand NFT again.

    Also, your governance power won’t transfer with your  Wand NFT.

    Some powers can only be earned through experience…
    `,
  },
  {
    text: `So choose which account holds your Wand NFT wisely.

    For the full description of Zodiac ecosystem governance, visit [URL].
    `,
  },
];

const IncantationModal: React.FC<Props> = ({ onCancel }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  let [activeIndex, setActiveIndex] = useState<number>(0);

  const queueFrame = (direction: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setActiveIndex((activeIndex += direction));
    }, 750);
  };

  const prevSlide = () => {
    queueFrame(-1);
  };
  const nextSlide = () => {
    queueFrame(1);
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
          flexDirection: activeFrame.images?.reverse ? "column-reverse" : null,
        }}
      >
        {activeFrame?.images && (
          <div className={styles.imagesWrapper}>
            {activeFrame.images.paths?.map((image, i) => {
              const imageLen = activeFrame.images?.paths.length;
              return (
                <FrameImage
                  src={image.src}
                  alt={""}
                  style={{
                    width:
                      imageLen && imageLen > 0
                        ? `calc(${Math.floor(100 / imageLen)}% - 15px)`
                        : null,
                  }}
                  className={classnames(
                    styles.frameImage,
                    !activeFrame?.images?.persist && styles.animateIn,
                    isAnimating &&
                      !frames[activeIndex + 1]?.images?.persist &&
                      styles.animateOut
                  )}
                />
              );
            })}
          </div>
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
        <div className={styles.navigationFrame}>
          <svg
            viewBox="0 0 609 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.navigationGuilding}
          >
            <g>
              <path
                d="M519.316 24.5C519.316 37.4787 529.837 48 542.816 48C553.357 48 562.277 41.06 565.256 31.5M519.316 24.5C519.316 19.2545 521.035 14.4103 523.94 10.5M519.316 24.5H506M318.658 24.5L304.658 38.5L290.658 24.5L304.658 10.5L318.658 24.5ZM318.658 24.5H387M566.316 24.5H606L592 10.5H561.693M566.316 24.5C566.316 19.2545 564.597 14.4103 561.693 10.5M566.316 24.5C566.316 26.9378 565.945 29.289 565.256 31.5M561.693 10.5C557.41 4.73526 550.549 1 542.816 1C535.083 1 528.222 4.73526 523.94 10.5M523.94 10.5H479.5L465.5 24.5M465.5 24.5H387M465.5 24.5L458.5 31.5M465.5 24.5H506M387 24.5L373 38.5H451.5L458.5 31.5M458.5 31.5H499L506 24.5M565.256 31.5H592M90.0299 24.5C90.0299 37.4787 79.5086 48 66.5299 48C55.9891 48 47.0691 41.06 44.0901 31.5M90.0299 24.5C90.0299 19.2545 88.3112 14.4103 85.4063 10.5M90.0299 24.5H103.346M290.688 24.5H222.346M43.0299 24.5H3.3457L17.3457 10.5H47.6535M43.0299 24.5C43.0299 19.2545 44.7486 14.4103 47.6535 10.5M43.0299 24.5C43.0299 26.9378 43.4011 29.289 44.0901 31.5M47.6535 10.5C51.936 4.73526 58.7968 1 66.5299 1C74.2631 1 81.1238 4.73526 85.4063 10.5M85.4063 10.5H129.846L143.846 24.5M143.846 24.5H222.346M143.846 24.5L150.846 31.5M143.846 24.5H103.346M222.346 24.5L236.346 38.5H157.846L150.846 31.5M150.846 31.5H110.346L103.346 24.5M44.0901 31.5H17.3457M304.658 17.5L297.658 24.5L304.658 31.5L311.658 24.5L304.658 17.5Z"
                stroke="#D9D4AD"
                strokeOpacity="0.3"
                strokeWidth="2"
              />
            </g>
          </svg>
          <div className={classnames(styles.iconButton, styles.forwardButton)}>
            <IconButton
              icon="Forward"
              shadow
              onClick={isAnimating ? undefined : nextSlide}
            />
          </div>
          <div className={classnames(styles.iconButton, styles.backwardButton)}>
            <IconButton
              icon="Backward"
              shadow
              disabled={activeIndex === 0}
              onClick={isAnimating ? undefined : prevSlide}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IncantationModal;
