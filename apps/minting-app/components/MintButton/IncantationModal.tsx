import Modal from "../Modal";
import styles from "./MintButton.module.css";

interface Props {
  incantation: string;
  onClose: () => void;
  onChange: (nextIncantation: string) => void;
}

const IncantationModal: React.FC<Props> = ({
  incantation,
  onChange,
  onClose,
}) => (
  <Modal onClose={onClose}>
    <div className={styles.passwordModal}>
      <p>Enter your incantation</p>
      <input
        value={incantation}
        autoFocus
        placeholder="classup-known-illum"
        onClick={(e) => e.stopPropagation()}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
      <div className={styles.passwordHelper}>
        <p>Don&apos;t have one?</p>
        <p>Read about how to get one here.</p>
      </div>
    </div>
  </Modal>
);

export default IncantationModal;
