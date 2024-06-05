"use client";
import { useSimulateContract } from "wagmi";
import { AssistantContract } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
import { parseUnits } from "viem";
import { z } from "zod";
import { getApeAddress } from "@/lib/utils";
import { APE_HASH } from "@/data/constants";
import { VaultContract } from "@/contracts/vault";
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

  const apeAddress = getApeAddress({
    apeHash: APE_HASH,
    vaultAddress: VaultContract.address,
    vaultId: safeVaultId.success ? safeVaultId.data : 0,
  });

  const { data, error } = useSimulateContract({
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
  console.log({ data, error });

  return { data };
}
