import React from "react";
import { Badge, type badgeVariants } from "../ui/badge";
import Image from "next/image";
import { type VariantProps } from "class-variance-authority";
import { useMintFormProvider } from "../providers/mintFormProvider";
import { vaultsQuery } from "../../../.graphclient";
import { TVaults } from "@/lib/types";
import { getLogoAsset } from "@/lib/utils";

export default function VaultTable({ vaultQuery }: { vaultQuery: TVaults }) {
  return (
    <table className="w-full">
      <caption className="pb-2  font-lora text-[1.95rem] font-bold">
        Vaults
      </caption>
      <tbody className="space-y-2">
        <VaultTableRowHeaders />
        {vaultQuery?.vaults.vaults.map((pool, ind) => {
          return (
            <VaultTableRow
              key={(pool.vaultId as number).toString()}
              pool={pool}
              number={ind.toString()}
              badgeVariant={{
                variant: ind % 2 === 0 ? "secondary" : "tertiary",
              }}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function VaultTableRowHeaders() {
  return (
    <tr className="grid grid-cols-8 px-1 text-left text-[14px] font-normal text-gray">
      <th>#</th>
      <th className="col-span-3">Pool</th>
      <th>Fees</th>
      <th>Ratio</th>
      <th className="col-span-2 text-right">TVL</th>
    </tr>
  );
}
function VaultTableRow({
  number,
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
        form.setValue("long", pool.debtToken + "," + pool.debtSymbol);
        form.setValue(
          "versus",
          pool.collateralToken + "," + pool.collateralSymbol,
        );
        form.setValue("leverageTier", pool.leverageTier.toString());
      }}
      className="grid cursor-pointer grid-cols-8 rounded-md px-1 py-1 text-left text-[16px] font-normal hover:bg-card-foreground/50"
    >
      <th className="">{number}</th>
      <th className="col-span-3 flex">
        <Image
          className="h-6 w-6 rounded-full "
          src={getLogoAsset(pool.collateralToken)}
          width={28}
          height={28}
          alt=""
        />
        <Image
          className="h-6 w-6 rounded-full "
          src={getLogoAsset(pool.debtToken)}
          width={28}
          height={28}
          alt=""
        />
        <div className="px-2"></div>
        <span>xxx/xxx</span>
      </th>
      <th>20%</th>
      <th>
        <Badge {...badgeVariant}>{`{x.x}x`}</Badge>
      </th>
      <th className="col-span-2 text-right">{"$amount"}</th>
    </tr>
  );
}
