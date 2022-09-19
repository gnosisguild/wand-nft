import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useHasMinted } from "../useHasMinted";
import styles from "./MintButton.module.css";
import { MintPermit, useWildcardPermit } from "./usePermit";

interface Props {
  onChange: (permit: MintPermit | null) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const IncantationModal: React.FC<Props> = ({
  onChange,
  onCancel,
  onSubmit,
}) => {
  const [incantation, setIncantation] = useState<string>("");
  const { permit, issuer } = useWildcardPermit(incantation);

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const isUsed = useHasMinted(issuer);
  const is404 = permit === null;
  const isValid = permit !== null;

  useEffect(() => {
    setShowWarning(false);
  }, [incantation]);

  useEffect(() => {
    onChange(permit);
  }, [permit]);

  return (
    <Modal onClose={onCancel}>
      <div className={styles.passwordModal}>
        <h2>Enter your incantation</h2>
        <div className={styles.passwordForm}>
          <input
            value={incantation}
            autoFocus
            placeholder="classup-known-illum"
            onClick={(e) => e.stopPropagation()}
            onChange={(event) => {
              setIncantation(event.target.value);
            }}
          />

          {showWarning && isUsed && (
            <p className={styles.passwordError}>Incantation already used</p>
          )}

          {showWarning && is404 && (
            <p className={styles.passwordError}>Invalid incantation</p>
          )}
        </div>

        <button
          onClick={() => {
            if (is404 || isUsed) {
              setShowWarning(true);
            }
            if (isValid && !isUsed) {
              onSubmit();
            }
          }}
        >
          Continue Minting
        </button>
        <div className={styles.passwordHelper}>
          <p>Don&apos;t have one?</p>
          <p>Read about how to get one here.</p>
        </div>
      </div>
    </Modal>
  );
};

export default IncantationModal;
