import { diff, VTree } from "virtual-dom";
import renderTemplateToVdom from "./renderTemplateToVdom";
const serializePatch = require("vdom-serialized-patch/serialize");

let vtree: VTree | undefined = undefined;

addEventListener("message", (event) => {
  const newVtree = renderTemplateToVdom(event.data);

  if (vtree) {
    const patch = diff(vtree, newVtree);
    postMessage(serializePatch(patch));
  }

  vtree = newVtree;
});

export {};
