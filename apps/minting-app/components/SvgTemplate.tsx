import React from "react";
import { Settings } from "../types";
import classes from "./SvgTemplate.module.css";
import template from "../../../contracts/contracts/svg/template.svg.hbs";

interface Props {
  settings: Settings;
}
const SvgTemplate: React.FC<Props> = (props) => (
  <div
    dangerouslySetInnerHTML={{
      __html: template(props.settings, {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }),
    }}
    className={classes.container}
  />
);

export default React.memo(SvgTemplate);
