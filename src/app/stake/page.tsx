import StakePage from "@/components/stake/stakePage";
import StakeTabs from "@/components/stake/stakeTabs";
import { api } from "@/trpc/server";

export default async function Stake() {
  // const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <StakePage>
        {<StakeTabs />}
        {/*<LeverageTabs vaultsQuery={vaultQuery} />*/}
      </StakePage>
    </main>
  );
}
