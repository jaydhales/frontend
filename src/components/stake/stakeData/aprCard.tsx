import ToolTip from "@/components/ui/tooltip";
import { env } from "@/env";
import { executeGetDividendsPaid } from "@/server/queries/dividendsPaid";
import React from "react";
import z from "zod";

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
      error: z.null(),
    }),
  ),
});
const dividendsPaidSchema = z.object({
  data: z.object({
    dividends: z.nullable(
      z.object({
        ethAmount: z.string(),
        stakedAmount: z.string(),
      }),
    ),
  }),
});
export default async function AprCard() {
  const url =
    "https://api.g.alchemy.com/prices/v1/tokens/by-symbol?symbols=ETH";
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${env.ALCHEMY_BEARER}`,
  };

  const response = (await fetch(url, {
    method: "GET",
    headers: headers,
  }).then((response) => response.json())) as unknown;
  const parsed = priceSchema.safeParse(response);
  if (!parsed.success) {
    console.log(parsed.error);
  }

  const result = await executeGetDividendsPaid();

  const parsedDividends = dividendsPaidSchema.safeParse(result);
  if (parsedDividends.success) {
    console.log(parsedDividends.data.data, "success");
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-secondary py-2">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="px-2 text-sm text-gray-300">Staking APR</div>
        <ToolTip>Tool tip info.</ToolTip>
        {/* <AprInfo></AprInfo> */}
      </div>
      <div className="font-lora text-2xl ">
        <h1>${parsed.success ? parsed.data.data[0]?.prices[0]?.value : "0"}</h1>
      </div>
    </div>
  );
}
