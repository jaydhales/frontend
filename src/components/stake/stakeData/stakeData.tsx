"use client";

import { api } from "@/trpc/react";
import { useEffect, useState, useMemo } from "react";
import { formatUnits } from "viem";

interface supplyProps {
  data?: bigint;
}

const StakeData = () => {
  const { data: unstakedSupply }: supplyProps =
    api.user.getSirSupply.useQuery();
  const { data: totalSupply }: supplyProps =
    api.user.getSirTotalSupply.useQuery();

  const totalValueLocked = useMemo(() => {
    if (totalSupply !== undefined && unstakedSupply != undefined) {
      return totalSupply - unstakedSupply;
    }
  }, [unstakedSupply, totalSupply]);

  useEffect(() => {
    console.log("---DATA---");
    console.log(`Unstaked SIR Supply: ${unstakedSupply}`);
    console.log(`Total SIR Supply: ${totalSupply}`);
    console.log(`Total Value Locked: ${totalValueLocked}`);
  }, [unstakedSupply, totalSupply, totalValueLocked]);

  return (
    <div className="flex justify-evenly py-[24px]">
      <div className="bg-secondary rounded-md w-[47%] py-2 flex flex-col justify-center items-center gap-2">
        <div className="text-sm font-light">Total SIR Locked</div>
        <div className="text-2xl font-semibold font-lora">
          {parseFloat(formatUnits(totalValueLocked ?? 0n, 18)).toFixed(4)}
        </div>
      </div>
      <div className="bg-secondary rounded-md w-[47%] py-2 flex flex-col justify-center items-center gap-2">
        <div className="text-sm font-light">Staking APR</div>
        <div className="text-2xl font-semibold font-lora">{6868}</div>
      </div>
    </div>
  );
};

export default StakeData;
