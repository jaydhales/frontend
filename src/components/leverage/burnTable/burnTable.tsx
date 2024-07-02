"use client";
import React, { useMemo, useState } from "react";
// import { burnRows } from "./mockBurnRows";
import BurnTableHeaders from "./burnTableHeader";
import BurnTableRow from "./burnTableRow";
import SelectedRow from "./selected-row";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";

export default function BurnTable({ isApe }: { isApe: boolean }) {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();

  const { data } = useBurnTableProvider();
  const selectedRowParams = useMemo(() => {
    return data?.userPositions.find((r) => r.APE === selectedRow);
  }, [data?.userPositions, selectedRow]);

  return (
    <div className="relative">
      {selectedRow &&
        (isApe
          ? selectedRowParamsApe && (
              <>
                <SelectedRow
                  isApe
                  params={selectedRowParamsApe}
                  apeAddress={selectedRowParamsApe?.APE}
                  close={() => {
                    setSelectedRow(undefined);
                  }}
                />
              </>
            )
          : selectedRowParamsTea && (
              <>
                <SelectedRow
                  isApe={false}
                  params={selectedRowParamsTea}
                  close={() => {
                    setSelectedRow(undefined);
                  }}
                />
              </>
            ))}
      {!selectedRow && (
        <table className="flex flex-col gap-y-4">
          <caption className="hidden">Burn Tokens</caption>
          <tbody>
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
          </tbody>
        </table>
      )}
    </div>
  );
}
