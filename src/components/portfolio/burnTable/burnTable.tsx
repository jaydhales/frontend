"use client";
import React, { useMemo, useState } from "react";
import BurnTableHeaders from "./burnTableHeader";
import BurnTableRow from "./burnTableRow";
import SelectedRow from "./selected-row";
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

  const selectedRowParamsApe = useMemo(() => {
    return ape.data?.userPositions.find((r) => r.vaultId === selectedRow);
  }, [ape.data?.userPositions, selectedRow]);
  const selectedRowParamsTea = useMemo(() => {
    return tea.data?.userPositionTeas.find((r) => r.vaultId === selectedRow);
  }, [selectedRow, tea.data?.userPositionTeas]);

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
          <BurnTableHeaders />
          <tbody>
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
                {tea.data?.userPositionTeas.map((r) => {
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
          </tbody>
        </table>
      )}
    </div>
  );
}
