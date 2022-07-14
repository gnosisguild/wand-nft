import { useMemo } from "react";
import { stoneList } from "../../template";
import styles from "./StonePicker.module.css";
const stoneTemplate = require("../../../../contracts/contracts/svg/partials/stone.hbs");

const StoneViewer: React.FC<{
  seed: number;
  id: number;
}> = ({ seed, id }) => {
  const svgData = useMemo(() => {
    const stone = stoneList[id];
    return btoa(
      unescape(
        encodeURIComponent(`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2000 3000"
    shapeRendering="geometricPrecision"
  >
    ${stoneTemplate({ seed, stone })}
    </svg>`)
      )
    );
  }, [seed, id]);

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
