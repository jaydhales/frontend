"use client";
import React, { useMemo, useState } from "react";
import BurnTableHeaders from "./burnTableHeader";
import BurnTableRow from "./burnTableRow";
import SelectedRow from "./selected-row";
import type { TAddressString } from "@/lib/types";
import { useBurnTableProvider } from "@/components/providers/burnTableProvider";
import { api } from "@/trpc/react";
export default function BurnTable() {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();

  const { address } = useAccount();
  const data = api.user.getApePositions.useQuery({ address });
  const selectedRowParams = useMemo(() => {
    return data?.userPositions.find((r) => r.APE === selectedRow);
  }, [data?.userPositions, selectedRow]);

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
          {data?.userPositions.map((r) => (
            <BurnTableRow
              setSelectedRow={setSelectedRow}
              apeAddress={r.APE}
              colSymbol={r.collateralSymbol}
              leverageTier={r.leverageTier}
              debtSymbol={r.debtSymbol}
              debtToken={r.debtToken}
              colToken={r.collateralToken}
              key={r.APE}
            ></BurnTableRow>
          ))}
        </table>
      )}
    </div>
  );
}
