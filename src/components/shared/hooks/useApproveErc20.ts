import type { TAddressString } from "@/lib/types";
import { maxUint256 } from "viem";
import { useSimulateContract } from "wagmi";
interface Props {
  tokenAddr: string;
  approveContract: TAddressString;
}

export function useApproveErc20({ tokenAddr, approveContract }: Props) {
  const approveSimulate = useSimulateContract({
    address: tokenAddr as TAddressString,
    abi: getAbi(tokenAddr as TAddressString),
    functionName: "approve",
    args: [approveContract, maxUint256],
  });
  return { approveSimulate };
}

function getAbi(tokenAddr: TAddressString) {
  if (
    tokenAddr.toLowerCase() ===
    "0xdAC17F958D2ee523a2206206994597C13D831ec7".toLowerCase()
  ) {
    return nonStandardAbi;
  } else {
    return nonStandardAbi;
  }
}
const nonStandardAbi = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [],
  },
];
