"use client";

import { api } from "@/trpc/react";
import { useMemo } from "react";
import { formatUnits } from "viem";
import ToolTip from "@/components/ui/tooltip";
import { useGetStakedSir } from "@/components/shared/hooks/useGetStakedSir";

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
  const userStakedSir = useGetStakedSir();

  return (
    <div className="mx-auto grid w-[600px] grid-cols-3 gap-x-4 py-[24px] ">
      <div className="flex flex-col  items-center justify-center gap-2 rounded-md bg-secondary py-2">
        <div className="text-sm font-medium text-gray-300">
          Total Staked SIR
        </div>
        {/* <div className="text-2xl font-semibold font-lora">
          {parseFloat(formatUnits(totalValueLocked ?? 0n, 12)).toFixed(4)}
        </div> */}
        <div className="font-lora text-2xl font-normal">
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

      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary py-2">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="px-2 text-sm text-gray-300">Your Staked SIR</div>
          {/* <ToolTip>Tool tip info.</ToolTip> */}
        </div>
        <div className="font-lora text-2xl ">
          {formatUnits(userStakedSir, 12)}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary py-2">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="px-2 text-sm text-gray-300">Staking APR</div>
          <ToolTip>Tool tip info.</ToolTip>
          {/* <AprInfo></AprInfo> */}
        </div>
        <div className="font-lora text-2xl ">N/A</div>
      </div>
    </div>
  );
};

export default StakeData;
