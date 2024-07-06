import { LeverageMintForm } from "@/components/leverage/leverage-mint-form";
import LeveragePage from "@/components/leverage/leveragePage";
import LeverageTabs from "@/components/leverage/leverageTabs";
import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();

  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LeveragePage>
        <LeverageTabs
          form={<LeverageMintForm vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        />
      </LeveragePage>
    </main>
  );
}
