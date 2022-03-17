import { useState } from "react";
import styles from "./Settings.module.css";

type Props = {
  title: string;
  wide?: boolean;
};

const CollapseContainer: React.FC<Props> = ({ children, title, wide }) => {
  const [minimized, setMinimized] = useState(false);
  return (
    <div className={`${styles.settingContainer} ${wide && styles.fullWidth}`}>
      <div className={styles.layerHeader}>
        <h3>{title}</h3>
        <button
          onClick={() => {
            setMinimized(!minimized);
          }}
        >
          {minimized ? "↓" : "↑"}
        </button>
      </div>
      {!minimized && <>{children}</>}
    </div>
  );
};

export default CollapseContainer;
