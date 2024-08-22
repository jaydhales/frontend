import { env } from "@/env";
import { LeverageTier } from "@/lib/types";

export const RPC_URL = "";
export const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

export const BASE_FEE = 0.4;
export const L_FEE = 0.2345;

export const LeverageTiers = {
  [LeverageTier.one]: -1,
  [LeverageTier.two]: -2,
  [LeverageTier.three]: -3,
  [LeverageTier.four]: -4,
};

export const ASSET_URL =
  "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/arbitrum/assets/";
export const APE_HASH = env.NEXT_PUBLIC_APE_HASH;
//redeploy
