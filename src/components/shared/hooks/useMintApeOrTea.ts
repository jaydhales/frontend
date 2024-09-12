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
const zeroAddress = "0x0000000000000000000000000000000000000000";
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
  const vault = {
    debtToken: debtToken as TAddressString,
    collateralToken: collateralToken as TAddressString,
    leverageTier,
  };

  const {
    data: Mint,
    refetch,
    isFetching,
    error,
  } = useSimulateContract({
    abi: AssistantContract.abi,
    address: AssistantContract.address,
    functionName: "mint",
    args: [
      isApe ? apeAddress : zeroAddress,
      parseUnits(vaultId?.toString() ?? "0", 0),
      { ...vault },
      amount ?? 0n,
    ],
  });
  console.log(error, "---====Mint Ape or Tea Error====---");
  const { data: MintWithEth } = useSimulateContract({
    ...AssistantContract,
    functionName: "mintWithETH",
    args: [
      isApe ? apeAddress : zeroAddress,
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
