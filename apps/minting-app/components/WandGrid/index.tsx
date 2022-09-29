import styles from "./WandGrid.module.css";
import Link from "next/link";
import Image from "next/image";
import wandContract from "../../utils/contract";
import { useMemo } from "react";

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

const WandImage: React.FC<{
  tokenUri: string;
  tokenId: number;
  width: number;
}> = ({ tokenUri, tokenId, width }) => {
  const obj = useMemo(() => {
    const json = atob(tokenUri.slice("data:application/json;base64,".length));
    if (!json) return {};
    return JSON.parse(json);
  }, [tokenUri]);

  const { chainId, address } = wandContract;
  const filename = obj.name.toLowerCase().replace(/ /g, "-");
  const width2x = width * 2; // fetch file with 4x resolution for good results on retina displays
  return (
    <Image
      src={`https://nftgp.io/nft://${chainId}/${address}/${tokenId}/${filename}.jpg?width=${width2x}`}
      alt={obj.name}
      width={width}
      height={(width / 2) * 3}
      unoptimized
    />
  );
};

export default WandGrid;
