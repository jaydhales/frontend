"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  cookieStorage,
  cookieToInitialState,
  createStorage,
  WagmiProvider,
} from "wagmi";
import { mainnet } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
const getChainId = () => {
  return 1;
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
  storage: createStorage({
    storage: cookieStorage,
  }),
});
function EvmProvider({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie: string | null;
}) {
  const initialState = cookieToInitialState(wagmiConfig, cookie);
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
}

export default EvmProvider;
