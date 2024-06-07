import { useSimulateContract } from "wagmi";
import type { TAddressString } from "@/lib/types";
import { VaultContract } from "@/contracts/vault";
export function useBurnApe({
  data,

  amount,
}: {
  apeAddress: TAddressString;
  amount: bigint;
  data:
    | {
        leverageTier: number | undefined;
        debtToken: `0x${string}` | undefined;
        collateralToken: `0x${string}` | undefined;
      }
    | undefined;
}) {
  const {
    data: burnData,
    error,
    isFetching,
  } = useSimulateContract({
    ...VaultContract,
    functionName: "burn",
    args: [
      true,
      {
        debtToken: data?.debtToken ?? "0x",
        leverageTier: data?.leverageTier ?? -1,
        collateralToken: data?.collateralToken ?? "0x",
      },
      amount,
    ],
  });
  console.log({ burnError: error, burnData });
  return { data: burnData, isFetching };
}
