import { DependencyList, EffectCallback, useEffect, useState } from "react";
import styles from "./Settings.module.css";

interface Location {
  latitude: number;
  longitude: number;
}

interface Props {
  value: Location | undefined;
  onChange(value: Location | undefined): void;
}

const defaultLocation = fetch("https://ipapi.co/json/")
  .then((res) => res.json())
  .then((json) => ({ latitude: json.latitude, longitude: json.longitude }));

const LocationInput: React.FC<Props> = ({ value, onChange }) => {
  const [q, setQ] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!value) {
      defaultLocation.then((loc) => {
        if (!value) onChange(loc);
      });
    }
  }, [value, onChange]);

  const search = () => {
    if (q) {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.length > 0) {
            onChange({
              latitude: parseFloat(json[0].lat),
              longitude: parseFloat(json[0].lon),
            });
          }
        });
    }
  };

  const lat = value?.latitude;
  const lon = value?.longitude;

  useDebouncedEffect(
    () => {
      let canceled = false;
      if (lat && lon) {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&zoom=14&format=json`
        )
          .then((res) => res.json())
          .then((json) => {
            if (!canceled) {
              setResult(json.display_name);
            }
          });
      }

      return () => {
        canceled = true;
      };
    },
    [lat, lon],
    500
  );

  return (
    <div>
      <div className={styles.inputGroup}>
        <label>location search</label>
        <input
          type="text"
          value={q}
          onChange={(ev) => setQ(ev.target.value)}
          onBlur={search}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") search();
          }}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>latitude</label>
        <input
          type="number"
          value={value?.latitude || ""}
          max="90"
          min="-90"
          onChange={(ev) =>
            onChange({
              latitude: clamp(parseFloat(ev.target.value), -90, 90),
              longitude: value?.longitude || 0,
            })
          }
        />
      </div>
      <div className={styles.inputGroup}>
        <label>longitude</label>
        <input
          type="number"
          value={value?.longitude || ""}
          max="180"
          min="-180"
          onChange={(ev) =>
            onChange({
              latitude: value?.latitude || 0,
              longitude: clamp(parseFloat(ev.target.value), -180, 180),
            })
          }
        />
      </div>
      <div>{result}</div>
    </div>
  );
};

export default LocationInput;

const useDebouncedEffect = (
  effect: EffectCallback,
  deps: DependencyList | undefined,
  delay: number
) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay]);
};

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
