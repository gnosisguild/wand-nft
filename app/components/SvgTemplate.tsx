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
export interface EmbossLayer {
  lightType: string;
  surfaceScale: number;
  specConstant: number;
  specExponent: number;
  lightColor: string;
  pointX: number;
  pointY: number;
  pointZ: number;
  opacity: number;
  blurX: number;
  blurY: number;
  pointsAtX: number;
  pointsAtY: number;
  pointsAtZ: number;
  limitingConeAngle: number;
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
    rhythm: Boolean[];
  };
  handle: {
    handle0?: boolean;
    handle1?: boolean;
    handle2?: boolean;
    handle3?: boolean;
  };
  filter: {
    layers: EmbossLayer[];
  };
}

const SvgTemplate: React.FC<Props> = (props) => (
  <div
    dangerouslySetInnerHTML={{ __html: template(props) }}
    className={classes.container}
  />
);

export default React.memo(SvgTemplate);
