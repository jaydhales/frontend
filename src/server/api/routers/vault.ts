import { Assistant } from "@/contracts/assistant";
import { TAddressString } from "@/lib/types";
import { readContract } from "@/lib/viemClient";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeVaultsQuery } from "@/server/queries/vaultTable";
import { parseUnits } from "viem";
import { z } from "zod";
export const vaultRouter = createTRPCRouter({
  getVaults: publicProcedure.query(async ({}) => {
    try {
      const vaults = await executeVaultsQuery();
      console.log({ vaults });
      return { vaults };
    } catch (e) {
      console.log(e, "ERROR");
      return;
    }
  }),
  quoteMint: publicProcedure
    .input(
      z.object({
        debtToken: z.string().startsWith("0x").optional(),
        collateralToken: z.string().startsWith("0x").optional(),
        leverageTier: z.number().optional(),
        amount: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      if (
        !input.collateralToken ||
        !input.debtToken ||
        input.leverageTier === undefined ||
        input.amount === undefined
      ) {
        return;
      }
      console.log(input);
      try {
        const quote = await readContract({
          abi: Assistant.abi,
          address: Assistant.address,
          functionName: "quoteMint",
          args: [
            true,
            {
              debtToken: input.debtToken as TAddressString,
              collateralToken: input.collateralToken as TAddressString,
              leverageTier: input.leverageTier,
            },
            parseUnits(input.amount, 18),
          ],
        });
        return quote;
      } catch (e) {
        console.log(e);
        return;
      }
    }),
});
