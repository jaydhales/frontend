import "server-only";
import { env } from "@/env";
// Don't let client use viem client
// Make all rpc calls on backend

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
console.log(process.env.RPC_URL, "RPC");
const viemClient = createPublicClient({
  chain: mainnet,
  transport: http(env.RPC_URL ?? "https://rpc.ankr.com/eth"),
});
export const readContract = viemClient.readContract;
export const multicall = viemClient.multicall;
export const getBalance = viemClient.getBalance;
