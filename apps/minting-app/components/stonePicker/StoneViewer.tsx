import { useMemo } from "react";
import { Stone } from "../../types";
import styles from "./StonePicker.module.css";
const stoneTemplate = require("../../../../contracts/contracts/svg/partials/stone.hbs");

interface Props {
  settings: Stone;
}
const StoneViewer = ({ settings }: Props) => {
  const svgData = useMemo(() => {
    return btoa(
      unescape(
        encodeURIComponent(`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 3000"
    shapeRendering="geometricPrecision"
  >
    ${stoneTemplate(settings)}
    </svg>`)
      )
    );
  }, [settings]);

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`data:image/svg+xml;base64,${svgData}`}
      className={styles.stoneViewSvg}
      alt="stone"
    />
  );
};

export default StoneViewer;
