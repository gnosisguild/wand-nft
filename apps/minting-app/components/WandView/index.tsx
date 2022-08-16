import styles from "./WandView.module.css";

interface Props {
  tokenUri: string;
}

const WandView: React.FC<Props> = ({ tokenUri }) => {
  return (
    <div className={styles.wandViewContainer}>
      <img src={getImageUri(tokenUri)} />
    </div>
  );
};
export default WandView;
const getImageUri = (tokenUri: string) => {
  const json = atob(tokenUri.slice("data:application/json;base64,".length));
  if (!json) return "";
  const obj = JSON.parse(json);
  return obj.image;
};
