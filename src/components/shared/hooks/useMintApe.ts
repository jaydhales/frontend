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
  useEth: boolean
}

export function useMintApe({
  debtToken,
  collateralToken,
  leverageTier,
  amount,
  vaultId,
  tokenAllowance,
  useEth
}: Props) {
  const safeVaultId = z.coerce.number().safeParse(vaultId);
  const apeAddress = getApeAddress({
    apeHash: APE_HASH,
    vaultAddress: VaultContract.address,
    vaultId: safeVaultId.success ? safeVaultId.data : 0,
  });
  const vault =
  {
    debtToken: debtToken as TAddressString,
    collateralToken: collateralToken as TAddressString,
    leverageTier
  }
  const { data: Mint, refetch, isFetching, error: mintError } = useSimulateContract({
    abi: AssistantContract.abi,
    address: AssistantContract.address,
    functionName: 'mint',
    args: [
      apeAddress,
      parseUnits(vaultId?.toString() ?? "0", 0),
      { ...vault },
      amount ?? 0n,
    ],
  });
  const { data: MintWithEth, error: mintWithETHError } = useSimulateContract({
    ...AssistantContract,
    functionName: 'mintWithETH',
    args: [apeAddress, parseUnits(vaultId?.toString() ?? '0', 0), { ...vault }],
    value: amount ?? 0n
  })

  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch, tokenAllowance]);
  console.log({ Mint, MintWithEth, isFetching, mintWithETHError, mintError })
  return { Mint, MintWithEth, isFetching, };
}
