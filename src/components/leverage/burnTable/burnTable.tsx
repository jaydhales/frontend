"use client";
import React, { useMemo, useState } from "react";
import { burnRows } from "./mockBurnRows";
import type { TAddressString } from "@/lib/types";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import BurnTableHeaders from "./burnTableHeader";
import BurnTableRow from "./burnTableRow";
import SelectedRow from "./selected-row";
export default function BurnTable() {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();
  const selectedRowParams = useMemo(() => {
    return burnRows.find((r) => r.tokenId === selectedRow);
  }, [selectedRow]);
  const { address } = useAccount();
  const { data } = api.user.getPositions.useQuery(
    { address },
    {
      enabled: Boolean(address),
    },
  );

  return (
    <div className="relative">
      {selectedRow && (
        <SelectedRow
          apeAddress={selectedRow as TAddressString}
          params={selectedRowParams}
          close={() => {
            setSelectedRow(undefined);
          }}
        />
      )}
      {!selectedRow && (
        <table className="flex flex-col gap-y-4">
          <caption className="hidden">Burn Tokens</caption>
          <BurnTableHeaders />
          {data?.map((r) => (
            <BurnTableRow
              setSelectedRow={setSelectedRow}
              tokenId={r}
              key={r}
            ></BurnTableRow>
          ))}
        </table>
      )}
    </div>
  );
}
