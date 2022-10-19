import styles from "./Modal.module.css";

interface ModalFrameProps {
  className: string;
}

const TopLeft: React.FC<ModalFrameProps> = ({ className }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 61.5903V24.3403M1 61.5903L6.83508 55.7552M1 61.5903V75M61.5903 1H24.3403M61.5903 1L55.7552 6.83508M61.5903 1H75M1 24.3403V1H24.3403M1 24.3403H6.83508M24.3403 1V6.83508M24.3403 24.3403L31.2952 31.2952M24.3403 24.3403H6.83508M24.3403 24.3403V6.83508M31.2952 31.2952L55.7552 6.83508M31.2952 31.2952L6.83508 55.7552M6.83508 24.3403V55.7552M24.3403 6.83508H55.7552M75 6.83508H61.5903L47.9015 20.5239V47.9015H20.5239L6.83508 61.5903V75"
        stroke="#d9d4ad"
        strokeWidth="2"
      />
      <circle cx="42" cy="42" r="2" />
    </svg>
  );
};
const BottomLeft: React.FC<ModalFrameProps> = ({ className }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.83508 68.1649V74H1V68.1649H6.83508ZM6.83508 68.1649L6.83508 0M6.83508 68.1649L75 68.1649M1 0L1 52.875L22.125 74H75"
        strokeWidth="2"
      />
    </svg>
  );
};
const TopRight: React.FC<ModalFrameProps> = ({ className }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M68.1649 6.83508V1H74V6.83508H68.1649ZM68.1649 6.83508V75M68.1649 6.83508H0M74 75V22.125L52.875 1H0"
        strokeWidth="2"
      />
    </svg>
  );
};
const BottomRight: React.FC<ModalFrameProps> = ({ className }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M68.1649 68.1649H74V74H68.1649V68.1649ZM68.1649 68.1649H0M68.1649 68.1649V0M0 74H52.875L74 52.875V0"
        strokeWidth="2"
      />
    </svg>
  );
};

const BorderY: React.FC<ModalFrameProps> = ({ className }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      width="8"
      height="440"
      viewBox="0 0 8 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 0V440M6.84 0V440" strokeWidth="2" />
    </svg>
  );
};
const BorderX: React.FC<ModalFrameProps> = ({ className }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      width="530"
      height="8"
      viewBox="0 0 530 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 6.83508H530M0 1H530" strokeWidth="2" />
    </svg>
  );
};

export const ModalFrames: React.FC = () => {
  return (
    <div className={styles.frame}>
      <TopLeft className={styles.topLeft} />
      <TopRight className={styles.topRight} />
      <BottomLeft className={styles.bottomLeft} />
      <BottomRight className={styles.bottomRight} />
      <BorderY className={styles.borderLeft} />
      <BorderY className={styles.borderRight} />
      <BorderX className={styles.borderTop} />
      <BorderX className={styles.borderBottom} />
    </div>
  );
};
