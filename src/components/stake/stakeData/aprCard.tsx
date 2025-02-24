"use server";
import Show from "@/components/shared/show";
import { selectCurrentApr } from "@/lib/db/queries/select";
import { formatNumber } from "@/lib/utils";
import { executeGetDividendGreaterThan } from "@/server/queries/dividendsPaid";
import { api } from "@/trpc/server";
import React from "react";
import { formatUnits, parseUnits } from "viem";

export default async function AprCard() {
  const apr = await selectCurrentApr();
  console.log(apr, "APR");
  const dividendsPaidRequest = await executeGetDividendGreaterThan({
    timestamp: apr?.latestTimestamp ?? 0,
  });
  if (dividendsPaidRequest.length) {
    // sync apr with new events
    // **DON'T BLOCK THREAD WITH AWAIT
    api.divends.syncDividendsApr().catch((e) => console.log(e));
  }

  const APR = parseUnits(apr?.apr ?? "0", 0);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary py-2">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="px-2 text-sm text-gray-300">Staking APR</div>
      </div>
      <div className="font-lora text-2xl ">
        <Show when={APR > 0n} fallback={<h1>N/A</h1>}>
          <h1>{formatNumber(formatUnits(APR, 12))}%</h1>
        </Show>
      </div>
    </div>
  );
}
