"use client";
import { useSimulateContract } from "wagmi";
import { Assistant } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint;
  type: "mint" | "burn";
}
export function useMintOrBurn({
  debtToken,
  collateralToken,
  type,
  amount,
}: Props) {
  const { data } = useSimulateContract({
    abi: Assistant.abi,
    address: Assistant.address,
    functionName: type,
    args: [
      true,
      {
        debtToken: debtToken as TAddressString,
        collateralToken: collateralToken as TAddressString,
        leverageTier: -1,
      },
      amount,
    ],
  });
  return { data };
}
