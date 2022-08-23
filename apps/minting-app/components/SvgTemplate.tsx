import React from "react";
import { useAppContext } from "../state";
import { transformForRendering } from "../state/transforms/forRendering";

import classes from "./SvgTemplate.module.css";
import useSeed from "./useSeed";
const template = require("../../../svg/template.svg.hbs");

const SvgTemplate: React.FC<{}> = () => {
  const { state } = useAppContext();
  const seed = useSeed();

  return (
    <div
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{
        __html: template(transformForRendering(state, seed)),
      }}
      className={classes.container}
    />
  );
};

export default SvgTemplate;
