import { LeverageTier } from "@/lib/types";

export const RPC_URL = "https://docker-anvil-production-8d23.up.railway.app/";
export const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const VAULT_ADDRESS = "0xC54051689e0931FdCF3e708b665f521f7ab42Fb0";
export const LeverageTiers = {
  [LeverageTier.one]: -1,
  [LeverageTier.two]: -2,
  [LeverageTier.three]: -3,
  [LeverageTier.four]: -4,
};
export const GRAPHQL_URL =
  "http://140.82.62.189:8000/subgraphs/name/sir-trade/index";
export const ASSET_URL =
  "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/arbitrum/assets/";
export const APE_HASH =
  "0xcf39e7ac6f3c12d813a3307776916d753675afc06b9b863f743ed27a77d1c064";
