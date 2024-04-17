"use client";
import { useSimulateContract } from "wagmi";
import { Assistant } from "~/contracts/assistant";
import { TAddressString } from "~/lib/types";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: BigInt;
}
export function useSwapAndMint({ debtToken, collateralToken }: Props) {
  const { data } = useSimulateContract({
    abi: Assistant.abi,
    address: Assistant.address,
    functionName: "swapAndMint",
    args: [
      false,
      {
        debtToken: debtToken as TAddressString,
        collateralToken: collateralToken as TAddressString,
        leverageTier: 1,
      },
      0n,
      0n,
      0,
    ],
  });
  return { data };
}
