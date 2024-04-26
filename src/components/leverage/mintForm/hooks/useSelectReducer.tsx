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
];
//todo rename
export function useSelectReducer({ formData }: Props) {
  const [matchingPools, setMatchingPools] = useState<TPool[]>(mockPools);
  useEffect(() => {
    if (formData.leverageTier) {
      console.log({
        tier: LeverageTiers[parseInt(formData.leverageTier) as LeverageTier],
      });
      const newPools = mockPools.filter(
        (p) =>
          LeverageTiers[p.leverageTier] ===
          LeverageTiers[parseInt(formData.leverageTier) as LeverageTier],
      );
      setMatchingPools(newPools);
    }
  }, [formData.leverageTier, formData.versus]);

  // Find selections for all dropdowns
  const { versus, leverageTiers, long } = useMemo(() => {
    const versus = matchingPools.map((e) => {
      return { symbol: e.collateralToken, imgUrl: e.iconUrl };
    });
    const long = matchingPools.map((e) => {
      return { symbol: e.debtToken, imgUrl: e.iconUrl };
    });
    const leverageArr = matchingPools.map((e) => e.leverageTier);
    // Get Unique leverage tiers
    const leverageTiers = [...new Set(leverageArr)];

    return { versus, leverageTiers, long };
  }, [matchingPools]);

  return { versus, leverageTiers, long };
}
