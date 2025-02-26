import { executeGetDividendGreaterThan } from "@/server/queries/dividendsPaid";
import { api } from "@/trpc/server";
import React from "react";
import AprDisplay from "./aprDisplay";
import { syncDividends } from "@/lib/dividendsSync";
import { selectPayouts } from "@/lib/db/queries/select";
import { deleteCurrentApr, deletePayouts } from "@/lib/db/queries/insert";
export const dynamic = "force-dynamic";
export default async function AprCard() {
  let apr = await api.divends.getApr();
  const dividendsPaidRequest = await executeGetDividendGreaterThan({
    timestamp: apr?.latestTimestamp ?? 0,
  });
  const paid = await executeGetDividendGreaterThan({ timestamp: 0 });
  console.log({ paid });
  await deletePayouts();
  await deleteCurrentApr();
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
        <div className="px-2 text-sm text-gray-300">Staking APR</div>
      </div>
      <div className="font-lora text-2xl ">
        <AprDisplay currentApr={apr} />
      </div>
    </div>
  );
}
