import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { rpcViemClient } from "@/lib/viemClient";
import { SirContract } from "@/contracts/sir";
import { parseUnits, type Address } from "viem";
import type { TAuctions } from "@/lib/types";
import { AUCTION_DURATION } from "@/components/auction/__constants";

export const auctionRouter = createTRPCRouter({
  simulateCollectFeesAndStartAuction: publicProcedure
    .input(z.string().startsWith("0x").length(42))
    .query(async ({ input }) => {
      const sim = await rpcViemClient.simulateContract({
        ...SirContract,
        functionName: "collectFeesAndStartAuction",
        args: [input as Address],
      });

      return sim.request;
    }),

  simulateBid: publicProcedure
    .input(
      z.object({
        token: z.string().startsWith("0x").length(42),
        amount: z.string(),
        tokenDecimals: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const sim = await rpcViemClient.simulateContract({
        ...SirContract,
        functionName: "bid",
        args: [
          input.token as Address,
          parseUnits(input.amount, input.tokenDecimals),
        ],
      });

      return sim.request;
    }),

  getOngoingAuctions: publicProcedure
    .input(z.array(z.string().startsWith("0x").length(42)))
    .query(async ({ input }) => {
      const auctions = await rpcViemClient.multicall({
        contracts: input.map((address) => ({
          ...SirContract,
          functionName: "auctions",
          args: [address],
        })),
      });

      return input.reduce<Record<"ongoing" | "past", TAuctions[]>>(
        (acc, address, index) => {
          const _data = auctions[index]?.result as unknown as TAuctions;
          if (_data.startTime > 0) {
            if (Date.now() / 1000 < _data.startTime + AUCTION_DURATION) {
              acc.ongoing.push(_data);
            } else {
              acc.past.push(_data);
            }
          }
          return acc;
        },
        {
          ongoing: [],
          past: [],
        },
      );
    }),
});
