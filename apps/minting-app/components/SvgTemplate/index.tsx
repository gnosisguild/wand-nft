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
    const vtree = renderTemplateToVdom(initialInputRef.current);
    let rootNode = createElement(vtree as VNode);
    elementRef.current?.appendChild(rootNode);

    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));
    workerRef.current.onmessage = (evt) => {
      console.log("WebWorker Response", evt.data);
      rootNode = applyPatch(rootNode, evt.data);
      // const patched = evt.data;
      // if (tree) {
      //   rootNode = createElement(tree) as unknown as Element;
      //   console.log(rootNode);
      //
      // }
      // if (patches) {
      //   rootNode = patch(rootNode, patches);
      // }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  useEffect(() => {
    workerRef.current?.postMessage(props.input);
  }, [props.input]);

  return <div ref={elementRef} className={classes.container} />;
};

export default React.memo(SvgTemplate);
