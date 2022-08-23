import "../styles/globals.css";
import { AppWrapper, randomState } from "../state";
import type { AppContext, AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { customTheme, BlockieAvatar } from "../components/ConnectButton";
import { AppState } from "../types";

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Zodiac NFT",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

type MyAppProps = AppProps & {
  initialState: AppState;
};

function MyApp({ Component, initialState }: MyAppProps) {
  return (
    <AppWrapper initialState={initialState}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={customTheme}
          avatar={BlockieAvatar}
          initialChain={4}
        >
          <Component />
        </RainbowKitProvider>
      </WagmiConfig>
    </AppWrapper>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return { initialState: randomState() };
};

export default MyApp;
