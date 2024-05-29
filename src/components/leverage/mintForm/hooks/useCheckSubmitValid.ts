import { useMemo } from "react";
import { parseUnits } from "viem";
interface Props {
  deposit: number | undefined;
  depositToken: string;
  mintRequest: any;
  approveWriteRequest: any;
  tokenAllowance: bigint | undefined;
  tokenBalance: bigint | undefined;
}

export const useCheckSubmitValid = ({
  deposit,
  depositToken,
  mintRequest,
  approveWriteRequest,
  tokenAllowance,
  tokenBalance,
}: Props) => {
  const isValid = useMemo(() => {
    if ((tokenBalance ?? 0n) < parseUnits((deposit ?? 0).toString(), 18)) {
      return false;
    }
    if (parseUnits(deposit?.toString() ?? "0", 18) > (tokenAllowance ?? 0n)) {
      if (approveWriteRequest) return true;
      else return false;
    } else {
      if (mintRequest) return true;
      else return false;
    }
  }, [
    deposit,
    depositToken,
    mintRequest,
    approveWriteRequest,
    tokenAllowance,
    tokenBalance,
  ]);
  return { isValid };
};
