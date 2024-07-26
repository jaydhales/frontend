import { VaultContract } from "@/contracts/vault";
import type { CreateVaultInputValues } from "@/lib/schemas";
import type { TAddressString } from "@/lib/types";
import { useSimulateContract } from "wagmi";
import type { z } from "zod";
type Props = z.infer<typeof CreateVaultInputValues>;
export function useCreateVault({
  longToken,
  versusToken,
  leverageTier,
}: Props) {
  let lt = parseInt(leverageTier);
  if (!isFinite(lt)) {
    lt = 0;
  }
  const { data } = useSimulateContract({
    ...VaultContract,
    functionName: "initialize",
    args: [
      {
        debtToken: longToken as TAddressString,
        collateralToken: versusToken as TAddressString,
        leverageTier: 1,
      },
    ],
  });
  return data;
}
