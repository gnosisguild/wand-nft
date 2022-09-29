import styles from "./WandGrid.module.css";
import Link from "next/link";

import WandImage from "../WandImage";

type Props = {
  wands: string[];
};

const WandGrid: React.FC<Props> = ({ wands }) => (
  <ul className={styles.wandGrid}>
    {wands.length > 0 &&
      wands
        .filter((uri) => uri !== null)
        .map((tokenUri, i) => (
          <li key={i}>
            <Link href={`/wands/${i}`} passHref>
              <div className={styles.wandContainer}>
                <WandImage tokenUri={tokenUri} tokenId={i} width={320} />
              </div>
            </Link>
          </li>
        ))}
  </ul>
);

export default WandGrid;
