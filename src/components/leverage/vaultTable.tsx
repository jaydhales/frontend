import React from "react";
import { Badge, type badgeVariants } from "../ui/badge";
import Image from "next/image";
import { type VariantProps } from "class-variance-authority";
import { useMintFormProvider } from "../providers/mintFormProvider";
import { mockPools } from "@/data/mockPools";
import { type TPool } from "@/lib/types";
import { LeverageTiers } from "@/data/constants";

export default function VaultTable() {
  return (
    <table className="w-full ">
      <caption className="pb-4  font-lora text-[1.95rem] font-bold">
        Vaults
      </caption>
      <div className="flex flex-col gap-y-4">
        <VaultTableRowHeaders />
        {mockPools.map((pool, ind) => {
          return (
            <VaultTableRow
              key={pool.vaultId.toString()}
              pool={pool}
              number={ind.toString()}
              badgeVariant={{
                variant: ind % 2 === 0 ? "secondary" : "tertiary",
              }}
            />
          );
        })}
      </div>
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
  pool: TPool;
}) {
  const { form } = useMintFormProvider();
  return (
    <tr
      onClick={() => {
        form.setValue("long", pool.debtToken);
        form.setValue("versus", pool.collateralToken);
        form.setValue("leverageTier", pool.leverageTier.toString());
      }}
      className="grid cursor-pointer grid-cols-8 rounded-md px-1 py-1 text-left text-[16px] font-normal hover:bg-card-foreground/50"
    >
      <th className="">{number}</th>
      <th className="col-span-3 flex">
        <Image
          className="h-6 w-6 rounded-full "
          src={
            "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
          }
          width={28}
          height={28}
          alt=""
        />
        <Image
          className="h-6 w-6 rounded-full "
          src={
            "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xB98d4C97425d9908E66E53A6fDf673ACcA0BE986/logo.png"
          }
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
