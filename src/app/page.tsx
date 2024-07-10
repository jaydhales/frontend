import LeveragePage from "@/components/leverage/leveragePage";
import LeverageTabs from "@/components/leverage/leverageTabs";
import StakePage from "@/components/stake/stakePage";
import StakeTabs from "@/components/stake/stakeTabs";

import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      {/* <LeveragePage>
        <LeverageTabs vaultsQuery={vaultQuery} />
      </LeveragePage> */}
      <StakePage>
        <StakeTabs></StakeTabs>
      </StakePage>
    </main>
  );
}
