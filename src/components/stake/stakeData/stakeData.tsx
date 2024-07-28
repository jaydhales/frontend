"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";

const StakeData = () => {
  const [totalSIRLocked, setTotalSIRLocked] = useState<bigint | undefined>(0n);

  const { data: unstakedSupply }: { data?: bigint } =
    api.user.getSirSupply.useQuery();
  const { data: totalSupply }: { data?: bigint } =
    api.user.getSirTotalSupply.useQuery();

  useEffect(() => {
    setTotalSIRLocked(
      totalSupply && unstakedSupply && totalSupply - unstakedSupply
    );

    console.log("---DATA---");
    console.log(`Unstaked SIR Supply: ${unstakedSupply}`);
  }, [unstakedSupply, totalSupply]);

  return (
    <div className="flex justify-evenly py-[24px]">
      <div className="bg-secondary rounded-md w-[47%] py-2 flex flex-col justify-center items-center gap-2">
        <div className="text-sm font-light">Total SIR Locked</div>
        <div className="text-2xl font-semibold font-lora">
          {parseFloat(formatUnits(totalSIRLocked ?? 0n, 18)).toFixed(4)}
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
