"use client";

import { useSimulateContract } from "wagmi";
import { SirContract } from "@/contracts/sir";
import { useEffect } from "react";

interface Props {
  amount: bigint | undefined;
}

export const useUnstake = ({ amount }: Props) => {
  const {
    data: Unstake,
    error,
    refetch,
    isFetching,
  } = useSimulateContract({
    ...SirContract,
    functionName: "unstake",
    args: [amount],
  });

  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch]);

  return { Unstake, isFetching, error };
};
