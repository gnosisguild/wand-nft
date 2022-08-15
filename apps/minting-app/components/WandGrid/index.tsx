import styles from "./WandGrid.module.css";
import Link from "next/link";

type Props = {
  wands: [];
};

const WandGrid: React.FC<Props> = ({ wands }) => {
  console.log(wands);
  return (
    <ul className={styles.wandGrid}>
      {wands.length > 0 &&
        wands
          .filter((uri) => uri !== null)
          .map((tokenUri, i) => (
            <li key={i}>
              <Link href={`/wands/${i}`} passHref>
                <div className={styles.wandContainer}>
                  <img src={getImageUri(tokenUri)} />
                </div>
              </Link>
            </li>
          ))}
    </ul>
  );
};

const getImageUri = (tokenUri: string) => {
  const json = atob(tokenUri.slice("data:application/json;base64,".length));
  if (!json) return "";
  const obj = JSON.parse(json);
  return obj.image;
};

export default WandGrid;
