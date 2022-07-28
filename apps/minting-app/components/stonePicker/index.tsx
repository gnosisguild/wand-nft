import React from "react";
import StoneViewer from "./StoneViewer";
import { interpolateStone, stoneList, stoneCount } from "../../template";
import styles from "./StonePicker.module.css";
import UiCircle from "../uiCircle";
import { useAppContext } from "../../state";
import IconButton from "../IconButton";
import StoneGlass from "./StoneGlass";
import {
  describeFillers,
  describeSegments,
  findSegmentCenters,
} from "../rhythm";
import StoneFilter from "./StoneFilter";
import assert from "assert";
import DragRotate from "../DragRotate";

const StonePicker: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const onChange = (nextValue: number) =>
    dispatch({
      type: "changeStone",
      value: Math.round(withoutSkew(nextValue) * 10),
    });

  return (
    <DragRotate value={0} onDragEnd={onChange}>
      {({ bind, rotation }) => (
        <div className={styles.container}>
          <div {...bind()} className={styles.drag}>
            <UiCircle rotation={rotation} showIndicator>
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
                        seed={state.tokenId}
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
              seed={state.tokenId}
              stone={interpolateStone(Math.round(withoutSkew(rotation) * 10))}
            />
            <StoneGlass />
          </div>
          <div className={styles.icon}>
            <IconButton icon="PickerStone" shadow />
          </div>
        </div>
      )}
    </DragRotate>
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

function withoutSkew(angle: number) {
  const step = 360 / stoneCount;
  return (angle + step * CONFIG.segment.percSkew) % 360;
}

function withSkew(angle: number) {
  const step = 360 / stoneCount;
  const result = angle - step * CONFIG.segment.percSkew;
  assert(result >= 0);
  return result;
}
