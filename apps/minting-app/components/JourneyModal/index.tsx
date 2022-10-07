import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import IconButton from "../IconButton";
import FrameImage from "./FrameImage";
import Modal from "../Modal";
import { frames } from "./Frames";
import styles from "./JourneyModal.module.css";
import MintButton from "../MintButton";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

const IncantationModal: React.FC<Props> = ({ onCancel }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  let [activeIndex, setActiveIndex] = useState<number>(0);
  let [textWrapperHeight, setTextWrapperHeight] = useState<number>(0);

  const frameWrapperTextRef = useRef<any>(null);

  const animationDuration = 750; // in microseconds
  const wordDelay = 15; // in microseconds
  const activeFrame = frames[activeIndex];

  const queueFrame = (direction: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setActiveIndex((activeIndex += direction));
    }, animationDuration);
  };

  const prevSlide = () => {
    queueFrame(-1);
  };
  const nextSlide = () => {
    queueFrame(1);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (frameWrapperTextRef.current) {
      setTextWrapperHeight(frameWrapperTextRef.current?.clientHeight);
    }
  }, [frameWrapperTextRef.current]);

  return (
    <Modal onClose={() => console.log("close")} maxWidth={"730px"}>
      <>
        <div
          className={styles.frameWrapper}
          style={{
            maxHeight: frames[activeIndex]?.height
              ? frames[activeIndex].height
              : undefined,
            ["flexDirection" as any]: activeFrame.images?.reverse
              ? "column-reverse"
              : null,
          }}
        >
          {activeFrame?.images && (
            <div
              className={styles.imagesWrapper}
              style={{
                height: activeFrame.images?.imageHeight
                  ? activeFrame.images?.imageHeight
                  : undefined,
              }}
            >
              {activeFrame.images.paths?.map((image, i) => {
                const imageLen = activeFrame.images?.paths?.length;
                return (
                  <FrameImage
                    key={image.src}
                    src={image.src}
                    alt={""}
                    style={{
                      width:
                        imageLen && imageLen > 0
                          ? `calc(${Math.floor(100 / imageLen)}% - 15px)`
                          : "auto",
                      animationDelay:
                        imageLen && imageLen > 1
                          ? `${animationDuration + i * wordDelay * 10}ms`
                          : undefined,
                      opacity: activeFrame?.images?.persist ? 1 : 0,
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
              {activeFrame.images.svg && (
                <div
                  className={classnames(
                    styles.frameSVG,
                    !activeFrame?.images?.persist && styles.animateIn,
                    isAnimating &&
                      !frames[activeIndex + 1]?.images?.persist &&
                      styles.animateOut
                  )}
                  style={{
                    opacity: activeFrame?.images?.persist ? 1 : 0,
                  }}
                >
                  {activeFrame.images.svg}
                </div>
              )}
            </div>
          )}
          {activeFrame.text &&
            activeFrame.text.map((p, i) => (
              <div
                key={i}
                className={styles.frameTextWrapper}
                ref={frameWrapperTextRef}
                style={{
                  height:
                    textWrapperHeight && activeFrame.textHeight
                      ? textWrapperHeight * activeFrame.textHeight
                      : "unset",
                }}
              >
                {typeof p === "string" ? (
                  p.split(" ").map((word, j) => {
                    return (
                      <div
                        key={j}
                        style={{
                          ["--animationDuration" as any]: `${animationDuration}ms`,
                          ["--fadeInDelay" as any]:
                            activeIndex === 0
                              ? `${
                                  animationDuration + i * 300 + j * wordDelay
                                }ms`
                              : `${wordDelay * j + i * 300}ms`,
                          ["--fadeOutDelay" as any]: `${
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
                  })
                ) : (
                  <div
                    style={{
                      ["--animationDuration" as any]: `${animationDuration}ms`,
                      ["--fadeInDelay" as any]: `0.5s`,
                      ["--fadeOutDelay" as any]: `0s`,
                    }}
                    className={classnames(
                      styles.frameText,
                      isAnimating && styles.animateOut,
                      styles.animateIn
                    )}
                  >
                    {p}
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className={styles.progress}>
          {frames.map((_, i) => (
            <div
              key={i}
              className={classnames(
                styles.progressDot,
                activeIndex === i && styles.activeDot
              )}
            />
          ))}
        </div>
        <div
          className={classnames(styles.iconButton, styles.forwardButton)}
          style={{
            filter: !isAnimating ? "brightness(2)" : "brightness(1)",
            transitionDelay: !isAnimating ? `${animationDuration}ms` : "0s",
            opacity: `${activeIndex === frames.length - 1 ? 0.5 : "unset"}`,
            animation: `${
              activeIndex === frames.length - 1 ? undefined : "unset"
            }`,
          }}
        >
          <IconButton
            icon="Forward"
            shadow
            onClick={isAnimating ? undefined : nextSlide}
          />
        </div>
        <div
          className={classnames(styles.iconButton, styles.backwardButton)}
          style={{
            animation: `${activeIndex === 0 ? undefined : "unset"}`,
            opacity: activeIndex === 0 ? 0.5 : "unset",
          }}
        >
          <IconButton
            icon="Backward"
            shadow
            disabled={activeIndex === 0}
            onClick={isAnimating ? undefined : prevSlide}
          />
        </div>
        <div
          className={classnames(
            styles.buttonWrapper,
            activeIndex === frames.length - 1 && styles.animateIn
          )}
        >
          <MintButton />
        </div>
      </>
    </Modal>
  );
};

export default IncantationModal;
