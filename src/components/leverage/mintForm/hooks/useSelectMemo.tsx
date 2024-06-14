import type { TMintFormFields, TVaults } from "@/lib/types";
import { useMemo } from "react";

interface Props {
  formData: TMintFormFields;
  vaultsQuery: TVaults;
}
/**
 * Narrows down dropdown items when other dropdowns are select.
 */
export function useSelectMemo({ formData, vaultsQuery }: Props) {
  const { versus, leverageTiers, long } = useMemo(() => {
    if (vaultsQuery?.vaults.vaults === undefined)
      return { versus: [], leverageTiers: [], long: [] };
    const matchingPools = vaultsQuery?.vaults.vaults.filter((p) => {
      if (formData.leverageTier) {
        if (p.leverageTier !== parseInt(formData.leverageTier)) {
          return false;
        }
      }
      if (formData.long) {
        if (formData.long.split(",")[0] !== p.collateralToken) {
          return false;
        }
      }
      if (formData.versus) {
        if (formData.versus.split(",")[0] !== p.debtToken) {
          return false;
        }
      }
      return true;
    });

    const long = [
      ...new Map(
        matchingPools.map((item) => [item.collateralToken, item]),
      ).values(),
    ];
    const versus = [
      ...new Map(matchingPools.map((item) => [item.debtToken, item])).values(),
    ];
    const leverageTiers = [
      ...new Set(matchingPools.map((p) => p.leverageTier)),
    ];
    return { leverageTiers, long, versus };
  }, [
    formData.leverageTier,
    formData.long,
    formData.versus,
    vaultsQuery?.vaults.vaults,
  ]);
  return { versus, leverageTiers, long };
}

// enum DropsList {
//   "leverageTier" = 1,
//   "versus" = 2,
//   "long" = 3,
// }

// const [matchingPools, setMatchingPools] = useState<TPool[]>(mockPools);
// const [firstSelected, setfirstSelected] = useState<DropsList | undefined>();
// const [secondSelected, setSecondSelected] = useState<DropsList | undefined>();
// useEffect(() => {
//   // TODO
//   // CHECK IF firstSelected IS ALREADY SET
//   if (firstSelected) return;
//   if (formData.leverageTier) {
//     const newPools = mockPools.filter(
//       (p) =>
//         LeverageTiers[p.leverageTier] ===
//         LeverageTiers[parseInt(formData.leverageTier) as LeverageTier],
//     );
//     setfirstSelected(DropsList.leverageTier);
//     setMatchingPools(newPools);
//   }
//   if (formData.versus) {
//     const newPools = mockPools.filter(
//       (p) => p.collateralToken === formData.versus,
//     );

//     setfirstSelected(DropsList.versus);
//     setMatchingPools(newPools);
//   }
//   if (formData.long) {
//     const newPools = mockPools.filter((p) => {
//       return p.debtToken === formData.long;
//     });

//     setfirstSelected(DropsList.long);
//     setMatchingPools(newPools);
//   }
// }, [formData.leverageTier, formData.versus, formData.long]);

// // remove firstSelected if they are now undefined/null
// useEffect(() => {
//   if (!firstSelected) return;
//   if (firstSelected === DropsList.leverageTier) {
//     if (!formData.leverageTier) {
//       setfirstSelected(undefined);
//       setMatchingPools(mockPools);
//     } else {
//       const newPools = mockPools.filter(
//         (p) =>
//           LeverageTiers[p.leverageTier] ===
//           LeverageTiers[parseInt(formData.leverageTier) as LeverageTier],
//       );
//       setMatchingPools(newPools);
//       setSecondSelected(undefined);
//     }
//   }
//   if (firstSelected === DropsList.versus && !formData.versus) {
//     setfirstSelected(undefined);
//     setMatchingPools(mockPools);
//   }
//   if (firstSelected === DropsList.long && !formData.long) {
//     setfirstSelected(undefined);
//     setMatchingPools(mockPools);
//   }
// }, [formData.leverageTier, formData.versus, formData.long, firstSelected]);

// // Find selections for all dropdowns
// const { versus, leverageTiers, long } = useMemo(() => {
//   // TODO
//   // also filter for second option selected
//   // check if select is firstSelected select
//   let leverageTiers: LeverageTier[] = [];
//   let versus: string[] = [];
//   let long: string[] = [];

//   if (firstSelected !== DropsList.leverageTier) {
//     const leverageArr = matchingPools.map((e) => e.leverageTier);
//     // Get Unique leverage tiers
//     leverageTiers = [...new Set(leverageArr)];
//   } else {
//     const leverageArr = mockPools.map((e) => e.leverageTier);
//     // Get Unique leverage tiers
//     leverageTiers = [...new Set(leverageArr)];
//   }

//   if (firstSelected !== DropsList.versus) {
//     versus = matchingPools.map((e) => {
//       return e.collateralToken;
//     });
//   } else {
//     versus = mockPools.map((e) => e.collateralToken);
//   }

//   if (firstSelected !== DropsList.long) {
//     long = matchingPools.map((e) => {
//       return e.debtToken;
//     });
//   } else {
//     long = mockPools.map((e) => {
//       return e.debtToken;
//     });
//   }

//   return { versus, leverageTiers, long };
// }, [matchingPools, parent]);
