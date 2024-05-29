"use client";
import { useSimulateContract } from "wagmi";
import { Assistant } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
import { getVaultAddress } from "@/lib/utils";
import { parseUnits } from "viem";
import { z } from "zod";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint | undefined;
  leverageTier: number;
  vaultId: string | undefined;
}

export function useMintApe({
  debtToken,
  collateralToken,
  leverageTier,
  amount,
  vaultId,
}: Props) {
  const safeVaultId = z.coerce.number().safeParse(vaultId);
  const vaultAddress = getVaultAddress({
    vaultId: safeVaultId.success ? safeVaultId.data : 0,
  });
  const { data, error } = useSimulateContract({
    abi: Assistant.abi,
    address: Assistant.address,
    functionName: "mint",
    args: [
      vaultAddress,
      parseUnits(vaultId?.toString() ?? "0", 0),
      {
        debtToken: debtToken as TAddressString,
        collateralToken: collateralToken as TAddressString,
        leverageTier,
      },
      amount ?? 0n,
    ],
  });

  return { data };
}
