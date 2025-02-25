import { SIR_USD_PRICE } from "@/data/constants";
import { env } from "@/env";
import { getEthUsdPriceOnDate } from "@/lib/coingecko";
import {
  insertOrUpdateCurrentApr,
  insertPayout,
} from "@/lib/db/queries/insert";
import {
  selectLastMonthPayouts,
  selectLastPayout,
} from "@/lib/db/queries/select";
import { executeGetDividendGreaterThan } from "@/server/queries/dividendsPaid";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseUnits } from "viem";

const handler = async (req: NextRequest) => {
  if (!req.headers.get("authorization")?.includes(env.SECRET_KEY)) {
    return NextResponse.json({ success: false }, { status: 403 });
  }
  const lastPayout = await selectLastPayout();
  console.log({ lastPayout });
  if (lastPayout[0]) {
    await syncPayouts({ timestamp: lastPayout[0].timestamp });
  } else {
    await syncPayouts({ timestamp: 0 });
  }
  const apr = await getAndCalculateLastMonthApr();
  if (!apr) return;
  const lastPayoutA = await selectLastPayout();
  console.log({ lastPayoutA });
  if (lastPayoutA[0]) {
    await insertOrUpdateCurrentApr({
      latestTimestamp: lastPayoutA[0].timestamp,
      apr: apr.toString(),
    });
  } else {
    console.error("Something went wrong.");
    await insertOrUpdateCurrentApr({
      latestTimestamp: 0,
      apr: apr.toString(),
    });
  }
  return NextResponse.json({ success: true }, { status: 200 });
};

export { handler as GET };
async function syncPayouts({ timestamp }: { timestamp: number }) {
  const dividendPaidEvents = await executeGetDividendGreaterThan({
    timestamp,
  });
  for (const e of dividendPaidEvents) {
    console.log(e);
    const ethPrice = await getEthUsdPriceOnDate({
      timestamp: parseInt(e.timestamp),
    });
    if (!ethPrice) {
      throw new Error("Could not get eth price!");
    }
    const ethParsed = parseUnits(e.ethAmount, 0);
    const sirParsed = parseUnits(e.stakedAmount, 0);
    const sirUsdPriceBig = parseUnits(SIR_USD_PRICE, 12);
    const ethUsdPriceBig = parseUnits(ethPrice.toString(), 18);
    if (!ethPrice) continue;
    await insertPayout({
      timestamp: parseInt(e.timestamp),
      sirInUSD: (sirParsed * sirUsdPriceBig).toString(),
      ethInUSD: (ethParsed * ethUsdPriceBig).toString(),
    });
  }
}

async function getAndCalculateLastMonthApr() {
  let totalSirInUsd = 0n;
  let totalEthInUsd = 0n;
  const payouts = await selectLastMonthPayouts();
  payouts.forEach((payout) => {
    totalSirInUsd += parseUnits(payout.sirInUSD, 0);
    totalEthInUsd += parseUnits(payout.ethInUSD, 0);
  });
  if (totalSirInUsd === 0n) {
    return;
  }
  const result = (12n * totalEthInUsd) / totalSirInUsd;
  return result * 100n;
}
