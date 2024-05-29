"use client";
import { useSimulateContract } from "wagmi";
import { Assistant } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint | undefined;
  leverageTier: number;
}

export function useMintApe({
  debtToken,
  collateralToken,
  leverageTier,
  amount,
}: Props) {
  const vaultAddress = "0x";
  const vaultId = 1n;
  const { data, error } = useSimulateContract({
    abi: Assistant.abi,
    address: Assistant.address,
    functionName: "mint",
    args: [
      vaultAddress,
      vaultId,
      {
        debtToken: debtToken as TAddressString,
        collateralToken: collateralToken as TAddressString,
        leverageTier,
      },
      amount ?? 0n,
    ],
  });
  console.log({ error });
  return { data };
}
