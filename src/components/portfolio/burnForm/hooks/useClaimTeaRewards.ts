import { SirContract } from "@/contracts/sir";
import { useSimulateContract } from "wagmi";

export function useClaimTeaRewards({ vaultId }: { vaultId: bigint }) {
  const { data: teaRewardData } = useSimulateContract({
    ...SirContract,
    functionName: "lPerMint",
    args: [vaultId],
  });
  return { claimRewardRequest: teaRewardData?.request };
}
