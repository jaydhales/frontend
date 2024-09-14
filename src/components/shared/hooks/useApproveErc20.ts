import { SafeApproveContract } from "@/contracts/safe-approve";
import type { TAddressString } from "@/lib/types";
import { formatUnits, maxInt256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
interface Props {
  tokenAddr: string;
  approveContract: TAddressString;
}

export function useApproveErc20({ tokenAddr, approveContract }: Props) {
  const approveSimulate = useSimulateContract({
    ...SafeApproveContract,
    functionName: "approveToken",
    args: [
      tokenAddr as TAddressString,
      approveContract,
      parseUnits(formatUnits(maxInt256, 18), 0),
    ],
  });
  return { approveSimulate };
}
