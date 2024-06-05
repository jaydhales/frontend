import { useSimulateContract } from "wagmi";
import { AssistantContract } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
export function useBurnApe({
  data,
  apeAddress,
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
  console.log({ data, amount, apeAddress });
  const { data: burnData, error } = useSimulateContract({
    ...AssistantContract,
    functionName: "burnAndSwap",
    args: [
      apeAddress,
      0n,
      {
        debtToken: data?.debtToken ?? "0x",
        collateralToken: data?.collateralToken ?? "0x",
        leverageTier: data?.leverageTier ?? -1,
      },
      amount,
      10000n,
      2,
    ],
  });
  console.log({ burnError: error, burnData });
  return { data: burnData };
}
