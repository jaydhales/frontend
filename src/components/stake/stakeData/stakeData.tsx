"use client";

import { api } from "@/trpc/react";
import { useEffect, useMemo } from "react";
import { formatUnits } from "viem";

import AprInfo from "@/components/stake/stakeData/aprInfo";

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
        <div className="text-sm font-medium">Total SIR Locked</div>
        {/* <div className="text-2xl font-semibold font-lora">
          {parseFloat(formatUnits(totalValueLocked ?? 0n, 12)).toFixed(4)}
        </div> */}
        <div className="text-2xl font-semibold font-lora">
          {(() => {
            const value = parseFloat(formatUnits(totalValueLocked ?? 0n, 12));
            if (value >= 1e9) {
              return (value / 1e9).toFixed(2) + "B";
            } else if (value >= 1e6) {
              return (value / 1e6).toFixed(2) + "M";
            } else if (value >= 1e3) {
              return Math.floor(value).toLocaleString();
            } else {
              return value.toFixed(2);
            }
          })()}
        </div>
      </div>

      <div className="bg-secondary rounded-md w-[47%] py-2 flex flex-col justify-center items-center gap-2">
        <div className="flex flex-row w-full items-center justify-center">
          <div className="text-sm font-medium px-2">Staking APR</div>
          <AprInfo></AprInfo>
        </div>
        <div className="text-2xl font-semibold font-lora">N/A</div>
      </div>
    </div>
  );
};

export default StakeData;
