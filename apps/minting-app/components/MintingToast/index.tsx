import classNames from "classnames";
import React, { useEffect } from "react";
import { useAppContext } from "../../state";
import { MintStage } from "../../types";
import styles from "./Toast.module.css";

const MintingToast: React.FC = () => {
  const { state } = useAppContext();

  return state.stage !== MintStage.IDLE ? (
    <div className={styles.container}>
      <div
        className={classNames(
          styles.main,
          { [styles.success]: state.stage === MintStage.SUCCESS },
          { [styles.error]: state.stage === MintStage.ERROR }
        )}
      >
        <p className={styles.message}>{message(state.stage)}</p>
        <svg
          className={styles.frame}
          viewBox="0 0 680 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M75 143.165H605M75 149H605" />
          <path d="M75 6.83508H605M75 1H605" />
          <path d="M673.165 6.83508V1H679V6.83508H673.165ZM673.165 6.83508V75M673.165 6.83508H605M679 75V22.125L657.875 1H605" />
          <path d="M673.165 143.165H679V149H673.165V143.165ZM673.165 143.165H605M673.165 143.165V75M605 149H657.875L679 127.875V75" />
          <path d="M6.83508 143.165V149H1V143.165H6.83508ZM6.83508 143.165L6.83508 75M6.83508 143.165H75M1 75L1 127.875L22.125 149H75" />
          <path d="M1 61.5903V24.3403M1 61.5903L6.83508 55.7552M1 61.5903V75M61.5903 1H24.3403M61.5903 1L55.7552 6.83508M61.5903 1H75M1 24.3403V1H24.3403M1 24.3403H6.83508M24.3403 1V6.83508M24.3403 24.3403L31.2952 31.2952M24.3403 24.3403H6.83508M24.3403 24.3403V6.83508M31.2952 31.2952L55.7552 6.83508M31.2952 31.2952L6.83508 55.7552M6.83508 24.3403V55.7552M24.3403 6.83508H55.7552M75 6.83508H61.5903L47.9015 20.5239V47.9015H20.5239L6.83508 61.5903V75" />
          <circle cx="42" cy="42" r="2" />
        </svg>
      </div>
    </div>
  ) : null;
};

export default MintingToast;

function message(stage: MintStage) {
  if (MintStage.SIGNING === stage) {
    return "Awaiting signature...";
  } else if (MintStage.TRANSACTING === stage) {
    return "Awaiting transaction...";
  } else if (MintStage.SUCCESS === stage) {
    return "Success";
  } else if (MintStage.ERROR === stage) {
    return "Error";
  }
  return "";
}
