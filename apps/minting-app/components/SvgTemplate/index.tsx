import React, { useCallback, useEffect, useRef } from "react";
import { patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";
import { TemplateInput } from "../../types";
import classes from "./SvgTemplate.module.css";

interface Props {
  input: TemplateInput;
}
const SvgTemplate: React.FC<Props> = (props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    let rootNode: Element;
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));
    workerRef.current.onmessage = (evt) => {
      console.log("WebWorker Response", evt.data);

      const { tree, patches } = evt.data;
      if (tree) {
        rootNode = createElement(evt.data) as unknown as Element;
        console.log(rootNode);
        elementRef.current?.appendChild(rootNode);
      }
      if (patches) {
        rootNode = patch(rootNode, patches);
      }
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
