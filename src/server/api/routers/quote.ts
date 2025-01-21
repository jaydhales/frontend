import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { UniswapQuoterV2 } from "@/contracts/uniswap-quoterv2";
import { readContract } from "@/lib/viemClient";
import { parseUnits } from "viem";
import type { TAddressString } from "@/lib/types";
export const quoteRouter = createTRPCRouter({
  getQuote: publicProcedure
    .input(
      z.object({
        poolAddress: z.string().startsWith("0x").length(42),
        amount: z.string(),
        decimals: z.number(),
        tokenAddressB: z.string().startsWith("0x").length(42),
      }),
    )
    .query(async ({ input }) => {
      const read = await readContract({
        ...UniswapQuoterV2,
        functionName: "quoteExactInputSingle",
        args: [
          input.poolAddress as TAddressString,
          parseUnits(input.amount, input.decimals),
        ],
      });
      return read;
    }),
});
