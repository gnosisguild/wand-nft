import { StoneSettings } from "../SvgTemplate";
import styles from "./Settings.module.css";
import stoneTemplate from "../../../contracts/contracts/svg/partials/stone.hbs";
import { useMemo } from "react";

interface Props {
  settings: StoneSettings;
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
  console.log(`data:image/svg+xml;base64,${svgData}`);
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
