import styles from "./WandGrid.module.css";
import Link from "next/link";

type Props = {
  wands: [];
};

const WandGrid: React.FC<Props> = ({ wands }) => {
  return (
    <ul className={styles.wandGrid}>
      {wands.map((wand, i) => (
        <li key={i}>
          <Link href={`/wands/${i}`} passHref>
            <div className={styles.wandContainer}></div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default WandGrid;
