"use client";

import { useSimulateContract } from "wagmi";
import { SirContract } from "@/contracts/sir";
import type { TAddressString } from "@/lib/types";
import { parseUnits } from "viem";
import { z } from "zod";
import { useEffect } from "react";

interface Props {
  amount: bigint | undefined;
}

export const useStake = ({ amount }: Props) => {
  const {
    data: Stake,
    error,
    refetch,
    isFetching,
  } = useSimulateContract({
    ...SirContract,
    functionName: "stake",
    args: [amount],
  });

  console.log("simulating staking...");
  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch]);

  return { Stake, isFetching, error };
};
