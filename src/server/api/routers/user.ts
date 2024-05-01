import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { readContract } from "@/lib/viemClient";
import { erc20Abi } from "viem";
import { type TAddressString } from "@/lib/types";

export const userRouter = createTRPCRouter({
  getBalance: publicProcedure
    .input(
      z.object({
        userAddress: z.string().startsWith("0x").optional(),
        tokenAddress: z.string().startsWith("0x").optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.tokenAddress || !input.userAddress) {
        return {};
      }
      const bal = await readContract({
        address: input.tokenAddress as TAddressString,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [input.userAddress as TAddressString],
      });
      return {
        tokenBalance: bal,
      };
    }),
});
// create: publicProcedure
//   .input(z.object({ name: z.string().min(1) }))
//   .mutation(async ({ input }) => {
//     // simulate a slow db call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     user = { id: user.id + 1, name: input.name };
//     return user;
//   }),
