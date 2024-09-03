import LeverageLiquidityContent from "@/components/leverage-liquidity/leverageLiquidityContent";
import LeverageLiquidityPage from "@/components/leverage-liquidity/leverageLiquidityPage";
import MintForm from "@/components/leverage-liquidity/mintForm/mintForm";

import AuctionPage from "@/components/auction/auctionPage";

import { api } from "@/trpc/server";

export default async function Home() {
  const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      {/* <LeverageLiquidityPage title={"Take on Leverage"}>
        <LeverageLiquidityContent
          isApe
          form={<MintForm isApe vaultsQuery={vaultQuery} />}
          vaultsQuery={vaultQuery}
        ></LeverageLiquidityContent>
      </LeverageLiquidityPage> */}
      <AuctionPage />
    </main>
  );
}
