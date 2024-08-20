import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  calculateVaultFee,
  getLeverageRatio,
  getLogoAsset,
  roundDown,
} from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import Image from "next/image";
import { useMintFormProviderApi } from "@/components/providers/mintFormProviderApi";
import type { VaultFieldFragment } from "@/lib/types";
import { formatUnits, parseUnits } from "viem";
import ToolTip from "@/components/ui/tooltip";
export function VaultTableRow({
  badgeVariant,
  pool,
}: {
  badgeVariant: VariantProps<typeof badgeVariants>;
  number: string;
  pool: VaultFieldFragment;
}) {
  const fee = calculateVaultFee(pool.leverageTier) * 100;
  const { setValue } = useMintFormProviderApi();
  console.log("Rerender vault table row");
  return (
    <tr
      onClick={() => {
        setValue("versus", pool.debtToken + "," + pool.debtSymbol);
        setValue("long", pool.collateralToken + "," + pool.collateralSymbol);
        setValue("leverageTier", pool.leverageTier.toString());
      }}
      className="grid cursor-pointer text-sm  grid-cols-7 md:grid-cols-8 rounded-md px-1 py-1 text-left text-[16px] font-normal transition-colors hover:bg-primary"
    >
      <th className="">{pool.vaultId}</th>
      <th className="col-span-3 flex">
        <Image
          className="h-6 w-6 rounded-full "
          src={getLogoAsset(pool.collateralToken as `0x${string}`)}
          width={28}
          height={28}
          alt=""
        />
        <Image
          className="h-6 w-6 rounded-full "
          src={getLogoAsset(pool.debtToken as `0x${string}`)}
          width={28}
          height={28}
          alt=""
        />
        <div className="px-2"></div>
        <span>
          {pool.collateralSymbol}/{pool.debtSymbol}
        </span>
      </th>
      <th className="flex gap-x-1 items-center">
        {roundDown(fee, 2)}%{" "}
        <ToolTip>Fee charged to apes when minting or burning.</ToolTip>
      </th>
      <th>
        <Badge
          {...badgeVariant}
          className="text-[10px]"
        >{`${getLeverageRatio(pool.leverageTier)}x`}</Badge>
      </th>
      <th className="md:col-span-2 text-right">
        {roundDown(
          parseFloat(formatUnits(parseUnits(pool.totalValueLocked, 0), 18)),
          3,
        )}
      </th>
    </tr>
  );
}
