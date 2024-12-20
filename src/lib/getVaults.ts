import { kv } from "@vercel/kv";
import { createHash } from "crypto";
import { readContract } from "./viemClient";
import { AssistantContract } from "@/contracts/assistant";
import type {
  TCollateral,
  TVaults,
  TCollateralResp,
  VaultFieldFragment,
} from "./types";
import { executeVaultsQuery } from "@/server/queries/vaults";
import { parseUnits } from "viem";
import { executeGetBlockNumber } from "@/server/queries/utils";

const getVaults = async ({
  filterLeverage,
  filterCollateralToken,
  filterDebtToken,
  filterLastId,
}: {
  filterLeverage?: string;
  filterLastId?: string;
  filterDebtToken?: string;
  filterCollateralToken?: string;
}) => {
  const vaults = await executeVaultsQuery({
    filterLeverage,
    filterCollateralToken,
    filterDebtToken,
    filterLastId,
  });
  return { vaults };
};
const getCollateralAmounts = async (vaultIds: number[]) => {
  if (vaultIds.length === 0) return [];
  const result = await readContract({
    ...AssistantContract,
    functionName: "getReserves",
    args: [[...vaultIds]],
  });
  return result;
};
export const getVaultsForTable = async (
  offset: number,
  filters?: {
    filterLastId?: string;
    filterLeverage?: string;
    filterDebtToken?: string;
    filterCollateralToken?: string;
  },
) => {
  let vaultQuery;
  const v = await getVaults(filters ?? {});

  vaultQuery = v.vaults;

  let pageVaults: VaultFieldFragment[] | undefined;
  if (isFinite(offset)) {
    pageVaults = vaultQuery?.vaults.slice(offset, offset + 10);
  } else {
    pageVaults = vaultQuery?.vaults;
  }
  const vaultIds = pageVaults?.map((v) => parseInt(v.vaultId));
  // const vaultIdHash = createHash("md5")
  //   .update(JSON.stringify(vaultIds))
  //   .digest("hex");
  let collateral: TCollateral;
  // const resp = await kv.get(vaultIdHash + "1");
  // Grab collteral
  if (false) {
    // collateral = (resp as TCollateralResp).map((c) => {
    //   return {
    //     reserveLPers: parseUnits(c.reserveLPers, 0),
    //     reserveApes: parseUnits(c.reserveApes, 0),
    //     tickPriceX42: parseUnits(c.tickPriceX42, 0),
    //   };
    // });
  } else {
    try {
      collateral = await getCollateralAmounts(vaultIds ?? []);
    } catch (e) {
      collateral = [];
      console.log(e);
    }
  }

  vaultQuery = {
    vaults: vaultQuery?.vaults.map((v, i) => ({
      ...v,
      apeCollateral: collateral[i]?.reserveApes ?? 0n,
      teaCollateral: collateral[i]?.reserveLPers ?? 0n,
    })),
  } as TVaults;
  return { vaultQuery };
};
