import LeverageLiquidityContent from "@/components/leverage-liquidity/leverageLiquidityContent";
import { MintForm } from "@/components/leverage-liquidity/mintForm/mint-form";
import LeveragePage from "@/components/leverage/leveragePage";

import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LeveragePage>
        <LeverageLiquidityContent
          isApe
          form={<MintForm isApe vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        ></LeverageLiquidityContent>
      </LeveragePage>
    </main>
  );
}
