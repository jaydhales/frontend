import { BASE_FEE } from "@/data/constants";
import { calculateMaxApe } from "@/lib/utils/calculations";
import { useEffect } from "react";

export function useCalculateMaxApe({ leverageTier }: { leverageTier: string }) {
  useEffect(() => {
    calculateMaxApe({
      leverageRatio: parseFloat(leverageTier),
      baseFee: BASE_FEE,
      apeReserve: 0,
      gentlemenReserve: 0,
    });
  }, [leverageTier]);
}
