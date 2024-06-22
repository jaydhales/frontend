"use client";
import { useSimulateContract } from "wagmi";
import { AssistantContract } from "@/contracts/assistant";
import type { TAddressString } from "@/lib/types";
import { parseUnits } from "viem";
import { z } from "zod";
import { getApeAddress } from "@/lib/utils";
import { APE_HASH } from "@/data/constants";
import { VaultContract } from "@/contracts/vault";
import { useEffect } from "react";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint | undefined;
  tokenAllowance: bigint | undefined;
  leverageTier: number;
  vaultId: string | undefined;
}

export function useMintApe({
  debtToken,
  collateralToken,
  leverageTier,
  amount,
  vaultId,
  tokenAllowance,
}: Props) {
  const safeVaultId = z.coerce.number().safeParse(vaultId);
  console.log(vaultId, "RAW VAULT ID")
  const apeAddress = getApeAddress({
    apeHash: APE_HASH,
    vaultAddress: VaultContract.address,
    vaultId: safeVaultId.success ? safeVaultId.data : 0,
  });
  console.log({
    address: AssistantContract.address,
    functionName: "mint",
    args: [
      apeAddress,
      parseUnits(vaultId?.toString() ?? "0", 0),
      {
        debtToken: debtToken as TAddressString,
        collateralToken: collateralToken as TAddressString,
        leverageTier,
      },
      amount ?? 0n,
    ],
  })
  console.log(apeAddress)
  const { data, error, refetch, isFetching } = useSimulateContract({
    abi: AssistantContract.abi,
    address: AssistantContract.address,
    functionName: "mint",
    args: [
      apeAddress,
      parseUnits(vaultId?.toString() ?? "0", 0),
      {
        debtToken: debtToken as TAddressString,
        collateralToken: collateralToken as TAddressString,
        leverageTier,
      },
      amount ?? 0n,
    ],
  });
  console.log({ error }, "Mint Error")
  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch, tokenAllowance]);

  return { data, isFetching };
}
