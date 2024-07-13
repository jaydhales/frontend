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
    if (isApe) {
      return ape?.data?.userPositions.find((r) => r.vaultId === selectedRow);
    } else {
      return tea.data?.userPositionsTeas.find((r) => r.vaultId === selectedRow);
    }
  }, [
    isApe,
    ape?.data?.userPositions,
    selectedRow,
    tea.data?.userPositionsTeas,
  ]);

  return (
    <div className="relative">
      {selectedRow && selectedRowParams && (
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
                  key={r.vaultId}
                  row={{
                    id: r.vaultId,
                    balance: r.balance,
                    user: r.user,
                    collateralSymbol: r.collateralSymbol,
                    debtSymbol: r.debtSymbol,
                    collateralToken: r.collateralToken,
                    debtToken: r.debtToken,
                    leverageTier: r.leverageTier,
                    vaultId: r.vaultId,
                  }}
                  isApe={true}
                  apeAddress={r.APE}
                ></BurnTableRow>
              ))}
            </>
          ) : (
            <>
              {tea.data?.userPositionsTeas.map((r) => {
                return (
                  <BurnTableRow
                    row={{
                      ...r,
                    }}
                    key={r.id}
                    isApe={false}
                    setSelectedRow={setSelectedRow}
                  />
                );
              })}
            </>
          )}
        </table>
      )}
    </div>
  );
}
