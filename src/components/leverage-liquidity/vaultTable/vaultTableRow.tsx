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
import Image from "next/image";
import { useMintFormProviderApi } from "@/components/providers/mintFormProviderApi";
import type { VaultFieldFragment } from "@/lib/types";
import { formatUnits, parseUnits } from "viem";
import { useMemo } from "react";
import ImageWithFallback from "@/components/shared/ImageWithFallback";

export function VaultTableRow({
  badgeVariant,
  pool,
}: {
  badgeVariant: VariantProps<typeof badgeVariants>;
  number: string;
  pool: VaultFieldFragment;
  isApe: boolean;
}) {
  const fee = calculateApeVaultFee(pool.leverageTier) * 100;
  const POL = useMemo(() => {
    const totalLocked = parseUnits(pool.totalValueLocked, 0);
    const lockedLiquidity = parseUnits(pool.lockedLiquidity, 0);
    if (lockedLiquidity > 0n && totalLocked > 0n) {
      const percent = (lockedLiquidity * 10000n) / totalLocked;
      return parseFloat(percent.toString()) / 100;
    } else {
      return 0n;
    }
  }, [pool.lockedLiquidity, pool.totalValueLocked]);

  const { setValue } = useMintFormProviderApi();
  return (
    <tr
      onClick={() => {
        setValue("versus", pool.debtToken + "," + pool.debtSymbol);
        setValue("long", pool.collateralToken + "," + pool.collateralSymbol);
        setValue("leverageTier", pool.leverageTier.toString());
      }}
      className="grid cursor-pointer text-sm grid-cols-5   md:grid-cols-8 rounded-md px-1 py-1 text-left text-[16px] font-normal transition-colors hover:bg-primary"
    >
      <th className="">{pool.vaultId}</th>
      <th className="md:col-span-3 items-center flex">
        <ImageWithFallback
          fallbackSrc={unknownImg}
          className="h-6 w-6 rounded-full "
          src={getLogoAsset(pool.collateralToken as `0x${string}`)}
          width={28}
          height={28}
          alt=""
        />
        <ImageWithFallback
          className="h-6 w-6 rounded-full "
          fallbackSrc={unknownImg}
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
      <th className="flex text-[13px] text-red-400 font-normal gap-x-1 items-center">
        {roundDown(fee, 2)}%{" "}
      </th>
      <th className="pl-2">
        <Badge
          {...badgeVariant}
          className="text-[10px]"
        >{`${getLeverageRatio(pool.leverageTier)}x`}</Badge>
      </th>

      <th className="md:col-span-2 flex justify-end items-center gap-x-1 text-right">
        <span>
          {formatNumber(
            parseFloat(formatUnits(parseUnits(pool.totalValueLocked, 0), 18)),
            4,
          )}
        </span>
        <span className=" hidden md:block text-gray-300 font-light">
          {pool.collateralSymbol}
        </span>
        {/* <Image */}
        {/*   className="h-5 w-5 rounded-full " */}
        {/*   src={getLogoAsset(pool.collateralToken as `0x${string}`)} */}
        {/*   width={50} */}
        {/*   height={50} */}
        {/*   alt="" */}
        {/* /> */}
      </th>
    </tr>
  );
}
