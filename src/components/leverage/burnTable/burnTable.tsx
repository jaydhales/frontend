/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import React, { useMemo, useState } from "react";
import { burnRows } from "./mockBurnRows";

import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import BurnTableHeaders from "./burnTableHeader";
import BurnTableRow from "./burnTableRow";
import SelectedRow from "./selected-row";
import type { TAddressString } from "@/lib/types";
export default function BurnTable() {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();
  const selectedRowParams = useMemo(() => {
    return burnRows.find((r) => r.tokenId === selectedRow);
  }, [selectedRow]);
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          {(data as userQuery)?.userPositions.map((r) => (
            <BurnTableRow
              setSelectedRow={setSelectedRow}
              tokenId={r.APE}
              key={r.APE}
            ></BurnTableRow>
          ))}
        </table>
      )}
    </div>
  );
}
type userQuery = {
  userPositions: { User: string; balance: bigint; APE: string }[];
};
