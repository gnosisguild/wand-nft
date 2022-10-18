import { useState, useEffect } from "react";
import { ConnectButton, Theme, AvatarComponent } from "@rainbow-me/rainbowkit";
import makeBlockie from "ethereum-blockies-base64";
import ConnectBackground from "./ConnectBackground";
import styles from "./ConnectButton.module.css";

export const customTheme: Theme = {
  colors: {
    accentColor: "#efeac8",
    actionButtonBorder: "#aaa582",
    closeButtonBackground: "#aaa582",
    generalBorder: "#aaa582",
    menuItemBackground: "#aaa582",
    modalBackground: "rgba(45, 43, 17,0.8)",
    modalBorder: "#aaa582",
    modalText: "white",
    modalTextDim: "#efeac8",
    modalTextSecondary: "#efeac8",
    profileActionHover: "#aaa582",
    selectedOptionBorder: "#aaa582",
  },
  fonts: {
    body: "Spectral",
  },
  radii: {
    actionButton: "0",
    connectButton: "0",
    menuButton: "0",
    modal: "0",
    modalMobile: "0",
  },
};

export const BlockieAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <img
      src={makeBlockie(address)}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  );
};

interface Props {
  sizeRef: React.RefObject<SVGSVGElement>;
}

interface Position {
  top: number;
  right: number;
  width: number;
}

const ConnectAccount: React.FC<Props> = ({ sizeRef }) => {
  const [gildPosition, setGildPosition] = useState<DOMRect>();

  const getButtonPosition = (refRect: DOMRect): Position => {
    const cornerGildWidth = refRect.width || 0;
    const cornerGildHeight = refRect.height || 0;
    const offsetTop = refRect.y || 0;
    const offsetRight = window.innerWidth - refRect.width - refRect.x || 0;
    console.log(offsetTop, offsetRight);
    return {
      width: cornerGildWidth * 0.36,
      top: cornerGildHeight * 0.1 + offsetTop,
      right: cornerGildWidth * 0.087 + offsetRight,
    };
  };

  useEffect(() => {
    setGildPosition(sizeRef.current?.getBoundingClientRect());

    const handleResize = () => {
      setGildPosition(sizeRef.current?.getBoundingClientRect());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={styles.connectContainer}
            style={gildPosition && { ...getButtonPosition(gildPosition) }}
          >
            <ConnectBackground />
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button onClick={openConnectModal} type="button">
                    CONNECT WALLET
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    WRONG NETWORK
                  </button>
                );
              }

              return (
                <div className={styles.connectedContainer}>
                  <button onClick={openAccountModal} type="button">
                    <img src={makeBlockie(account.address)} />
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectAccount;
