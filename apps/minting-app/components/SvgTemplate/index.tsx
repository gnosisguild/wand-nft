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
  const elementRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker>();
  const initialInputRef = useRef<TemplateInput>(props.input);

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));
    workerRef.current.addEventListener("message", (evt) => {
      console.log("WebWorker Response", evt.data);
      applyPatch(elementRef.current?.firstElementChild, evt.data);
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const mountCallback = (element: HTMLDivElement | null) => {
    if (element && !elementRef.current) {
      // mounted
      elementRef.current = element;
      const vtree = renderTemplateToVdom(initialInputRef.current);
      console.log("mounted", vtree);
      element.appendChild(createElement(vtree as VNode));
    } else if (element) {
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
