import React from "react";
import { Badge, type badgeVariants } from "../ui/badge";
import Image from "next/image";
import { type VariantProps } from "class-variance-authority";

export default function VaultTable() {
  return (
    <table className="w-full ">
      <caption className="pb-4  font-lora text-[1.95rem] font-bold">
        Vaults
      </caption>
      <div className="flex flex-col gap-y-4">
        <VaultTableRowHeaders />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          return (
            <VaultTableRow
              key={i.toString()}
              number={i.toString()}
              badgeVariant={{ variant: i % 2 === 0 ? "secondary" : "tertiary" }}
            />
          );
        })}
      </div>
    </table>
  );
}

function VaultTableRowHeaders() {
  return (
    <tr className="grid grid-cols-8 text-left text-[14px] font-normal text-gray">
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
}: {
  badgeVariant: VariantProps<typeof badgeVariants>;
  number: string;
}) {
  return (
    <tr className="grid grid-cols-8 text-left text-[16px] font-normal">
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
            "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
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
