import LeverageLiquidityContent from "@/components/leverage-liquidity/leverageLiquidityContent";
import LeverageLiquidityPage from "@/components/leverage-liquidity/leverageLiquidityPage";
import MintForm from "@/components/leverage-liquidity/mintForm/mintForm";
import type {
  TCollateral,
  TCollateralResp,
  TVaults,
  VaultFieldFragment,
} from "@/lib/types";
import { readContract } from "@/lib/viemClient";
import { executeVaultsQuery } from "@/server/queries/vaults";
import { kv } from "@vercel/kv";
import { randomInt, createHash } from "crypto";
import { AssistantContract } from "@/contracts/assistant";
import { parseUnits } from "viem";
import { off } from "process";

// import { unstable_cache } from "next/cache";
export const revalidate = 10;
const getVaults = async () => {
  const vaults = await executeVaultsQuery();
  const randomI = randomInt(1000);
  return { vaults, randomI };
};
const getCollateralAmounts = async (vaultIds: number[]) => {
  const result = await readContract({
    ...AssistantContract,
    functionName: "getReserves",
    args: [[...vaultIds]],
  });
  return result;
};
export default async function Home({ params }: { params: { slug: string } }) {
  console.log(params);
  const offset = parseInt(params.slug);
  let vaultQuery;
  const vaults = await kv.get("vaults");
  if (!vaults) {
    const v = await getVaults();
    vaultQuery = v.vaults;
    // Don't block with await only need for next cache
    kv.set("vaults", JSON.stringify(vaultQuery), { ex: 60 * 4 }).catch((e) => {
      console.log(e, "Failed to store in KV");
    });
  } else {
    vaultQuery = vaults as { vaults: VaultFieldFragment[] };
  }
  let pageVaults: VaultFieldFragment[] | undefined;
  if (isFinite(offset)) {
    pageVaults = vaultQuery?.vaults.slice(offset, offset + 10);
  } else {
    pageVaults = vaultQuery?.vaults;
  }
  const vaultIds = pageVaults?.map((v) => parseInt(v.vaultId));
  const vaultIdHash = createHash("md5")
    .update(JSON.stringify(vaultIds))
    .digest("hex");
  let collateral: TCollateral;
  const resp = await kv.get(vaultIdHash);

  if (resp) {
    collateral = (resp as TCollateralResp).map((c) => {
      return {
        reserveLPers: parseUnits(c.reserveLPers, 0),
        reserveApes: parseUnits(c.reserveApes, 0),
        tickPriceX42: parseUnits(c.tickPriceX42, 0),
      };
    });
  } else {
    collateral = await getCollateralAmounts(vaultIds ?? []);
  }

  kv.set(
    vaultIdHash,
    JSON.stringify(
      collateral.map((c) => ({
        ...c,
        reserveApes: c.reserveApes.toString(),
        reserveLPers: c.reserveLPers.toString(),
        tickPriceX42: c.tickPriceX42.toString(),
      })),
    ),
    {
      ex: 60 * 5,
    },
  ).catch((e) => {
    console.log("Error setting vaultIdHash", e);
  });

  vaultQuery = {
    vaults: vaultQuery?.vaults.map((v, i) => ({
      ...v,
      apeCollateral: collateral[i]?.reserveApes ?? 0n,
      teaCollateral: collateral[i]?.reserveLPers ?? 0n,
    })),
  } as TVaults;
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
