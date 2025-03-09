import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { rpcViemClient } from "@/lib/viemClient";
import { SirContract } from "@/contracts/sir";
import type { TAuctions } from "@/lib/types";
import { AUCTION_DURATION } from "@/components/auction/__constants";

export const auctionRouter = createTRPCRouter({
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
        (acc, _, index) => {
          const _data = auctions[index]?.result as unknown as TAuctions;

          if (_data.startTime > 0) {
            if (
              Math.floor(Date.now() + 86400000 / 1000) <
              _data.startTime + AUCTION_DURATION
            ) {
              acc.ongoing.push({ ..._data, tokenIndex: index });
            } else {
              if (_data.bid > 0n)
                acc.past.push({ ..._data, tokenIndex: index });
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
