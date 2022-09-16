import { useState } from "react";
import Modal from "../Modal";
import styles from "./MintButton.module.css";
import { MintPermit, useWildcardPermit } from "./usePermit";

interface Props {
  onChange: (permit: MintPermit) => void;
  onClose: () => void;
}

const IncantationModal: React.FC<Props> = ({ onChange, onClose }) => {
  const [incantation, setIncantation] = useState<string>("");
  const permit = useWildcardPermit(incantation);

  const isValid = !!permit;

  return (
    <Modal onClose={onClose}>
      <div className={styles.passwordModal}>
        <p>Enter your incantation</p>
        <input
          value={incantation}
          autoFocus
          placeholder="classup-known-illum"
          onClick={(e) => e.stopPropagation()}
          onChange={(event) => {
            setIncantation(event.target.value);
          }}
        />
        <button
          onClick={() => {
            isValid && onChange(permit);
          }}
        >
          Submit
        </button>
        <div
          style={{
            width: 50,
            height: 50,
            background: isValid ? "green" : "red",
          }}
        />
        <div className={styles.passwordHelper}>
          <p>Don&apos;t have one?</p>
          <p>Read about how to get one here.</p>
        </div>
      </div>
    </Modal>
  );
};

export default IncantationModal;
