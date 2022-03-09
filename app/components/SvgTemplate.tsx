import React from "react";
import classes from "./SvgTemplate.module.css";
import template from "../../contracts/contracts/svg/template.svg.hbs";

const SvgTemplate: React.FC = (props) => (
  <div
    dangerouslySetInnerHTML={{ __html: template(props) }}
    className={classes.container}
  />
);

export default React.memo(SvgTemplate);
