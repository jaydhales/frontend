import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { ZVaultPrices } from "@/lib/schemas";

export const priceRouter = createTRPCRouter({
    // Returns the latest price for vault tokens by symbol
    getVaultPrices: publicProcedure
        .input(z.object({ depositToken: z.string(), collateralToken: z.string() }))
        .query(async ({ input }) => {
            const { depositToken, collateralToken } = input;
            console.log("-_".repeat(100), "Fetching vault prices for:", depositToken, collateralToken);

            const options = { method: "GET", headers: { accept: "application/json" } };

            const response = await fetch(
                `https://api.g.alchemy.com/prices/v1/${process.env.ALCHEMY_BEARER}/tokens/by-symbol?symbols=${depositToken}&symbols=${collateralToken}`,
                options
            );
            // Parse and validate the fetched JSON using ZVaultPrices
            return ZVaultPrices.parse(await response.json());
        }),
});