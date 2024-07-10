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
  isApe: boolean;
}

export function useMintApeOrTea({
  collateralToken,
  debtToken,
  leverageTier,
  amount,
  vaultId,
  tokenAllowance,
  isApe,
}: Props) {
  const safeVaultId = z.coerce.number().safeParse(vaultId);
  const apeAddress = getApeAddress({
    apeHash: APE_HASH,
    vaultAddress: VaultContract.address,
    vaultId: safeVaultId.success ? safeVaultId.data : 0,
  });
  console.log(apeAddress);
  const vault = {
    debtToken: debtToken as TAddressString,
    collateralToken: collateralToken as TAddressString,
    leverageTier,
  };
  const {
    data: Mint,
    refetch,
    isFetching,
  } = useSimulateContract({
    abi: AssistantContract.abi,
    address: AssistantContract.address,
    functionName: "mint",
    args: [
      isApe ? apeAddress : "0x",
      parseUnits(vaultId?.toString() ?? "0", 0),
      { ...vault },
      amount ?? 0n,
    ],
  });
  const { data: MintWithEth } = useSimulateContract({
    ...AssistantContract,
    functionName: "mintWithETH",
    args: [
      isApe ? apeAddress : "0x",
      parseUnits(vaultId?.toString() ?? "0", 0),
      { ...vault },
    ],
    value: amount ?? 0n,
  });

  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch, tokenAllowance]);
  return { Mint, MintWithEth, isFetching };
}
