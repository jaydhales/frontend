import type { TMintFormFields, TVaults } from "@/lib/types";
import { api } from "@/trpc/react";
import { useMemo } from "react";

interface Props {
  formData: TMintFormFields;
  vaultsQuery: TVaults;
}
/**
 * Narrows down dropdown items(vaults) when other dropdowns are selected.
 */
export function useFilterVaults({ formData, vaultsQuery }: Props) {
  console.log(formData, "FORM DATA");
  const { data } = api.vault.getVaults.useQuery({
    filterDebtToken: formData.versus.split(",")[0],
    filterCollateralToken: formData.long.split(",")[0],
    filterLeverage: formData.leverageTier,
  });
  // have a second query for address searches

  // turn into a set
  // all unique values

  const { versus, leverageTiers, long } = useMemo(() => {
    if (vaultsQuery?.vaults === undefined)
      return { versus: [], leverageTiers: [], long: [] };
    const matchingFetchPools = data?.vaults;
    const long = [
      ...new Map(
        matchingFetchPools?.map((item) => [item.collateralToken, item]),
      ).values(),
    ];
    const versus = [
      ...new Map(
        matchingFetchPools?.map((item) => [item.debtToken, item]),
      ).values(),
    ];
    const leverageTiers = [
      ...new Set(matchingFetchPools?.map((p) => p.leverageTier)),
    ];
    return { leverageTiers, long, versus };
  }, [data?.vaults, vaultsQuery?.vaults]);
  return { versus, leverageTiers, long };
}

// --=== Deprecated Logic without query ==--
//
// const matchingPools = vaultsQuery?.vaults.filter((p) => {
//   if (formData.leverageTier) {
//     if (p.leverageTier !== parseInt(formData.leverageTier)) {
//       return false;
//     }
//   }
//   if (formData.long) {
//     if (formData.long.split(",")[0] !== p.collateralToken) {
//       return false;
//     }
//   }
//   if (formData.versus) {
//     if (formData.versus.split(",")[0] !== p.debtToken) {
//       return false;
//     }
//   }
//   return true;
// });
