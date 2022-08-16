import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useTransaction,
} from "wagmi";
import { useAppContext } from "../../state";
import {
  calculateAspects,
  calculatePlanets,
  transformBackground,
} from "../../template";
import { AppState, Aspect, Planet } from "../../types";
import wandContract from "../../utils/contract";
import styles from "./MintButton.module.css";
import { pack } from "./packing";

interface Props {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  inactive?: boolean;
  navMode: boolean;
}

const MintButton: React.FC<Props> = ({ onClick, inactive, navMode }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const planets = useMemo(
    () => calculatePlanets(state.latitude, state.longitude, 0, new Date()),
    [state.latitude, state.longitude]
  );
  const aspects = useMemo(
    () => calculateAspects(state.latitude, state.longitude, 0, new Date()),

    [state.latitude, state.longitude]
  );

  const { config } = usePrepareContractWrite({
    addressOrName: wandContract.address,
    contractInterface: wandContract.abi,
    functionName: "mint",
    args: writeArgs(state, planets, aspects),
  });

  const { data, isSuccess, write } = useContractWrite(config);
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      console.log("mint succerss", data);
      const tokenId = parseInt(data.logs[0].topics[3], 16);
      dispatch({ type: "changeMintingState", value: false });
      router.push(`/wands/${tokenId}`);
    },
  });

  return (
    <div
      className={classNames(styles.buttonContainer, {
        [styles.disabled]: state.minting,
        [styles.navMode]: navMode,
      })}
      onClick={() => {
        if (navMode) {
          router.push("/");
        } else {
          dispatch({ type: "changeMintingState", value: true });
          write?.();
        }
      }}
    >
      <MintSvg navMode={navMode} disabled={state.minting} />
    </div>
  );
};

function writeArgs(state: AppState, planets: Planet[], aspects: Aspect[]) {
  const {
    packedHalo,
    packedBackground,
    packedPlanets,
    packedAspects,
    packedVisibility,
  } = pack({
    halo: state.halo,
    background: transformBackground(state.background),
    planets,
    aspects,
  });

  return [
    state.stone,
    packedHalo,
    state.handle,
    packedBackground,
    packedPlanets,
    packedAspects,
    packedVisibility,
  ];
}

// function encodeCalldata(state: AppState) {
//   return wandContract.iface.encodeFunctionData("mint", [
//     state.stone,
//     state.handle,
//     encodeHalo(state.halo.shape, state.halo.rhythm),
//     state.background,
//     calculatePlanets(
//       state.latitude,
//       state.longitude,
//       0,
//       new Date("2022-07-12")
//     ),
//     calculateAspects(
//       state.latitude,
//       state.longitude,
//       0,
//       new Date("2022-07-12")
//     ),
//   ]);
// }

interface SVGProps {
  navMode: boolean;
  disabled: boolean;
}

