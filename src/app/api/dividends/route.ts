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
import { formatUnits, parseUnits } from "viem";

import { kv } from "@vercel/kv";
import { randomInt } from "crypto";
//sleep
function sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}
const handler = async (req: NextRequest) => {
  if (!req.headers.get("authorization")?.includes(env.SECRET_KEY)) {
    return NextResponse.json({ success: false }, { status: 403 });
  }
  const uid = randomInt(0, 10000000000);
  const currentSyncId = await kv.get("syncId");
  if (currentSyncId !== null) {
    return NextResponse.json({ success: false }, { status: 200 });
  }
  await kv.set("syncId", uid);
  await sleep(600);
  const foundId = await kv.get("syncId");
  if (foundId !== uid) {
    return NextResponse.json({ success: false }, { status: 200 });
  }
  try {
    const lastPayout = await selectLastPayout();
    if (lastPayout[0]) {
      await syncPayouts({ timestamp: lastPayout[0].timestamp });
    } else {
      await syncPayouts({ timestamp: 0 });
    }
    const apr = await getAndCalculateLastMonthApr();
    if (!apr) return;
    const lastPayoutA = await selectLastPayout();
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
    await kv.set("syncId", null);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    await kv.set("syncId", null);
    return NextResponse.json({ success: false }, { status: 200 });
  }
};

export { handler as GET };
async function syncPayouts({ timestamp }: { timestamp: number }) {
  const dividendPaidEvents = await executeGetDividendGreaterThan({
    timestamp,
  });
  for (const e of dividendPaidEvents) {
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

    const ethDecimals = 10n ** 18n;
    const sirDecimals = 10n ** 12n;
    const ethInUsd = (ethParsed * ethUsdPriceBig) / ethDecimals;
    const sirInUSD = (sirParsed * sirUsdPriceBig) / sirDecimals;
    if (!ethPrice) continue;
    await insertPayout({
      timestamp: parseInt(e.timestamp),
      sirInUSD: sirInUSD.toString(),
      ethInUSD: ethInUsd.toString(),
    });
  }
}

async function getAndCalculateLastMonthApr() {
  let totalSirInUsd = 0n;
  let totalEthInUsd = 0n;
  const payouts = await selectLastMonthPayouts();
  console.log({ payouts });
  payouts.forEach((payout) => {
    totalSirInUsd += parseUnits(payout.sirInUSD, 0);
    totalEthInUsd += parseUnits(payout.ethInUSD, 0);
  });
  console.log({
    totalSirInUsd: formatUnits(totalSirInUsd, 12),
    totalEthInUsd: formatUnits(totalEthInUsd, 18),
  });
  if (totalSirInUsd === 0n) {
    return;
  }
  const result = (12n * totalEthInUsd) / totalSirInUsd;
  return result * 100n;
}
