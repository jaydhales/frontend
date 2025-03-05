"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { mainnet } from "wagmi/chains";
import {
  darkTheme,
  midnightTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { env } from "@/env";
import { WagmiProvider } from "wagmi";
const getChainId = () => {
  const result = env.NEXT_PUBLIC_CHAIN_ID;
  return parseInt(result);
};
const chainId = getChainId();

const chain = {
  ...mainnet,
  // NOTE MAYBE REMOVE THIS.
  // All rpc calls are done through trpc
  rpcUrls: { default: { http: ["/api/rpc"] } },
  id: chainId,
};

// const config = getDefaultConfig({
//   appName: "RainbowKit App",
//   projectId: "YOUR_PROJECT_ID",
//   chains: [main],
//   ssr: true,
// });

export const wagmiConfig = getDefaultConfig({
  appName: "SIR",
  projectId:
    process.env.NEXT_PUBLIC_PROJECT_ID ?? "934acc697f01fec33b75c19d9bb2e3c7",
  chains: [chain],
  ssr: true,
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
});

function EvmProvider({
  children,
  // cookie,
}: {
  children: React.ReactNode;
  cookie: string | null;
}) {
  // const initialState = cookieToInitialState(wagmiConfig, cookie);
  //initialState={initialState}
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider theme={darkTheme({})}>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
}

export default EvmProvider;
