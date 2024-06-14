import { useMintFormProvider } from "@/components/providers/mintFormProvider";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { getLeverageRatio, getLogoAsset } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { vaultsQuery } from "../../../../.graphclient";
import Image from "next/image";
export function VaultTableRow({
  badgeVariant,
  pool,
}: {
  badgeVariant: VariantProps<typeof badgeVariants>;
  number: string;
  pool: vaultsQuery["vaults"][0];
}) {
  const { form } = useMintFormProvider();
  return (
    <tr
      onClick={() => {
        form.setValue("versus", pool.debtToken + "," + pool.debtSymbol);
        form.setValue(
          "long",
          pool.collateralToken + "," + pool.collateralSymbol,
        );
        form.setValue("leverageTier", pool.leverageTier.toString());
      }}
      className="grid cursor-pointer grid-cols-8 rounded-md px-1 py-1 text-left text-[16px] font-normal transition-colors hover:bg-primary"
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
      <th>1.5%</th>
      <th>
        <Badge
          {...badgeVariant}
        >{`${getLeverageRatio(pool.leverageTier)}x`}</Badge>
      </th>
      <th className="col-span-2 text-right">{"N/A"}</th>
    </tr>
  );
}
