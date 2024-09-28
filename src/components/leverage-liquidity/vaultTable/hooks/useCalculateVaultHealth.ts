import type { badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";
import { formatUnits } from "viem";

interface Props {
  tvl: bigint;
  leverageTier: number;
  isApe: boolean;
}
export default function useCalculateVaultHealth({
  leverageTier,
  isApe,
}: Props): VariantProps<typeof badgeVariants> {
  const ape = parseFloat(formatUnits(apeTvl, 18));
  const gentlement = parseFloat(formatUnits(teaTvl, 18));
  const Gmin = (leverageTier - 1) * ape;
  const mult = Gmin * 1.25;
  if (mult > gentlement) {
    return isApe ? { variant: "red" } : { variant: "green" };
  }
  if (Gmin > gentlement) {
    return isApe ? { variant: "yellow" } : { variant: "yellow" };
  }
  if (gentlement > Gmin) {
    return isApe ? { variant: "green" } : { variant: "red" };
  }
  return { variant: "green" };
}
