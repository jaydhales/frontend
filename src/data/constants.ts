import { LeverageTier } from "@/lib/types";

export const RPC_URL = "https://docker-anvil-production-8d23.up.railway.app/";
export const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const VAULT_ADDRESS = "0xa51807d5a12E7e78148c66dC4851CD33EEd1FDfD";
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
  "0xa46131919dce26b89fa279578c126634abe8d3a1a5924b214543dfa2e12b3b86";
