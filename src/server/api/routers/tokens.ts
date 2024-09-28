import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { searchTokens } from "@/lib/tokens/queries";
import db from "@/lib/tokens/db";
export const tokensRouter = createTRPCRouter({
  searchTokens: publicProcedure
    .input(
      z.object({
        searchTerm: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const rows = await searchTokens(db, input.searchTerm);
      return rows;
    }),
});
