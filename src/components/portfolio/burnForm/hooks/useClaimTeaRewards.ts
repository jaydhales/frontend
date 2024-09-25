import { SirContract } from "@/contracts/sir";
import { useSimulateContract } from "wagmi";

export function useClaimTeaRewards() {
  const { data: teaRewardData } = useSimulateContract({
    ...SirContract,
    functionName: "contributorMint",
    args: [],
  });
  return { claimRewardRequest: teaRewardData?.request };
}
