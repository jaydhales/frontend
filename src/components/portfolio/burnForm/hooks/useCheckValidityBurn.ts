import type { SimulateContractReturnType } from "viem";
import { parseUnits } from "viem";
import type { TBurnFields } from "../burnForm";

export function useCheckValidityBurn(
  formData: TBurnFields,
  tokenBalance: bigint | undefined,
  isClaimingRewards: boolean,
  claimingRewardsRequest: SimulateContractReturnType["request"],
) {
  if (isClaimingRewards) {
    if (claimingRewardsRequest) {
      return { isValid: true, error: null };
    }
  }
  if (!formData.deposit) {
    return { isValid: false, error: null };
  }
  if (parseUnits(formData.deposit ?? "0", 18) > (tokenBalance ?? 0n)) {
    return { isValid: false, error: "Insufficent balance." };
  }

  return { isValid: true, error: null };
}
