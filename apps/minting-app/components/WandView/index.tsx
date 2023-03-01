import WandImage from "../WandImage";
import { WandTokenData } from "../../types";
import styles from "./WandView.module.css";

interface Props {
  tokenUri: string;
  tokenId: string;
}

const WandView: React.FC<Props> = ({ tokenUri, tokenId }) => {
  const info = getDataFromUri(tokenUri);
  return (
    <div className={styles.wandViewContainer}>
      <div className={styles.wandView}>
        <WandImage tokenUri={tokenUri} tokenId={tokenId} width={320} />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{info.name}</h1>
        <ul>
          {info.attributes.map((attribute, i) => (
            <li key={`attr-${i}`} className={styles.attribute}>
              <div className={styles.attributeName}>{attribute.trait_type}</div>
              <div className={styles.attributeValue}>
                {attribute.display_type === "date"
                  ? new Date(attribute.value * 1000).toLocaleDateString("en-uk")
                  : attribute.value}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default WandView;

const getDataFromUri = (tokenUri: string): WandTokenData => {
  const buff = Buffer.from(
    tokenUri.slice("data:application/json;base64,".length),
    "base64"
  );
  const json = buff.toString("utf-8");
  console.log("json", json);
  if (!json) return {} as WandTokenData;
  return JSON.parse(json);
};
