import { parseUnits } from "viem";
import type { TBurnFields } from "../burnForm";

export function useCheckValidityBurn(
  formData: TBurnFields,
  tokenBalance: bigint | undefined,
) {
  if (parseUnits(formData.deposit ?? "0", 18) > (tokenBalance ?? 0n)) {
    return { isValid: false, error: "Insufficent balance." };
  }

  return { isValid: true, error: null };
}
