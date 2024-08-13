import LeverageLiquidityContent from "@/components/leverage-liquidity/leverageLiquidityContent";
import { MintForm } from "@/components/leverage-liquidity/mintForm/mint-form";
import LiquidityPage from "@/components/liquidity/liquidityPage";
import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LiquidityPage>
        <LeverageLiquidityContent
          isApe
          form={<MintForm isApe vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        ></LeverageLiquidityContent>
      </LiquidityPage>
    </main>
  );
}
