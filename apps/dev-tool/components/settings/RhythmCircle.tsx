import styles from "./Settings.module.css";

interface Props {
  rhythm: string;
  setRhythm: (value: string) => void;
}

const RhythmCircle: React.FC<Props> = ({ rhythm, setRhythm }) => {
  const onCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.checked;
    const currentRhythmLength = rhythm.length;

    // fill boolean array
    let tempArray = Array.from(
      { length: 24 },
      (v, i) => rhythm[i % rhythm.length] !== "0"
    );

    // replace checkbox value
    tempArray[index] = value;

    // remove non-controlled values
    if (index >= rhythm.length) {
      tempArray = tempArray.slice(0, index + 1);
    } else {
      tempArray = tempArray.slice(0, rhythm.length);
    }

    // sets rhythm to string
    setRhythm(
      tempArray.reverse().reduce((prev, curr) => (curr ? "1" : "0") + prev, "")
    );
  };
  return (
    <div>
      <h4>Rhythm Circle</h4>
      <div className={styles.rhythmContainer}>
        <ul>
          {Array.from({ length: 24 }, (v, i) => {
            return {
              checked: rhythm[i % rhythm.length] !== "0",
              controlled: i < rhythm.length,
            };
          }).map((rhythmEl, index) => (
            <li
              className={styles.rhythmCheck}
              key={`rhythm-${index}`}
              style={{ transform: `rotate(${index * 15}deg)` }}
            >
              <input
                type="checkbox"
                checked={rhythmEl.checked}
                className={rhythmEl.controlled ? "" : styles.uncontrolled}
                onChange={(e) => onCheckChange(e, index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RhythmCircle;
