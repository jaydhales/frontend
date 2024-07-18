import LeveragePage from "@/components/leverage/leveragePage";
import LeverageTabs from "@/components/leverage/leverageTabs";
import { MintForm } from "@/components/shared/mintForm/mint-form";

import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LeveragePage>
        <LeverageTabs
          isApe
          form={<MintForm isApe vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        />
      </LeveragePage>
    </main>
  );
}
