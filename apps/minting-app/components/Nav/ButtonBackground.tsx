import styles from "./Nav.module.css";
import classNames from "classnames";
interface Props {
  className: string;
}

const ButtonBackground: React.FC<Props> = ({ className }) => (
  <svg
    viewBox="0 0 101 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classNames(styles.buttonBackground, className)}
  >
    <g style={{ mixBlendMode: "hard-light" }}>
      <path
        d="M11.2298 21.4752L0.986328 11.2318L11.2298 0.988281H89.8212L100.065 11.2318L89.8212 21.4752H11.2298Z"
        fill="#948F6B"
      />
    </g>
    <g style={{ mixBlendMode: "soft-light" }}>
      <path
        d="M13.0801 2.90625L4.75781 11.2285H1L11.2285 1L13.0801 2.90625Z"
        fill="#D9D9D9"
        fillOpacity="0.6"
      />
      <path
        d="M11.2285 1L13.0801 2.90625H88.0488L89.9551 1H11.2285Z"
        fill="#D9D9D9"
      />
      <path
        d="M87.9849 2.90625L96.3071 11.2285H100.065L89.8364 1L87.9849 2.90625Z"
        fill="#D9D9D9"
        fillOpacity="0.7"
      />
    </g>
    <g style={{ mixBlendMode: "multiply" }}>
      <path
        d="M13.0801 19.5388L4.75781 11.2166H1L11.2285 21.4451L13.0801 19.5388Z"
        fill="#D9D9D9"
      />
      <path
        d="M11.2285 21.4451L13.0801 19.5388H88.0488L89.9551 21.4451H11.2285Z"
        fill="#D9D9D9"
      />
      <path
        d="M87.9849 19.5388L96.3071 11.2166H100.065L89.8364 21.4451L87.9849 19.5388Z"
        fill="#D9D9D9"
      />
    </g>
  </svg>
);

export default ButtonBackground;
