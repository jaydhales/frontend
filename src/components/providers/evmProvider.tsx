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
const main = {
    ...mainnet,
    rpcUrls: { default: { http: ["http://140.82.62.189:8545/"] } },
    id: 1,
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
        process.env.NEXT_PUBLIC_PROJECT_ID ??
        "934acc697f01fec33b75c19d9bb2e3c7",
    chains: [main],
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
