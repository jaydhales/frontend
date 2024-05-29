import { useMemo } from "react";
import { parseUnits } from "viem";
interface Props {
  deposit: string | undefined;
  depositToken: string;
  mintRequest: any;
  approveWriteRequest: any;
  tokenAllowance: bigint | undefined;
  tokenBalance: bigint | undefined;
}
export enum ESubmitType {
  "mint",
  "approve",
}
/**
 * Checks if user can submit form.
 * @returns
 * isValid -
 * errorMessage -
 * submitType - 'approve' | 'mint'
 */
export const useCheckSubmitValid = ({
  deposit,
  depositToken,
  mintRequest,
  approveWriteRequest,
  tokenAllowance,
  tokenBalance,
}: Props) => {
  const { isValid, errorMessage, submitType } = useMemo(() => {
    if (parseUnits(deposit ?? "0", 18) < 0n) {
      return {
        isValid: false,
        errorMessage: "Enter amount greater than 0.",
        submitType: ESubmitType.mint,
      };
    }

    if ((tokenBalance ?? 0n) < parseUnits(deposit ?? "0", 18)) {
      return {
        isValid: false,
        errorMessage: "Insufficient Balance.",
        submitType: ESubmitType.mint,
      };
    }
    // CHECK ALLOWANCE FIRST
    if (parseUnits(deposit ?? "0", 18) > (tokenAllowance ?? 0n)) {
      if (approveWriteRequest)
        return {
          isValid: true,
          errorMessage: null,
          submitType: ESubmitType.approve,
        };
      else
        return {
          isValid: false,
          errorMessage: "Error occured.",
          submitType: ESubmitType.approve,
        };
    }

    if (mintRequest)
      return {
        isValid: true,
        errorMessage: null,
        submitType: ESubmitType.mint,
      };
    else {
      return {
        isValid: false,
        errorMessage: "Unexpected mint error.",
        submitType: ESubmitType.mint,
      };
    }
  }, [
    deposit,
    depositToken,
    mintRequest,
    approveWriteRequest,
    tokenAllowance,
    tokenBalance,
  ]);
  return { isValid, errorMessage, submitType };
};
