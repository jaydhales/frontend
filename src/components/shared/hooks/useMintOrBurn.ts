"use client";
import { useSimulateContract } from "wagmi";
import { Assistant } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint;
  type: "mint" | "burn";
  assetType: "ape" | "tea";
}
export function useMintOrBurn({
  debtToken,
  collateralToken,
  type,
  amount,
  assetType,
}: Props) {
  let isApe = true;
  if (assetType === "tea") {
    isApe = false;
  }
  const { data } = useSimulateContract({
    abi: Assistant.abi,
    address: Assistant.address,
    functionName: type,
    args: [
      isApe,
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
