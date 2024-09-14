import type { TAddressString } from "@/lib/types";
import { useEffect, useState } from "react";
import { formatUnits, maxInt256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
interface Props {
  tokenAddr: string;
  approveContract: TAddressString;
}

export function useApproveErc20({ tokenAddr, approveContract }: Props) {
  const [nonStandardErc20, setNonStandardErc20] = useState(false);
  const approveSimulate = useSimulateContract({
    address: tokenAddr as TAddressString,
    abi: nonStandardErc20 ? nonStandardAbi : abi,
    functionName: "approve",
    args: [approveContract, parseUnits(formatUnits(maxInt256, 18), 0)],
  });
  console.log(nonStandardErc20, "non standard");
  useEffect(() => {
    if (approveSimulate.error) {
      console.log(
        approveSimulate.error.message,
        "ERROR APPROVE",
        "ContractFunctionZeroDataError",
      );
      // ContractFunctionExecutionError
      if (
        approveSimulate.error.message.includes(
          `The contract function "approve" returned no data ("0x").`,
        )
      ) {
        console.log(approveSimulate.error, "APPROVE SIMULATE ERROR");
        setNonStandardErc20(true);
      } else {
        setNonStandardErc20(false);
      }
    } else {
      setNonStandardErc20(false);
    }
  }, [approveSimulate.error]);
  return { approveSimulate };
}

const abi = [
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
    outputs: [
      {
        type: "bool",
      },
    ],
  },
];
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
