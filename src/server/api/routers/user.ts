import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getBalance, multicall, readContract } from "@/lib/viemClient";
import { erc20Abi } from "viem";
import { type TAddressString } from "@/lib/types";
import { executeGetUserVaultsQuery } from "@/server/queries/vaults";

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
      console.log(input, "INPUT");
      if (!input.tokenAddress || !input.userAddress || !input.spender) {
        return {};
      }
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
  getEthBalance: publicProcedure
    .input(
      z.object({
        userAddress: z.string().startsWith("0x").length(42).optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input?.userAddress) {
        throw new Error("No user address provided.");
      }
      const bal = await getBalance({
        address: input.userAddress as TAddressString,
      });
      return bal;
    }),
  getApeBalance: publicProcedure
    .input(
      z.object({
        address: z.string().startsWith("0x").length(42).optional(),
        user: z.string().startsWith("0x").length(42).optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.address || !input.user) {
        throw Error("Null pointer");
      }
      const result = await readContract({
        abi: erc20Abi,
        address: input.address as TAddressString,
        functionName: "balanceOf",
        args: [input.user as TAddressString],
      });

      return result;
    }),

  getPositions: publicProcedure
    .input(
      z.object({ address: z.string().startsWith("0x").length(42).optional() }),
    )
    .query(async ({ input }) => {
      console.log({ input });
      if (!input.address) {
        return;
      }
      const result = (await executeGetUserVaultsQuery({
        user: input.address as TAddressString,
      })) as UserQuery;

      return result;
    }),
});
//todo use ZOD
type UserQuery = {
  userPositions: {
    User: string;
    leverageTier: string;
    balance: bigint;
    APE: string;
    collateralToken: string;
    debtToken: string;
    collateralSymbol: string;
    debtSymbol: string;
  }[];
};

// create: publicProcedure
//   .input(z.object({ name: z.string().min(1) }))
//   .mutation(async ({ input }) => {
//     // simulate a slow db call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     user = { id: user.id + 1, name: input.name };
//     return user;
//   }),
