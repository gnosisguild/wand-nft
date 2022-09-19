import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useAppContext, packForMinting } from "../../state";
import wandContract from "../../utils/contract";

import { useHasMinted } from "../useHasMinted";
import styles from "./MintButton.module.css";
import { MintPermit, useDirectPermit } from "./usePermit";
import IncantationModal from "./IncantationModal";
import AlreadyMintedModal from "./AlreadyMintedModal";
import { MintStage } from "../../types";

const MintButton: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [showModal, setShowModal] = useState<boolean>(false);

  const directPermit = useDirectPermit();
  const [wildcardPermit, setWildcardPermit] = useState<MintPermit | null>(null);

  const hasMinted = useHasMinted(address);
  const isMinting =
    state.stage == MintStage.SIGNING ||
    state.stage == MintStage.TRANSACTING ||
    state.stage == MintStage.SUCCESS;

  const { config } = usePrepareContractWrite({
    addressOrName: wandContract.address,
    contractInterface: wandContract.abi,
    functionName: "mint",
    args: [...packForMinting(state), directPermit || wildcardPermit],
  });

  const { data, write } = useContractWrite({
    ...config,
    onError(err) {
      dispatch({ type: "changeMintStage", value: MintStage.ERROR });
    },
  });

  useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      console.log("mint succerss", data);
      const tokenId = parseInt(data.logs[0].topics[3], 16);
      dispatch({ type: "changeMintStage", value: MintStage.SUCCESS });
      router.push(`/wands/${tokenId}`);
    },
    onError() {
      dispatch({ type: "changeMintStage", value: MintStage.ERROR });
    },
  });

  useEffect(() => {
    if (state.stage === MintStage.SIGNING && !!data?.hash) {
      dispatch({ type: "changeMintStage", value: MintStage.TRANSACTING });
    }
  }, [dispatch, state.stage, data?.hash]);

  return (
    <>
      <div
        className={classNames(styles.buttonContainer, {
          [styles.disabled]: isMinting,
        })}
        onClick={() => {
          if (!address) {
            openConnectModal?.();
          } else {
            if (directPermit && !hasMinted) {
              dispatch({ type: "changeMintStage", value: MintStage.SIGNING });
              write?.();
            } else {
              setShowModal(true);
            }
          }
        }}
      >
        <MintSvg disabled={isMinting} />
      </div>
      {showModal && !hasMinted && !directPermit && (
        <IncantationModal
          onChange={(wildcardPermit) => {
            setWildcardPermit(wildcardPermit);
          }}
          onCancel={() => {
            setShowModal(false);
            setWildcardPermit(null);
          }}
          onSubmit={() => {
            if (write) {
              // wagmi takes a few ms til the actual write function is ready. If it's must click again
              setShowModal(false);
              dispatch({ type: "changeMintStage", value: MintStage.SIGNING });
              write?.();
            }
          }}
        />
      )}
      {showModal && hasMinted && (
        <AlreadyMintedModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

interface SVGProps {
  disabled: boolean;
}

const MintSvg: React.FC<SVGProps> = ({ disabled }) => (
  <svg
    viewBox="0 0 255 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    opacity={disabled ? "0.3" : "1"}
  >
    <g filter="url(#filter0_d_683_14203)">
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
      <path
        d="M91.6939 35V34.616L93.5899 33.656L94.0939 20.528L92.0299 19.544V19.16H96.4699L102.014 31.928L107.534 19.16H111.758V19.544L109.742 20.504L110.15 33.656L111.83 34.616V35H106.31V34.616L108.086 33.68L107.846 21.848L102.11 35.12H101.03L95.3899 22.016L95.0779 33.68L97.0219 34.616V35H91.6939ZM116.95 35V34.616L118.87 33.656V20.504L116.95 19.544V19.16H122.95V19.544L121.03 20.504V33.656L122.95 34.616V35H116.95ZM128.061 35V34.616L129.981 33.656V20.552L128.085 19.544V19.16H131.613L140.781 30.68V20.456L138.381 19.544V19.16H144.357V19.544L142.461 20.48V35.12H141.573L131.661 22.616V33.68L134.061 34.616V35H128.061ZM152.401 35V34.616L154.801 33.656V20.48H150.889L149.257 24.008H148.873V19.16H162.889V24.008H162.505L160.873 20.48H156.961V33.656L159.361 34.616V35H152.401Z"
        fill="white"
      />
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
