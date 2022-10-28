import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../state";
import { normalizeAngle } from "../../state/transforms/transformRotations";
import classnames from "classnames";
import * as Tone from "tone";
import uiCircleBg from "../UiCircle/uiCirclebg.jpg";
import styles from "./IconButton.module.css";
import {
  Light,
  Dark,
  Radial,
  Linear,
  PickerAura,
  PickerStone,
  PickerHalo,
  Halo0,
  Halo1,
  Halo2,
  Halo3,
  Halo4,
  Halo5,
  SoundOff,
  SoundOn,
  FullDownload,
  Intro,
  Forward,
  Backward,
  PfpDownload,
} from "./Icons";
import { mapValue } from "../../utils/mapValue";

interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
  shadow?: boolean;
  thickBorder?: boolean;
  active?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  icon:
    | "Light"
    | "Dark"
    | "Radial"
    | "Linear"
    | "Halo0"
    | "Halo1"
    | "Halo2"
    | "Halo3"
    | "Halo4"
    | "Halo5"
    | "PickerAura"
    | "PickerStone"
    | "PickerHalo"
    | "SoundOff"
    | "SoundOn"
    | "PfpDownload"
    | "FullDownload"
    | "Intro"
    | "Forward"
    | "Backward";
}

const IconButton: React.FC<Props> = ({
  onClick,
  shadow = false,
  icon = "light",
  thickBorder = false,
  active = false,
  isLoading = false,
  disabled = false,
}) => {
  const { state } = useAppContext();
  const [note, setNote] = useState<string>("C");
  const synthRef = useRef<Tone.Synth>();
  const iconSwitch = (iconName: string) => {
    switch (iconName) {
      case "Light":
        return <Light />;
      case "Dark":
        return <Dark />;
      case "Radial":
        return <Radial />;
      case "Linear":
        return <Linear />;
      case "Halo0":
        return <Halo0 />;
      case "Halo1":
        return <Halo1 />;
      case "Halo2":
        return <Halo2 />;
      case "Halo3":
        return <Halo3 />;
      case "Halo4":
        return <Halo4 />;
      case "Halo5":
        return <Halo5 />;
      case "PickerAura":
        return <PickerAura />;
      case "PickerStone":
        return <PickerStone />;
      case "PickerHalo":
        return <PickerHalo />;
      case "SoundOff":
        return <SoundOff />;
      case "SoundOn":
        return <SoundOn />;
      case "PfpDownload":
        return <PfpDownload />;
      case "FullDownload":
        return <FullDownload />;
      case "Intro":
        return <Intro />;
      case "Forward":
        return <Forward />;
      case "Backward":
        return <Backward />;
      default:
        return <Light />;
    }
  };

  useEffect(() => {
    const auraFreq = normalizeAngle(state.background.color.hue);
    const baseFreq = Tone.Frequency(auraFreq).toNote().charAt(0);
    setNote(baseFreq);
  }, [state.background.color.hue]);

  useEffect(() => {
    synthRef.current = new Tone.Synth({
      volume: -15,
      envelope: {
        attack: 0.3,
        decay: 0.5,
      },
    });

    // const reverb = new Tone.Reverb({
    //   decay: 2,
    //   wet: 0,
    // });

    // const filter = new Tone.Filter(`${note}8`, "lowpass", -96);

    // const lfo = new Tone.LFO(
    //   3,
    //   Tone.Frequency(`${note}1`).toFrequency(),
    //   Tone.Frequency(`${note}8`).toFrequency()
    // );

    // lfo.connect(filter.frequency);

    synthRef.current?.chain(Tone.Destination);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
    if (state.soundOn) {
      synthRef.current?.frequency.rampTo(`${note}8`, 0.02);
      synthRef.current?.triggerAttackRelease(`${note}3`, 0.11);
    }
    // synthRef.current?.triggerAttackRelease(`C#${note}`, 0.05);
  };

  return (
    <div
      className={classnames(
        styles.iconButton,
        { [styles.shadow]: shadow },
        { [styles.active]: active },
        { [styles.disabled]: disabled }
      )}
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.iconButtonSvg}
      >
        {!shadow && (
          <circle cx="16.5" cy="16.5" r="16" fill="rgba(0,0,0,0.6)" />
        )}
        <g
          style={{ mixBlendMode: "color-dodge" }}
          opacity="0.6"
          className={styles.activeIndicator}
        >
          <circle
            cx="16.5"
            cy="16.5"
            r="15.75"
            stroke="#D9D4AD"
            strokeWidth="2"
          />
        </g>
        <path
          d="M30.6376 16.5127C30.6376 24.3137 24.3136 30.6377 16.5126 30.6377C8.71155 30.6377 2.38757 24.3137 2.38757 16.5127C2.38757 8.71167 8.71155 2.3877 16.5126 2.3877C24.3136 2.3877 30.6376 8.71167 30.6376 16.5127Z"
          fill="url(#pattern0)"
        />
        {thickBorder ? (
          <circle
            cx="16.5"
            cy="16.5"
            r="12.2"
            stroke="#D9D4AD"
            strokeOpacity="0.6"
            strokeWidth="3.6"
            style={{ mixBlendMode: "color-dodge" }}
          />
        ) : (
          <circle
            cx="16.5"
            cy="16.5"
            r="13.1"
            stroke="#D9D4AD"
            strokeOpacity="0.6"
            strokeWidth="2"
            style={{ mixBlendMode: "color-dodge" }}
          />
        )}
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#buttonComp"
              transform="translate(-0.0166667) scale(0.00123457)"
            />
          </pattern>
          <image
            id="buttonComp"
            width="837"
            height="810"
            href={uiCircleBg.src}
          />
        </defs>
      </svg>

      {isLoading ? (
        <div className={styles.loadingAnimation}></div>
      ) : (
        <div className={classnames(styles.iconContainer, styles[icon])}>
          {iconSwitch(icon)}
        </div>
      )}
    </div>
  );
};

export default IconButton;
