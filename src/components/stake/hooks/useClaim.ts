"use client";

import { useSimulateContract } from "wagmi";
import { SirContract } from "@/contracts/sir";
import { useEffect } from "react";

export const useClaim = () => {
  const {
    data: Claim,
    error,
    refetch,
    isFetching,
  } = useSimulateContract({
    ...SirContract,
    functionName: "claim",
    args: [],
  });

  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch]);

  return { Claim, isFetching, error };
};
