"use client";
import React, { useMemo, useState } from "react";
import BurnTableHeaders from "./burnTableHeader";
import SelectedRow from "./selected-row";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import { BurnTableRow, BurnTableRowMobile } from "./burnTableRow";

export default function BurnTable() {
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
            {
              <>
                {ape.data?.userPositions.map((r) => (
                  <>
                    <BurnTableRowMobile
                      setSelectedRow={() =>
                        setSelectedRow({ vaultId: r.vaultId, isApe: true })
                      }
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
                    />
                    <BurnTableRow
                      setSelectedRow={() =>
                        setSelectedRow({ vaultId: r.vaultId, isApe: true })
                      }
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
                    />
                  </>
                ))}
                {tea.data?.userPositionTeas.map((r) => {
                  return (
                    <>
                      <BurnTableRow
                        row={{
                          ...r,
                        }}
                        key={r.id}
                        isApe={false}
                        setSelectedRow={() =>
                          setSelectedRow({
                            vaultId: r.vaultId,
                            isApe: true,
                          })
                        }
                      />
                      <BurnTableRowMobile
                        key={r.id + "1"}
                        row={{ ...r }}
                        isApe={false}
                        setSelectedRow={() =>
                          setSelectedRow({ vaultId: r.vaultId, isApe: false })
                        }
                      />
                    </>
                  );
                })}
              </>
            }
          </tbody>
        </table>
      )}
    </div>
  );
}
