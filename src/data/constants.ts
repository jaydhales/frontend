import { LeverageTier } from "@/lib/types";

export const RPC_URL = "https://docker-anvil-production-aa2c.up.railway.app/";
export const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const LeverageTiers = {
  [LeverageTier.one]: 10000n,
  [LeverageTier.two]: 20000n,
  [LeverageTier.three]: 30000n,
  [LeverageTier.four]: 40000n,
};
