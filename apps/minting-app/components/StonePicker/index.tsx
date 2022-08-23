import React from "react";
import classNames from "classnames";

import { useAppContext } from "../../state";
import { randomStone } from "../../utils/randomizer";
import {
  describeFillers,
  describeSegments,
  findSegmentCenters,
} from "../../utils/rhythm";
import { interpolateStone, stoneList, stoneCount } from "../../mimicking";

import UiCircle from "../UiCircle";
import useDragRotateAnimate from "../useDragRotateAnimate";
import useSeed from "../useSeed";

import styles from "./StonePicker.module.css";
import StoneGlass from "./StoneGlass";
import StoneFilter from "./StoneFilter";
import StoneViewer from "./StoneViewer";
import IconButton from "../IconButton";
import { toStoneId } from "../../state/transforms/transformRotations";

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const seed = useSeed();

  const {
    bind,
    hovering,
    dragging,
    rotation: { transform, value: rotation },
  } = useDragRotateAnimate<HTMLDivElement>(state.stone, (nextRotation) => {
    dispatch({
      type: "changeStone",
      value: nextRotation,
    });
  });

  return (
    <div
      className={classNames(styles.container, { [styles.grabbing]: dragging })}
    >
      <div {...bind()} className={styles.drag}>
        <UiCircle
          showIndicator
          rotation={transform}
          dialClass={classNames(styles.dimDial, {
            [styles.hovering]: hovering,
          })}
        >
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            className={styles.haloSegmentSvg}
          >
            <circle
              cy="500"
              cx="500"
              r="475"
              stroke="#D9D4AD"
              strokeWidth="16"
              fill="none"
              opacity="0.7"
              style={{ mixBlendMode: "color-dodge" }}
            />
            {segments.map((d, index) => (
              <g key={`${index}`}>
                <clipPath id={`stone-clip-${index}`}>
                  <path d={d} />
                </clipPath>
                <g clipPath={`url(#stone-clip-${index})`}>
                  <StoneFilter
                    seed={seed}
                    stone={stoneList[index]}
                    filterUniqueId={`stone-segment-${index}`}
                  />
                </g>
              </g>
            ))}
            {fillers.map((d, index) => (
              <path
                key={index}
                d={d}
                fill="#D9D4AD"
                opacity="0.7"
                style={{ mixBlendMode: "color-dodge" }}
              />
            ))}
            {segmentCenters.map(({ x, y }, index) => (
              <g key={index} clipPath={`url(#stone-clip-${index})`}>
                <circle
                  cx={x}
                  cy={y}
                  r={300}
                  filter={`url(#stone-segment-${index})`}
                  style={{
                    transform: "scale(0.15)",
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />

                <path d={segments[index]} fill="rgba(200,200,200,0.4)" />
              </g>
            ))}
          </svg>
        </UiCircle>
      </div>
      <div className={styles.stone}>
        <StoneViewer
          seed={seed}
          stone={interpolateStone(toStoneId(rotation))}
        />
        <StoneGlass />
      </div>
      <div className={styles.icon}>
        <IconButton
          icon="PickerStone"
          shadow
          onClick={() =>
            dispatch({
              type: "changeStone",
              value: randomStone(),
            })
          }
        />
      </div>
    </div>
  );
};

export default StonePicker;

const VIEWBOX_SIZE = 1000;

const CONFIG = {
  segment: {
    percBorder: 0.041,
    percThickness: 0.048,
    percSkew: 0.5,
    gapInDegrees: 2,
    viewBoxSize: VIEWBOX_SIZE,
  },
  filler: {
    percBorder: 0.031,
    percThickness: 0.07,
    percSkew: 0.5,
    spanInDegrees: 1,
    viewBoxSize: VIEWBOX_SIZE,
  },
  pointer: {
    percBorder: 0.037,
    percThickness: 0.054,
    viewBoxSize: VIEWBOX_SIZE,
  },
};

const segments = describeSegments(stoneCount, CONFIG.segment);
const fillers = describeFillers(stoneCount, CONFIG.filler);
const segmentCenters = findSegmentCenters(stoneCount, CONFIG.segment);
