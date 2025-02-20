"use server";
import Show from "@/components/shared/show";
import { SIR_USD_PRICE } from "@/data/constants";
import { env } from "@/env";
import { formatNumber } from "@/lib/utils";
import { calculateApr } from "@/lib/utils/calculations";
import { executeGetDividendsPaid } from "@/server/queries/dividendsPaid";
import React from "react";
import { formatUnits, parseUnits } from "viem";
import z from "zod";
// query APR
// get latest timestamp
// querySubgraph for events after timestamp
const priceSchema = z.object({
  data: z.array(
    z.object({
      symbol: z.string(),
      prices: z.array(
        z.object({
          currency: z.string(),
          lastUpdatedAt: z.string(),
          value: z.string(),
        }),
      ),
      error: z.null().optional(),
    }),
  ),
});

// {
//   dividends: { ethAmount: '9535018543666960', stakedAmount: '84597856160006079' }
// }
const dividendsPaidSchema = z.object({
  dividends: z.nullable(
    z.object({
      ethAmount: z.string(),
      stakedAmount: z.string(),
    }),
  ),
});

const url = "https://api.g.alchemy.com/prices/v1/tokens/by-symbol?symbols=ETH";
const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${env.ALCHEMY_BEARER}`,
};
export default async function AprCard() {
  const ethPriceRequest = fetch(url, {
    method: "GET",
    headers: headers,
  }).then((response) => response.json());
  const dividendsPaidRequest = await executeGetDividendsPaid({ timestamp: 1 });
  const [ethPriceResponse, dividendsPaidResponse] = await Promise.allSettled([
    ethPriceRequest,
    dividendsPaidRequest,
  ]);

  console.log(
    ethPriceResponse.status === "fulfilled" ? ethPriceResponse.value : "",
    "ETH RESPONSE",
  );
  const safePrice = priceSchema.safeParse(
    ethPriceResponse.status === "fulfilled" ? ethPriceResponse.value : null,
  );
  console.log(
    ethPriceResponse.status === "fulfilled" ? ethPriceResponse.value : "",
  );
  const safeDividends = dividendsPaidSchema.safeParse(
    dividendsPaidResponse.status === "fulfilled"
      ? dividendsPaidResponse.value
      : null,
  );

  //APR will be 0 if error occurs
  if (!safeDividends.success) {
    console.error("Dividends Error", safeDividends.error);
  }
  if (!safePrice.success) {
    console.log(safePrice.error);
  }
  let APR = 0n;
  if (safePrice.success && safeDividends.success) {
    APR = calculateApr({
      ethDividends: parseUnits(
        safeDividends.data.dividends?.ethAmount ?? "0",
        18,
      ),
      sirUsdPrice: SIR_USD_PRICE as string,
      ethUsdPrice: safePrice.data.data[0]?.prices[0]?.value ?? "0",
      amountOfStakedSir: parseUnits(
        safeDividends.data.dividends?.stakedAmount ?? "0",
        12,
      ),
    });
  }
  console.log(APR, "APR");
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary py-2">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="px-2 text-sm text-gray-300">Staking APR</div>
        {/* <ToolTip>Annual</ToolTip> */}
        {/* <AprInfo></AprInfo> */}
      </div>
      <div className="font-lora text-2xl ">
        <Show when={APR > 0n} fallback={<h1>N/A</h1>}>
          <h1>{formatNumber(formatUnits(APR, 12))}%</h1>
        </Show>
      </div>
    </div>
  );
}
