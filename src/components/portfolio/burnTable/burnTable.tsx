"use client";
import React, { useMemo, useState } from "react";
import BurnTableHeaders from "./burnTableHeader";
import SelectedRow from "./selected-row";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import { BurnTableRow, BurnTableRowMobile } from "./burnTableRow";

export default function BurnTable({
  filter,
}: {
  filter: "ape" | "tea" | "all";
}) {
  const [selectedRow, setSelectedRow] = useState<
    | {
        vaultId: string;
        isApe: boolean;
      }
    | undefined
  >();

  const { address } = useAccount();
  const ape = api.user.getApePositions.useQuery({ address });
  const tea = api.user.getTeaPositions.useQuery({ address });

  const selectedRowParamsApe = useMemo(() => {
    return ape.data?.userPositions.find(
      (r) => r.vaultId === selectedRow?.vaultId && selectedRow.isApe,
    );
  }, [ape.data?.userPositions, selectedRow]);
  const selectedRowParamsTea = useMemo(() => {
    return tea.data?.userPositionTeas.find(
      (r) => r.vaultId === selectedRow?.vaultId && !selectedRow.isApe,
    );
  }, [selectedRow, tea.data?.userPositionTeas]);
  const hasPositions = useMemo(() => {
    const apeLength = ape?.data?.userPositions?.length ?? 0;
    const teaLength = tea?.data?.userPositionTeas?.length ?? 0;
    if (filter === "ape") {
      if (apeLength > 0) {
        return true;
      } else {
        return false;
      }
    } else if (filter === "tea") {
      if (teaLength > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (apeLength > 0 || teaLength > 0) {
        return true;
      } else {
        return false;
      }
    }
  }, [
    ape?.data?.userPositions?.length,
    filter,
    tea?.data?.userPositionTeas?.length,
  ]);
  const loading = ape.isLoading || tea.isLoading;
  const apePosition = ape.data?.userPositions.map((r) => (
    <>
      <BurnTableRowMobile
        setSelectedRow={() =>
          setSelectedRow({
            vaultId: r.vaultId,
            isApe: true,
          })
        }
        key={r.vaultId + "apea"}
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
      />
      <BurnTableRow
        setSelectedRow={() =>
          setSelectedRow({
            vaultId: r.vaultId,
            isApe: true,
          })
        }
        key={r.vaultId + "ape"}
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
      />
    </>
  ));
  return (
    <div className="relative">
      {selectedRowParamsApe && (
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
      )}
      {selectedRowParamsTea && (
        <>
          <SelectedRow
            isApe={false}
            params={selectedRowParamsTea}
            close={() => {
              setSelectedRow(undefined);
            }}
          />
        </>
      )}
      {!selectedRow && (
        <table className="w-full">
          <caption className="hidden">Burn Tokens</caption>
          <tbody className="flex flex-col gap-y-4">
            <BurnTableHeaders />
            {/* PLEASE REFACTOR THIS!!! */}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {!hasPositions ? (
                  <div className="flex justify-center py-6">
                    <h1 className="text-gray-300">No Positions</h1>
                  </div>
                ) : (
                  <>
                    {(filter === "ape" || filter == "all") && apePosition}
                    {(filter === "tea" || filter == "all") && (
                      <>
                        {tea.data?.userPositionTeas.map((r) => {
                          return (
                            <>
                              <BurnTableRow
                                row={{
                                  ...r,
                                }}
                                key={r.id + "teaa"}
                                isApe={false}
                                setSelectedRow={() =>
                                  setSelectedRow({
                                    vaultId: r.vaultId,
                                    isApe: false,
                                  })
                                }
                              />
                              <BurnTableRowMobile
                                key={r.id + "tea"}
                                row={{ ...r }}
                                isApe={false}
                                setSelectedRow={() =>
                                  setSelectedRow({
                                    vaultId: r.vaultId,
                                    isApe: false,
                                  })
                                }
                              />
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
