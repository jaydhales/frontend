import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { getOngoingAuctions } from "@/server/queries/auctions";

export const auctionRouter = createTRPCRouter({
  getOngoingAuctions: publicProcedure
    .input(z.string().startsWith("0x").length(42).optional())
    .query(async ({ input: user }) => {
      const auctions = await getOngoingAuctions(user, "ongoing");
      return auctions.auctions;
    }),

  getExpiredAuctions: publicProcedure
    .input(z.string().startsWith("0x").length(42).optional())
    .query(async ({ input: user }) => {
      const auctions = await getOngoingAuctions(user, "expired");
      return auctions.auctions;
    }),

  getallAuctions: publicProcedure
    .input(z.string().startsWith("0x").length(42).optional())
    .query(async ({ input: user }) => {
      const auctions = await getOngoingAuctions(user);
      return auctions.auctions;
    }),
});
