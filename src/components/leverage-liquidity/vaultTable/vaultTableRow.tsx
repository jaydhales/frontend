import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  calculateApeVaultFee,
  formatNumber,
  getLeverageRatio,
  getLogoAsset,
  roundDown,
} from "@/lib/utils";
import unknownImg from "@/../public/IconUnknown.png";
import type { VariantProps } from "class-variance-authority";
import { useMintFormProviderApi } from "@/components/providers/mintFormProviderApi";
import type { VaultFieldFragment } from "@/lib/types";
import { formatUnits, parseUnits } from "viem";
import { useMemo } from "react";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import useCalculateVaultHealth from "./hooks/useCalculateVaultHealth";

export function VaultTableRow({
  pool,
  isApe,
}: {
  badgeVariant: VariantProps<typeof badgeVariants>;
  number: string;
  pool: VaultFieldFragment;
  isApe: boolean;
}) {
  const fee = calculateApeVaultFee(pool.leverageTier) * 100;
  const POL = useMemo(() => {
    const totalLocked = parseUnits(pool.totalApe, 0);
    const lockedLiquidity = parseUnits(pool.lockedLiquidity, 0);
    if (lockedLiquidity > 0n && totalLocked > 0n) {
      const percent = (lockedLiquidity * 10000n) / totalLocked;
      console.log(lockedLiquidity, totalLocked);
      return parseFloat(percent.toString()) / 100;
    } else {
      return 0n;
    }
  }, [pool.lockedLiquidity, pool.totalApe]);

  const { setValue } = useMintFormProviderApi();
  const teaColl = parseUnits(pool.teaCollateral, 18);
  const apeColl = parseUnits(pool.apeCollateral, 18);
  const tvlPercent =
    parseFloat(formatUnits(apeColl, 18)) / parseFloat(formatUnits(teaColl, 18));
  const showTvlPercent = tvlPercent < pool.leverageTier;
  const variant = useCalculateVaultHealth({
    tvl: parseUnits(pool.totalValue, 18),
    isApe,
    leverageTier: pool.leverageTier,
    apeCollateral: parseUnits(pool.apeCollateral, 18),
    teaCollateral: parseUnits(pool.teaCollateral, 18),
  });
  return (
    <tr
      onClick={() => {
        setValue("versus", pool.debtToken + "," + pool.debtSymbol);
        setValue("long", pool.collateralToken + "," + pool.collateralSymbol);
        setValue("leverageTier", pool.leverageTier.toString());
      }}
      className="grid cursor-pointer text-sm grid-cols-6   md:grid-cols-9 rounded-md px-1 py-1 text-left text-[16px] font-normal transition-colors hover:bg-primary"
    >
      <th className="">{pool.vaultId}</th>
      <th className="md:col-span-3 items-center flex">
        <ImageWithFallback
          fallbackImageUrl={unknownImg}
          className="h-6 w-6 rounded-full "
          src={getLogoAsset(pool.collateralToken as `0x${string}`)}
          width={28}
          height={28}
          alt=""
        />
        <ImageWithFallback
          className="h-6 w-6 rounded-full "
          fallbackImageUrl={unknownImg}
          src={getLogoAsset(pool.debtToken as `0x${string}`)}
          width={28}
          height={28}
          alt=""
        />
        <div className="px-1"></div>
        <span className="hidden font-normal md:block">
          {pool.collateralSymbol}/{pool.debtSymbol}
        </span>
      </th>
      <th>
        <h4 className="text-gray-200 font-normal">{POL}%</h4>
      </th>
      <th className="flex text-[13px] text-red-400 font-normal gap-x-1 items-center">
        {roundDown(fee, 2)}%{" "}
      </th>
      <th className="pl-2">
        <Badge
          {...variant}
          className="text-[10px]"
        >{`${getLeverageRatio(pool.leverageTier)}x${showTvlPercent ? "(" + formatNumber(tvlPercent, 2) + "x)" : ""}`}</Badge>
      </th>

      <th className="md:col-span-2 flex justify-end items-center gap-x-1 text-right">
        <span>
          {formatNumber(formatUnits(parseUnits(pool.totalValue, 0), 18), 4)}
        </span>
        <span className=" hidden md:block text-gray-300 font-light">
          {pool.collateralSymbol}
        </span>
      </th>
    </tr>
  );
}
