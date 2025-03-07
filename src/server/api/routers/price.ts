import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { ZVaultPrices } from "@/lib/schemas";

export const priceRouter = createTRPCRouter({
    // Returns the latest price for vault tokens by symbol
    getVaultPrices: publicProcedure
        .input(z.object({ collateralToken: z.string(), debtToken: z.string() }))
        .query(async ({ input }) => {
            const { collateralToken, debtToken } = input;
            console.log("-_".repeat(100), "Fetching vault prices for:", collateralToken, debtToken);

            const options = { method: "GET", headers: { accept: "application/json" } };

            const response = await fetch(
                `https://api.g.alchemy.com/prices/v1/${process.env.ALCHEMY_BEARER}/tokens/by-symbol?symbols=${collateralToken}&symbols=${debtToken}`,
                options
            );
            // Parse and validate the fetched JSON using ZVaultPrices
            return ZVaultPrices.parse(await response.json());
        }),
});