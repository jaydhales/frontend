"use server";

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
const viemClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL ?? "https://rpc.ankr.com/eth"),
});
export const readContract = viemClient.readContract;
// export const webSocketViemClient = createPublicClient({
//   chain: mainnet,
//   transport: webSocket(process.env.NEXT_PUBLIC_ALCHEMY_RPC_WS),
// });
