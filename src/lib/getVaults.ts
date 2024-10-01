import { api } from "@/trpc/server";
import { randomInt } from "crypto";
import { cache } from "react";

// export const revalidate = 6000;
export const getVaults = cache(async () => {
  const vaults = await api.vault.getVaults();
  return { vaults: vaults, randomId: randomInt(100) };
});
