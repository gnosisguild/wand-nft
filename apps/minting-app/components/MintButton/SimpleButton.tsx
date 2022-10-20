import styles from "./MintButton.module.css";
import { MintSvg } from "./index";

interface MintButtonProps {
  onClick?: any;
}

const MintButton: React.FC<MintButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.buttonContainer}>
      <MintSvg disabled={false} />
    </div>
  );
};

export default MintButton;
