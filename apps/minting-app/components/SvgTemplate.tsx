import React from "react";
import { TemplateInput } from "../types";
import classes from "./SvgTemplate.module.css";
const template = require("../../../contracts/contracts/svg/template.svg.hbs");

interface Props {
  input: TemplateInput;
}
const SvgTemplate: React.FC<Props> = (props) => (
  <div
    dangerouslySetInnerHTML={{
      __html: template(props.input, {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }),
    }}
    className={classes.container}
  />
);

export default React.memo(SvgTemplate);
