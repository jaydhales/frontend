"use client";
import React, { useMemo, useState } from "react";
import BurnTableHeaders from "./burnTableHeader";
import BurnTableRow from "./burnTableRow";
import SelectedRow from "./selected-row";
import type { TAddressString } from "@/lib/types";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
export default function BurnTable({ isApe }: { isApe: boolean }) {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();

  const { address } = useAccount();
  const ape = api.user.getApePositions.useQuery(
    { address },
    { enabled: isApe },
  );
  const tea = api.user.getTeaPositions.useQuery(
    { address },
    { enabled: !isApe },
  );

  const selectedRowParams = useMemo(() => {
    return ape?.data?.userPositions.find((r) => r.APE === selectedRow);
  }, [ape.data?.userPositions, selectedRow]);

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
          {isApe ? (
            <>
              {ape.data?.userPositions.map((r) => (
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
            </>
          ) : (
            <>
              {tea.data?.userPositionTeas.map((r) => (
                <BurnTableRow
                  apeAddress={""}
                  key={r.id}
                  colToken={""}
                  colSymbol={""}
                  debtToken={""}
                  debtSymbol={""}
                  leverageTier={""}
                  setSelectedRow={setSelectedRow}
                />
              ))}
            </>
          )}
        </table>
      )}
    </div>
  );
}
