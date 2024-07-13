import LeverageTabs from "@/components/leverage/leverageTabs";
import LiquidityPage from "@/components/liquidity/liquidityPage";
import { MintForm } from "@/components/shared/mintForm/mint-form";
import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();

  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LiquidityPage>
        <LeverageTabs
          isApe={false}
          form={<MintForm isApe={false} vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        />
      </LiquidityPage>
    </main>
  );
}
