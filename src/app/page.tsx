import LeverageLiquidityContent from "@/components/leverage-liquidity/leverageLiquidityContent";
import LeverageLiquidityPage from "@/components/leverage-liquidity/leverageLiquidityPage";
import MintForm from "@/components/leverage-liquidity/mintForm/mintForm";
import { executeVaultsQuery } from "@/server/queries/vaults";

import { randomInt } from "crypto";
import { unstable_cache } from "next/cache";
export const revalidate = 10;
const getVaults = unstable_cache(
  async () => {
    const vaults = await executeVaultsQuery();
    const randomI = randomInt(1000);
    return { vaults, randomI };
  },
  [],
  { revalidate: 3 },
);
const test = unstable_cache(async () => {
  const randomI = randomInt(1000);
  return randomI;
});
export default async function Home() {
  const { vaults: vaultQuery, randomI } = await getVaults();
  const testR = await test();
  console.log(testR, randomI, "rando ids ");
  return (
    <main className="flex  flex-col items-center justify-center text-white">
      <LeverageLiquidityPage title={"Take on Leverage"}>
        <LeverageLiquidityContent
          isApe
          form={<MintForm isApe vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        ></LeverageLiquidityContent>
      </LeverageLiquidityPage>
    </main>
  );
}
