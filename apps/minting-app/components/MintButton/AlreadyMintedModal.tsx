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
        <h2>Account already minted.</h2>
        <div className={styles.passwordHelper}>
          <p>Want to mint another Wand?</p>
          <p>Read about how to get an incantation here.</p>
        </div>
      </div>
    </Modal>
  );
};

export default AlreadMintedModal;
