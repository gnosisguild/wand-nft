import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import Modal from "../Modal";
import { useHasMinted } from "../useHasMinted";
import styles from "./MintButton.module.css";
import { MintPermit, useWildcardPermit } from "./usePermit";

interface Props {
  onChange: (permit: MintPermit) => void;
  onClose: () => void;
}

const IncantationModal: React.FC<Props> = ({ onChange, onClose }) => {
  const [incantation, setIncantation] = useState<string>("");
  const { permit, issuer } = useWildcardPermit(incantation);

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const isUsed = useHasMinted(issuer);
  const is404 = permit === null;
  const isValid = permit !== null;

  useEffect(() => {
    setShowWarning(false);
  }, [incantation]);

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
            if (is404 || isUsed) {
              setShowWarning(true);
            }
            if (isValid && !isUsed) {
              onChange(permit);
            }
          }}
        >
          Submit
        </button>

        {showWarning && isUsed && <p>Already Used</p>}

        {showWarning && is404 && <p>Invalid Password</p>}

        {!showWarning && (
          <div className={styles.passwordHelper}>
            <p>Don&apos;t have one?</p>
            <p>Read about how to get one here.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default IncantationModal;
