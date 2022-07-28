import { ConnectButton } from "@rainbow-me/rainbowkit";
import makeBlockie from "ethereum-blockies-base64";
import styles from "./ConnectButton.module.css";

const ConnectAccount = () => {
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
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className={styles.connectedContainer}>
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={styles.networkContainer}
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                      />
                    )}
                  </button>

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
