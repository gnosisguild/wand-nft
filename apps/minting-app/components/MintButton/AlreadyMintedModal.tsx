import { useAccount } from "wagmi";
import Modal from "../Modal";
import styles from "./MintButton.module.css";

interface Props {
  onClose: () => void;
}

const AlreadMintedModal: React.FC<Props> = ({ onClose }) => {
  const { address } = useAccount();
  return (
    <Modal onClose={onClose}>
      <div className={styles.passwordModal}>
        <p>Already minted</p>
      </div>
    </Modal>
  );
};

export default AlreadMintedModal;
