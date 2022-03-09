import React from "react";
import classes from "./SvgTemplate.module.css";
import template from "../../contracts/contracts/svg/template.svg.hbs";

interface Planet {
  x: number;
  y: number;
}
interface Aspect {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface Props {
  title: string;
  starsSeed: number;
  planets: Planet[];
  aspects: Aspect[];
  background: {
    bg0: boolean;
  };
}

const SvgTemplate: React.FC<Props> = (props) => (
  <div
    dangerouslySetInnerHTML={{ __html: template(props) }}
    className={classes.container}
  />
);

export default React.memo(SvgTemplate);
