"use client";

import { useSimulateContract } from "wagmi";
import { SirContract } from "@/contracts/sir";
import { useEffect } from "react";

interface Props {
  amount: bigint | undefined;
}

export const useUnstakeAndClaim = ({ amount }: Props) => {
  const {
    data: UnstakeAndClaim,
    error,
    refetch,
    isFetching,
  } = useSimulateContract({
    ...SirContract,
    functionName: "unstakeAndClaim", // get the newly deployed sir contract's abi
    args: [amount ?? 0n],
  });

  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch]);

  return { UnstakeAndClaim, isFetching, error };
};
