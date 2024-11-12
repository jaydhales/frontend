import type { badgeVariants } from "@/components/ui/badge";
import { mapLeverage } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { formatUnits, parseUnits } from "viem";

interface Props {
  leverageTier: number;
  isApe: boolean;
  apeCollateral: bigint;
  teaCollateral: bigint;
}
export default function useCalculateVaultHealth({
  leverageTier,
  teaCollateral,
  apeCollateral,
  isApe,
}: Props): VariantProps<typeof badgeVariants> {
  const ape = apeCollateral;
  const gentlemen = teaCollateral;
  const leverageRatio =
    parseFloat(mapLeverage(leverageTier.toString()) ?? "0") * 10000;
  const Gmin = (parseUnits(leverageRatio.toString(), 0) * ape) / 10000n;
  const mult = (Gmin * 125n) / 100n;
  if (gentlemen > mult) {
    return isApe ? { variant: "green" } : { variant: "yellow" };
  }
  if (gentlemen > Gmin) {
    return isApe ? { variant: "yellow" } : { variant: "yellow" };
  }
  if (Gmin > gentlemen) {
    return isApe ? { variant: "red" } : { variant: "green" };
  }
  return { variant: "green" };
}
