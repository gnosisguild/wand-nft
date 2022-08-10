import React, { useMemo } from "react";
import { useAppContext } from "../state";
import {
  calculateAspects,
  calculatePlanets,
  filterLayers,
  generateHalo,
  generateHandle,
  interpolateStone,
  scaleAspects,
  scalePlanets,
  xp,
} from "../template";
import classes from "./SvgTemplate.module.css";
import useSeed from "./useSeed";
const template = require("../../../svg/template.svg.hbs");

const SvgTemplate: React.FC<{}> = () => {
  const { state } = useAppContext();
  const seed = useSeed();

  const planets = useMemo(
    () =>
      scalePlanets(
        calculatePlanets(state.latitude, state.longitude, 0, new Date())
      ),
    [state.latitude, state.longitude]
  );
  const aspects = useMemo(
    () =>
      scaleAspects(
        calculateAspects(state.latitude, state.longitude, 0, new Date())
      ),
    [state.latitude, state.longitude]
  );

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: template({
          planets,
          aspects,
          halo: generateHalo(
            state.halo.shape,
            state.halo.rhythm,
            state.background.color.hue
          ),
          frame: {
            level1: true,
            title: "",
          },
          background: state.background,
          filterLayers,
          sparkles: [],
          seed,
          stone: interpolateStone(state.stone),
          xp,
          handle: generateHandle(state.handle),
        }),
      }}
      className={classes.container}
    />
  );
};

export default SvgTemplate;
