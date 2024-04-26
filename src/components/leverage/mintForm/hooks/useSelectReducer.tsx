import { LeverageTiers } from "@/data/constants";
import { LeverageTier, type TPool } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

interface Props {
  formData: {
    long: string;
    versus: string;
    leverageTier: string;
    depositToken: string;
    deposit: number;
  };
}

const mockPools: TPool[] = [
  {
    debtToken: "0x0",
    collateralToken: "0x1",
    leverageTier: LeverageTier.one,
    vaultId: "123",
    name: "",
    symbol: "",
  },
  {
    debtToken: "0x2",
    collateralToken: "0x3",
    leverageTier: LeverageTier.two,
    vaultId: "123",
    name: "",
    symbol: "",
  },
  {
    debtToken: "0x2",
    collateralToken: "0x5",
    leverageTier: LeverageTier.two,
    vaultId: "123",
    name: "",
    symbol: "",
  },
  {
    debtToken: "0x6",
    collateralToken: "0x7",
    leverageTier: LeverageTier.two,
    vaultId: "123",
    name: "",
    symbol: "",
  },
];
enum DropsList {
  "leverageTier" = 1,
  "versus" = 2,
  "long" = 3,
}
//TODO ====
//set a parent selector
//parent selector doesn't get options reduced
//be able to set parent selector to null -> reset everything
//     ====
export function useSelectReducer({ formData }: Props) {
  const [matchingPools, setMatchingPools] = useState<TPool[]>(mockPools);
  const [parent, setParent] = useState<DropsList | undefined>();
  useEffect(() => {
    // TODO
    // CHECK IF PARENT IS ALREADY SET
    if (formData.leverageTier && !parent) {
      const newPools = mockPools.filter(
        (p) =>
          LeverageTiers[p.leverageTier] ===
          LeverageTiers[parseInt(formData.leverageTier) as LeverageTier],
      );
      setParent(DropsList.leverageTier);
      setMatchingPools(newPools);
    }
    if (formData.versus && !parent) {
      const newPools = mockPools.filter(
        (p) => p.collateralToken === formData.versus,
      );

      setParent(DropsList.versus);
      setMatchingPools(newPools);
    }
    if (formData.long && !parent) {
      const newPools = mockPools.filter((p) => {
        return p.debtToken === formData.long;
      });
      console.log({ long: formData.long, newPools });
      setParent(DropsList.long);
      setMatchingPools(newPools);
    }
  }, [formData.leverageTier, formData.versus, formData.long]);

  // remove parent if they are now undefined/null
  useEffect(() => {
    if (!parent) return;
    if (parent === DropsList.leverageTier) {
      if (!formData.leverageTier) {
        setParent(undefined);
        setMatchingPools(mockPools);
      } else {
        const newPools = mockPools.filter(
          (p) =>
            LeverageTiers[p.leverageTier] ===
            LeverageTiers[parseInt(formData.leverageTier) as LeverageTier],
        );
        setMatchingPools(newPools);
      }
    }
    if (parent === DropsList.versus && !formData.versus) {
      setParent(undefined);
      setMatchingPools(mockPools);
    }
    if (parent === DropsList.long && !formData.long) {
      setParent(undefined);
      setMatchingPools(mockPools);
    }
  }, [formData.leverageTier, formData.versus, formData.long, parent]);

  // Find selections for all dropdowns
  const { versus, leverageTiers, long } = useMemo(() => {
    // TODO
    // also filter for second option selected
    // check if select is parent select
    let leverageTiers: LeverageTier[] = [];
    let versus: string[] = [];
    let long: string[] = [];
    if (parent !== DropsList.leverageTier) {
      const leverageArr = matchingPools.map((e) => e.leverageTier);
      // Get Unique leverage tiers
      leverageTiers = [...new Set(leverageArr)];
    } else {
      const leverageArr = mockPools.map((e) => e.leverageTier);
      // Get Unique leverage tiers
      leverageTiers = [...new Set(leverageArr)];
    }
    if (parent !== DropsList.versus) {
      versus = matchingPools.map((e) => {
        return e.collateralToken;
      });
    } else {
      versus = mockPools.map((e) => e.collateralToken);
    }
    if (parent !== DropsList.long) {
      long = matchingPools.map((e) => {
        return e.debtToken;
      });
    } else {
      long = mockPools.map((e) => {
        return e.debtToken;
      });
    }

    return { versus, leverageTiers, long };
  }, [matchingPools, parent]);

  return { versus, leverageTiers, long };
}
