"use client";
import { useSimulateContract } from "wagmi";
import { Assistant } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
import { getVaultAddress } from "@/lib/utils";
import { parseUnits } from "viem";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint | undefined;
  leverageTier: number;
  vaultId: number;
}

export function useMintApe({
  debtToken,
  collateralToken,
  leverageTier,
  amount,
  vaultId,
}: Props) {
  const vaultAddress = getVaultAddress({ vaultId });
  const { data, error } = useSimulateContract({
    abi: Assistant.abi,
    address: Assistant.address,
    functionName: "mint",
    args: [
      vaultAddress,
      parseUnits(vaultId.toString(), 0),
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
