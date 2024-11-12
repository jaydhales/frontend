import { BASE_FEE } from "@/data/constants";
import { calculateMaxApe } from "@/lib/utils/calculations";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import { parseUnits } from "viem";
import useCalculateVaultHealth from "../../vaultTable/hooks/useCalculateVaultHealth";

export function useCalculateMaxApe({
  leverageTier,
  vaultId,
}: {
  vaultId: number;
  leverageTier: string;
}) {
  const { data } = api.vault.getReserves.useQuery(
    { vaultId },
    { enabled: vaultId !== -1 && Number.isFinite(vaultId) },
  );
  const ape = data?.[0]?.reserveApes ?? 0n;
  const tea = data?.[0]?.reserveLPers ?? 0n;
  const calc = useMemo(() => {
    const maxCollateralIn = calculateMaxApe({
      leverageTier: parseUnits(leverageTier ?? "0", 0),
      baseFee: parseUnits(BASE_FEE.toString(), 4),
      apeReserve: ape,
      gentlemenReserve: tea,
    });
    const { variant } = useCalculateVaultHealth({
      leverageTier: Number.parseInt(leverageTier),
      apeCollateral: ape,
      teaCollateral: tea,
      isApe: true,
    });
    let badHealth = false;
    if (variant === "red" || variant === "yellow") {
      badHealth = true;
    }
    return { badHealth, maxCollateralIn };
  }, [ape, leverageTier, tea]);
  return calc;
}
