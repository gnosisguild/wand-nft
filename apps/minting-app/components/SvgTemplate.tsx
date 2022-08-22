import React,  from "react";
import { useAppContext } from "../state";
import { transformForRendering } from "../state/transforms/forRendering";

import classes from "./SvgTemplate.module.css";
import useSeed from "./useSeed";
const template = require("../../../svg/template.svg.hbs");

const SvgTemplate: React.FC<{}> = () => {
  const { state } = useAppContext();
  const seed = useSeed();

  // const planets = useMemo(
  //   () =>
  //     scalePlanets(
  //       calculatePlanets(state.latitude, state.longitude, 0, new Date())
  //     ),
  //   [state.latitude, state.longitude]
  // );
  // const aspects = useMemo(
  //   () =>
  //     scaleAspects(
  //       calculateAspects(state.latitude, state.longitude, 0, new Date())
  //     ),
  //   [state.latitude, state.longitude]
  // );

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: template(transformForRendering(state, seed)),
      }}
      className={classes.container}
    />
  );
};

export default SvgTemplate;
