import { ApeContract } from "@/contracts/ape";
import { AssistantContract } from "@/contracts/assistant";
import type { TAddressString } from "@/lib/types";
import { multicall, readContract } from "@/lib/viemClient";
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
  getApeParams: publicProcedure
    .input(z.object({ address: z.string().startsWith("0x") }))
    .query(async ({ input }) => {
      console.log(input.address);
      const result = await multicall({
        contracts: [
          {
            ...ApeContract,
            address: input.address as TAddressString,
            functionName: "leverageTier",
          },
          {
            ...ApeContract,
            address: input.address as TAddressString,
            functionName: "debtToken",
          },
          {
            ...ApeContract,
            address: input.address as TAddressString,
            functionName: "collateralToken",
          },
        ],
      });
      console.log({ result });
      return {
        leverageTier: result[0].result,
        debtToken: result[1].result,
        collateralToken: result[2].result,
      };
    }),

  quoteBurn: publicProcedure
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
        throw Error("Undefined Param.");
      }

      const result = await readContract({
        ...AssistantContract,
        functionName: "quoteBurn",
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

      return result;
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
          abi: AssistantContract.abi,
          address: AssistantContract.address,
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
        // console.log(e);
        return;
      }
    }),
});
