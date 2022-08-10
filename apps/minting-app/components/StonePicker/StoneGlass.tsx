import styles from "./StonePicker.module.css";

const StoneGlass: React.FC<{}> = () => {
  return (
    <svg
      className={styles.stoneViewSvg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 3000"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <radialGradient
          id="picker_sf"
          cx="606.78"
          cy="1003.98"
          fx="606.78"
          fy="1003.98"
          r="2"
          gradientTransform="translate(-187630.67 -88769.1) rotate(-33.42) scale(178.04 178.05)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".05" stopColor="#fff" stopOpacity=".5" />
          <stop offset=".26" stopColor="#ececec" stopOpacity=".4" />
          <stop offset=".45" stopColor="#c4c4c4" stopOpacity=".4" />
          <stop offset=".63" stopColor="#929292" stopOpacity=".4" />
          <stop offset=".83" stopColor="#7b7b7b" stopOpacity=".4" />
          <stop offset="1" stopColor="#cbcbca" stopOpacity=".4" />
        </radialGradient>
        <radialGradient
          id="picker_sh"
          cx="1149"
          cy="2660"
          fx="1149"
          fy="2660"
          r="76"
          gradientTransform="translate(312 2546) rotate(-20) scale(1 -.5)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        fill="url(#picker_sf)"
        d="M1184 876a260 260 0 1 1-368 368 260 260 0 0 1 368-368Z"
      />
      <path
        fill="url(#picker_sh)"
        d="M919 857c49-20 96-15 107 11 10 26-21 62-70 82s-97 14-107-12c-10-25 21-62 70-81Z"
      />
    </svg>
  );
};

export default StoneGlass;
