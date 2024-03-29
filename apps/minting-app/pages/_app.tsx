import "../styles/globals.css";
import { AppWrapper, randomState } from "../state";
import type { AppContext, AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";

import { customTheme, BlockieAvatar } from "../components/ConnectButton";
import { AppState } from "../types";
import { GreenlistProvider } from "../components/useGreenlist";

const { chains, provider } = configureChains(
  [chain.goerli],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID })]
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
      <GreenlistProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={customTheme}
            avatar={BlockieAvatar}
            initialChain={5}
          >
            <Component />
          </RainbowKitProvider>
        </WagmiConfig>
      </GreenlistProvider>
    </AppWrapper>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return { initialState: randomState() };
};

export default MyApp;
