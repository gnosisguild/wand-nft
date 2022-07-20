import React from "react";
import { useDebounce } from "usehooks-ts";
import { TemplateInput } from "../types";
import classes from "./SvgTemplate.module.css";
const template = require("../../../contracts/contracts/svg/template.svg.hbs");

interface Props {
  input: TemplateInput;
}
const SvgTemplate: React.FC<Props> = (props) => {
  // const input = useDebounce<TemplateInput>(props.input, 100);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: template(props.input),
      }}
      className={classes.container}
    />
  );
};

export default React.memo(SvgTemplate);
