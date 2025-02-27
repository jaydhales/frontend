import { executeGetDividendGreaterThan } from "@/server/queries/dividendsPaid";
import { api } from "@/trpc/server";
import React from "react";
import AprDisplay from "./aprDisplay";
import { syncDividends } from "@/lib/dividendsSync";
import { selectPayouts } from "@/lib/db/queries/select";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export const dynamic = "force-dynamic";

export default async function AprCard() {
  let apr = await api.divends.getApr();
  const dividendsPaidRequest = await executeGetDividendGreaterThan({
    timestamp: apr?.latestTimestamp ?? 0,
  });
  const paid = await executeGetDividendGreaterThan({ timestamp: 0 });
  console.log({ paid });
  const payouts = await selectPayouts();
  console.log(payouts, "PAYOUTS");
  console.log({ dividendsPaidRequest });
  if (dividendsPaidRequest.length) {
    await syncDividends();
    apr = await api.divends.getApr();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary py-2">
      <div className="flex w-full flex-row items-center justify-center">
        {/* Wrapped "Staking APR" with HoverCard */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="px-2 text-sm text-gray-300 cursor-pointer">
              Staking APR
            </div>
          </HoverCardTrigger>
          <HoverCardContent side="top" alignOffset={10}>
            <div className="mb-2 max-w-[200px] rounded-sm bg-white px-2 py-2 text-[13px] font-medium text-gray-800">
              <span>
                The APR is estimated from last month&apos;s dividend data.
                While SIR does not trade in secondary markets, we use the presale price of $0.00016542597.
              </span>
            </div>
          </HoverCardContent>
        </HoverCard>
        {/* <div className="px-2 text-sm text-gray-300">Staking APR</div> */}
      </div>
      <div className="font-normal text-2xl ">
        <AprDisplay currentApr={apr} />
      </div>
    </div>
  );
}
