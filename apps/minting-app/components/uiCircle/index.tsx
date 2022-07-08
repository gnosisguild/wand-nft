import styles from "./UiCircle.module.css";
import uiCirclebg from "./uiCirclebg.jpg";

const UiCircle: React.FC = ({ children }) => {
  return (
    <div className={styles.containerCircle}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.uiCircle}
      >
        <circle cx="60" cy="60" r="60" fill="#282828" />
        <circle
          cx="60"
          cy="60"
          r="60"
          fill="url(#pattern0)"
          fillOpacity="0.8"
        />
        <circle
          cx="60"
          cy="60"
          r="59"
          stroke="url(#paint0_linear_616_1329)"
          strokeWidth="2"
          style={{ mixBlendMode: "color-dodge" }}
        />
        <g style={{ mixBlendMode: "color-dodge" }}>
          <circle cx="60" cy="60" r="41" stroke="#D9D4AD" />
        </g>
        <g style={{ mixBlendMode: "color-dodge" }}>
          <circle
            cx="60"
            cy="60"
            r="48.5"
            stroke="#D9D4AD"
            strokeOpacity="0.6"
            strokeWidth="14"
            strokeDasharray="1 1"
          />
        </g>
        <g style={{ mixBlendMode: "color-dodge" }} opacity="0.5">
          <circle
            cx="60"
            cy="60"
            r="37"
            fill="url(#paint1_radial_616_1329)"
            fillOpacity="0.4"
            style={{ mixBlendMode: "hard-light" }}
          />
          <circle
            cx="60"
            cy="60"
            r="35"
            stroke="#D9D4AD"
            strokeWidth="4"
            fill="none"
          />
        </g>
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_616_1329"
              transform="translate(-0.0166667) scale(0.00123457)"
            />
          </pattern>
          <linearGradient
            id="paint0_linear_616_1329"
            x1="60"
            y1="3.28491"
            x2="60"
            y2="118.027"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFEBCE" stopOpacity="0.5" />
            <stop offset="1" stopColor="#EFEBCE" />
          </linearGradient>
          <radialGradient
            id="paint1_radial_616_1329"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(60 25.7852) rotate(90) scale(69.7424)"
          >
            <stop offset="0.375" stopColor="#E1DDD6" stopOpacity="0.6" />
            <stop offset="1" stopColor="#FBE9CE" />
          </radialGradient>
          <image
            id="image0_616_1329"
            width="837"
            height="810"
            href={uiCirclebg.src}
          />
        </defs>
      </svg>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};
export default UiCircle;
