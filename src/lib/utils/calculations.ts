import { BASE_FEE, L_FEE } from "@/data/constants";

/**
 *
 * @param k - Leverage Tier should be values -4 to 2
 * @returns number
 */
export function calculateApeVaultFee(k: number) {
  const l = getLeverageRatio(k);
  const a = 1 / (1 + (l - 1) * BASE_FEE);
  return (1 * 10 - a * 10) / 10;
}

/**
 *
 * @param k - Leverage Tier should be values -4 to 2
 * @returns number
 */
export function calculateTeaVaultFee() {
  const a = 1 / (1 + L_FEE);
  return (1 * 10 - a * 10) / 10;
}

/**
 * To compute the leverage ratio: l = 1+2^k where k is the leverageTier.
 * @param LeverageTier - number
 *
 */
export function getLeverageRatio(k: number) {
  const result = 1 + 2 ** k;
  return result;
}

/**
 * Calculate maximum amount of ape that can be minted without causing insufficient liquidity.
 * @param LeverageTier - number
 *
 */
interface Params {
  leverageRatio: number;
  baseFee: number;
  apeReserve: number;
  gentlemenReserve: number;
}
export function calculateMaxApe({
  leverageRatio,
  baseFee,
  apeReserve,
  gentlemenReserve,
}: Params) {
  console.log(
    { leverageRatio, baseFee, apeReserve, gentlemenReserve },
    "HELLO",
  );
  try {
    const x_max =
      ((1 + (leverageRatio - 1) * baseFee) / (leverageRatio - 1)) *
      (leverageRatio - baseFee);
    const result =
      x_max * (gentlemenReserve - 1.25 * (leverageRatio - 1) * apeReserve);
    if (!Number.isFinite(result)) {
      throw Error("Not valid");
    }
    return result;
  } catch {
    // catch math errors
    return undefined;
  }
}
