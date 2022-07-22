import VNode from "virtual-dom/vnode/vnode";
import VText from "virtual-dom/vnode/vtext";
import { VTree } from "virtual-dom";
import { TemplateInput } from "../../types";

const template = require("../../../../contracts/contracts/svg/template.svg.hbs");

class VirtualSvgNode extends VNode {
  constructor(
    tagName: string,
    properties: VirtualDOM.VProperties,
    children: VTree[],
    key?: string,
    namespace?: string
  ) {
    super(
      tagName,
      properties,
      children,
      key,
      namespace || "http://www.w3.org/2000/svg"
    );
  }
  type = "VirtualNode";
}
// function VirtualSvgNode(
//   tagName: string,
//   properties: any,
//   children: any,
//   key: any,
//   namespace: string
// ) {
//   return VNode(
//     tagName,
//     properties,
//     children,
//     key,
//     "http://www.w3.org/2000/svg"
//   );
// }
// VirtualSvgNode.prototype.version = VNode.prototype.version;
// VirtualSvgNode.prototype.type = "VirtualNode";

const htmlToVdom: (html: string) => VTree = require("html-to-vdom")({
  VNode: VirtualSvgNode,
  VText: VText,
});

const renderTemplateToVdom = (input: TemplateInput) => {
  const html = template(input);
  return htmlToVdom(html);
};

export default renderTemplateToVdom;
