import { BASE_FEE } from "@/data/constants";
import { mapLeverage } from "@/lib/utils";
import { calculateMaxApe } from "@/lib/utils/calculations";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import { formatUnits } from "viem";

export function useCalculateMaxApe({
  leverageTier,
  vaultId,
}: {
  vaultId: number;
  leverageTier: string;
}) {
  const { data } = api.vault.getReserves.useQuery(
    { vaultId },
    { enabled: vaultId !== -1 && isFinite(vaultId) },
  );
  const ape = parseFloat(formatUnits(data?.[0]?.reserveApes ?? 0n, 18));
  const tea = parseFloat(formatUnits(data?.[0]?.reserveLPers ?? 0n, 18));
  const calc = useMemo(() => {
    return calculateMaxApe({
      leverageRatio: parseFloat(mapLeverage(leverageTier) ?? "0"),
      baseFee: BASE_FEE,
      apeReserve: ape,
      gentlemenReserve: tea,
    });
  }, [ape, leverageTier, tea]);
  console.log(calc, "CALC");
  return calc;
}
