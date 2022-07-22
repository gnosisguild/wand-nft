import VNode from "virtual-dom/vnode/vnode";
import VText from "virtual-dom/vnode/vtext";
import { diff, VTree } from "virtual-dom";

const template = require("../../../../contracts/contracts/svg/template.svg.hbs");

const htmlToVdom: (html: string) => VTree = require("html-to-vdom")({
  VNode: VNode,
  VText: VText,
});

let vtree: VTree | undefined = undefined;

addEventListener("message", (event) => {
  const html = template(event.data);
  const newVtree = htmlToVdom(html);

  if (!vtree) {
    // initial render
    postMessage({ tree: newVtree });
  } else {
    postMessage({ patches: diff(vtree, newVtree) });
  }

  vtree = newVtree;
});

export {};