const MintSvg: React.FC<SVGProps> = ({ navMode, disabled }) => (
  <svg
    viewBox="0 0 255 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    opacity={disabled ? "0.3" : "1"}
  >
    <g filter="url(#filter0_d_683_14203)" opacity={navMode ? "0.5" : "1"}>
      <path
        d="M248.219 28L235.161 15L228.632 8.5H210.134L203.605 2H189.025H65.1942H50.6133L44.0845 8.5H25.5863L19.0576 15L6 28L19.0576 41L25.5863 47.5H44.0845L50.6133 54H65.1942H189.025H203.605L210.134 47.5H228.632L235.161 41L248.219 28Z"
        fill="#201C15"
      />
      <path
        d="M248.219 28L235.161 15L228.632 8.5H210.134L203.605 2H189.025H65.1942H50.6133L44.0845 8.5H25.5863L19.0576 15L6 28L19.0576 41L25.5863 47.5H44.0845L50.6133 54H65.1942H189.025H203.605L210.134 47.5H228.632L235.161 41L248.219 28Z"
        fill="url(#paint0_linear_683_14203)"
        fillOpacity="0.7"
        style={{ mixBlendMode: "hard-light" }}
      />
    </g>
    <g className={styles.border} filter="url(#filter1_d_683_14203)">
      <path
        d="M66.4757 3H45.3244L29.1371 18.625M66.4757 53H45.3244L29.1371 37.375M38.8495 28L29.1371 18.625M38.8495 28L29.1371 37.375M38.8495 28H66.4757M29.1371 18.625L25.8997 15.5L12.9499 28L25.8997 40.5L29.1371 37.375M66.4757 28L70.4241 24.1719L74.3725 28L70.4241 31.8281L66.4757 28Z"
        stroke="#D1BA7F"
      />
      <path
        d="M187.743 3H208.894L225.082 18.625M187.743 53H208.894L225.082 37.375M215.369 28L225.082 18.625M215.369 28L225.082 37.375M215.369 28H187.743M225.082 18.625L228.319 15.5L241.269 28L228.319 40.5L225.082 37.375M187.743 28L183.795 24.1719L179.846 28L183.795 31.8281L187.743 28Z"
        stroke="#D1BA7F"
      />
      <path
        d="M234.27 15.5L247.219 28L234.27 40.5M234.27 15.5L221.32 28L234.27 40.5M234.27 15.5L227.795 9.25H209.449L202.974 3H188.514H65.7051H51.2445L44.7696 9.25H26.4241L19.9492 15.5M234.27 40.5L227.795 46.75H209.449L202.974 53H188.514H65.7051H51.2445L44.7696 46.75H26.4241L19.9492 40.5M19.9492 15.5L6.99936 28L19.9492 40.5M19.9492 15.5L32.899 28L19.9492 40.5"
        stroke="#D1BA7F"
        strokeWidth="2"
      />
    </g>
    <g filter="url(#filter2_d_683_14203)">
      {navMode ? (
        <path
          d="M93.5492 35.24C91.9172 35.24 90.5092 34.904 89.3252 34.232C88.1412 33.56 87.2292 32.648 86.5892 31.496C85.9492 30.328 85.6292 29 85.6292 27.512C85.6292 26.376 85.8452 25.296 86.2772 24.272C86.7252 23.232 87.3252 22.312 88.0772 21.512C88.8452 20.712 89.7252 20.08 90.7172 19.616C91.7252 19.152 92.7892 18.92 93.9092 18.92C94.7092 18.92 95.3892 18.976 95.9492 19.088C96.5092 19.184 97.0052 19.32 97.4372 19.496C97.8852 19.656 98.3332 19.848 98.7812 20.072L98.9012 24.272H98.4692L97.0052 21.344C96.3972 20.912 95.8612 20.6 95.3972 20.408C94.9492 20.216 94.4372 20.12 93.8612 20.12C92.7092 20.12 91.6772 20.408 90.7652 20.984C89.8692 21.56 89.1572 22.352 88.6292 23.36C88.1172 24.352 87.8612 25.496 87.8612 26.792C87.8612 28.312 88.1092 29.616 88.6052 30.704C89.1172 31.776 89.7972 32.6 90.6452 33.176C91.5092 33.736 92.4612 34.016 93.5012 34.016C94.3812 34.016 95.1172 33.896 95.7092 33.656C96.3172 33.4 96.8532 33.12 97.3172 32.816L98.7572 30.248H99.1652L98.9012 34.064C98.4372 34.304 97.9572 34.512 97.4612 34.688C96.9812 34.864 96.4292 35 95.8052 35.096C95.1812 35.192 94.4292 35.24 93.5492 35.24ZM104.923 35V34.616L106.843 33.656V20.504L104.923 19.544V19.16H111.115C112.795 19.16 114.115 19.512 115.075 20.216C116.051 20.904 116.539 21.856 116.539 23.072C116.539 23.968 116.235 24.776 115.627 25.496C115.019 26.2 114.211 26.736 113.203 27.104L117.763 33.752L119.347 34.616V35H115.891L111.235 27.728H109.003V33.632L110.803 34.616V35H104.923ZM110.563 20.48H109.003V26.408H110.707C111.715 26.408 112.547 26.128 113.203 25.568C113.875 24.992 114.211 24.264 114.211 23.384C114.211 22.488 113.883 21.784 113.227 21.272C112.571 20.744 111.683 20.48 110.563 20.48ZM122.022 35V34.616L123.558 33.824L129.702 19.04H130.782L136.83 33.752L138.438 34.616V35H132.486V34.616L134.598 33.8L132.798 29.36H126.966L125.19 33.8L127.206 34.616V35H122.022ZM127.518 28.04H132.27L129.894 22.136L127.518 28.04ZM142.79 35V34.616L144.71 33.656V20.504L142.79 19.544V19.16H154.286V23.288H153.902L152.414 20.48H146.87V26.168H150.71L151.91 24.176H152.294V29.432H151.91L150.71 27.488H146.87V33.656L149.03 34.616V35H142.79ZM162.581 35V34.616L164.981 33.656V20.48H161.069L159.437 24.008H159.053V19.16H173.069V24.008H172.685L171.053 20.48H167.141V33.656L169.541 34.616V35H162.581Z"
          fill="white"
        />
      ) : (
        <path
          d="M91.6939 35V34.616L93.5899 33.656L94.0939 20.528L92.0299 19.544V19.16H96.4699L102.014 31.928L107.534 19.16H111.758V19.544L109.742 20.504L110.15 33.656L111.83 34.616V35H106.31V34.616L108.086 33.68L107.846 21.848L102.11 35.12H101.03L95.3899 22.016L95.0779 33.68L97.0219 34.616V35H91.6939ZM116.95 35V34.616L118.87 33.656V20.504L116.95 19.544V19.16H122.95V19.544L121.03 20.504V33.656L122.95 34.616V35H116.95ZM128.061 35V34.616L129.981 33.656V20.552L128.085 19.544V19.16H131.613L140.781 30.68V20.456L138.381 19.544V19.16H144.357V19.544L142.461 20.48V35.12H141.573L131.661 22.616V33.68L134.061 34.616V35H128.061ZM152.401 35V34.616L154.801 33.656V20.48H150.889L149.257 24.008H148.873V19.16H162.889V24.008H162.505L160.873 20.48H156.961V33.656L159.361 34.616V35H152.401Z"
          fill="white"
        />
      )}
    </g>
    <defs>
      <filter
        id="filter0_d_683_14203"
        x="0"
        y="0"
        width="254.219"
        height="64"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_683_14203"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_683_14203"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_683_14203"
        x="2.55948"
        y="0"
        width="249.1"
        height="58"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_683_14203"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_683_14203"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_d_683_14203"
        x="85.6939"
        y="17.16"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_683_14203"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_683_14203"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_683_14203"
        x1="127.109"
        y1="2"
        x2="127.109"
        y2="54"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F8D7A4" />
        <stop offset="0.411458" stopColor="#DB8B0E" />
        <stop offset="0.71875" stopColor="#D58200" />
        <stop offset="1" stopColor="#995D00" />
      </linearGradient>
    </defs>
  </svg>
);

export default MintButton;
