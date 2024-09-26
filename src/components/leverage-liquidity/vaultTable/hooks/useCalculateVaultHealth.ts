import type { badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";
import { formatUnits } from "viem";

interface Props {
  apeTvl: bigint;
  teaTvl: bigint;
  leverageTier: number;
  isApe: boolean;
}
export default function useCalculateVaultHealth({
  apeTvl,
  teaTvl,
  leverageTier,
  isApe,
}: Props): VariantProps<typeof badgeVariants> {
  const ape = parseFloat(formatUnits(apeTvl, 18));
  const gentlement = parseFloat(formatUnits(teaTvl, 18));
  const Gmin = (leverageTier - 1) * ape;

  if (Gmin > gentlement) {
    return isApe ? { variant: "yellow" } : { variant: "green" };
  }
  if (gentlement > Gmin) {
    return isApe ? { variant: "green" } : { variant: "yellow" };
  }
  return { variant: "green" };
}
