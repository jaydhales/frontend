import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeVaultsQuery } from "@/server/queries/vaultTable";

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
});
