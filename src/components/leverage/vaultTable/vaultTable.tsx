import React from "react";
import type { TVaults } from "@/lib/types";
import { VaultTableRow } from "./vaultTableRow";
import { useSearchParams } from "next/navigation";

export default function VaultTable({ vaultQuery }: { vaultQuery: TVaults }) {
  const params = useSearchParams();
  console.log({ params });
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
              key={pool.vaultId.toString()}
              pool={pool}
              number={ind.toString()}
              badgeVariant={{
                variant: ind % 2 === 0 ? "yellow" : "default",
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
