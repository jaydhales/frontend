import LeverageLiquidityContent from "@/components/leverage-liquidity/leverageLiquidityContent";
import LeverageLiquidityPage from "@/components/leverage-liquidity/leverageLiquidityPage";
import { MintForm } from "@/components/leverage-liquidity/mintForm/mint-form";
import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();
  console.log(vaultQuery, "Vault Query");
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LeverageLiquidityPage title="Provide Liquidity">
        <LeverageLiquidityContent
          isApe
          form={<MintForm isApe vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        ></LeverageLiquidityContent>
      </LeverageLiquidityPage>
    </main>
  );
}
