import type { TAddressString } from "@/lib/types";
import { erc20Abi, formatUnits, maxInt256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
interface Props {
  tokenAddr: string;
  approveContract: TAddressString;
}

export function useApproveErc20({ tokenAddr, approveContract }: Props) {
  const approveSimulate = useSimulateContract({
    address: tokenAddr as TAddressString,
    abi: erc20Abi,
    functionName: "approve",
    args: [approveContract, parseUnits(formatUnits(maxInt256, 18), 0)],
  });
  if (approveSimulate.error) {
    console.log(approveSimulate.error);
  }
  return { approveSimulate };
}
