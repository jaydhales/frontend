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
  console.log(lt, "LT");
  const { data, error } = useSimulateContract({
    ...VaultContract,
    functionName: "initialize",
    args: [
      {
        debtToken: versusToken as TAddressString,
        collateralToken: longToken as TAddressString,
        leverageTier: lt,
      },
    ],
  });
  console.log(data, error, "ERROR");
  return data;
}
