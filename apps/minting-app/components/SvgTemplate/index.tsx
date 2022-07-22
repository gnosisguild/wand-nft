import React, { useEffect, useRef } from "react";
import createElement from "virtual-dom/create-element";
import { VNode } from "virtual-dom";
const applyPatch = require("vdom-serialized-patch/patch");
import { TemplateInput } from "../../types";
import classes from "./SvgTemplate.module.css";
import renderTemplateToVdom from "./renderTemplateToVdom";

interface Props {
  input: TemplateInput;
}

const SvgTemplate: React.FC<Props> = (props) => {
  // return null;
  const elementRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker>();
  const initialInputRef = useRef<TemplateInput>(props.input);

  const mountCallback = (element: HTMLDivElement | null) => {
    if (element && !elementRef.current) {
      // mounted
      console.log("mounted", element === elementRef.current);
      elementRef.current = element;
      const vtree = renderTemplateToVdom(initialInputRef.current);
      let rootNode = createElement(vtree as VNode);
      element.appendChild(rootNode);

      workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));
      workerRef.current.addEventListener("message", (evt) => {
        console.log("WebWorker Response", evt.data);
        // rootNode = applyPatch(rootNode, evt.data);
      });
    } else if (!element) {
      // unmounting
      workerRef.current?.terminate();
    } else {
      if (element !== elementRef.current) {
        throw new Error("Unexpectedly got different element");
      }
    }
  };

  useEffect(() => {
    console.log("post", props.input.background.color.hue, workerRef.current);
    workerRef.current?.postMessage(props.input);
  }, [props.input]);

  return <div ref={mountCallback} className={classes.container} />;
};

export default React.memo(SvgTemplate);
