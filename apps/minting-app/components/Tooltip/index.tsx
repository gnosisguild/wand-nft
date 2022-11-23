import Tippy, { TippyProps } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Tooltip = (props: TippyProps) => {
  return (
    <Tippy animation="fade" duration={[1000, 200]} {...props}>
      <div>{props.children}</div>
    </Tippy>
  );
};

export default Tooltip;
