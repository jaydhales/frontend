import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { multicall } from "@/lib/viemClient";
import { erc20Abi } from "viem";
import { type TAddressString } from "@/lib/types";

export const userRouter = createTRPCRouter({
  getBalance: publicProcedure
    .input(
      z.object({
        userAddress: z.string().startsWith("0x").optional(),
        tokenAddress: z.string().startsWith("0x").optional(),
        spender: z.string().startsWith("0x").optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.tokenAddress || !input.userAddress || !input.spender) {
        return {};
      }
      console.log(input.tokenAddress, input.userAddress);
      const [balance, allowance] = await multicall({
        contracts: [
          {
            address: input.tokenAddress as TAddressString,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [input.userAddress as TAddressString],
          },
          {
            address: input.tokenAddress as TAddressString,
            abi: erc20Abi,
            functionName: "allowance",
            args: [
              input.userAddress as TAddressString,
              input.spender as TAddressString,
            ],
          },
        ],
      });
      return {
        tokenBalance: balance,
        tokenAllowance: allowance,
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
