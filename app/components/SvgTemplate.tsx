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
    hue: number;
    bg0: boolean;
  };
  halo: {
    halo0?: boolean;
    halo1?: boolean;
    halo2?: boolean;
    halo3?: boolean;
    halo4?: boolean;
    halo5?: boolean;
    rhythm: Array<boolean>;
  };
  handle: {
    handle0?: boolean;
    handle1?: boolean;
    handle2?: boolean;
    handle3?: boolean;
  };
}

const SvgTemplate: React.FC<Props> = (props) => (
  <div
    dangerouslySetInnerHTML={{ __html: template(props) }}
    className={classes.container}
  />
);

export default React.memo(SvgTemplate);
