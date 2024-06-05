"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { burnRows } from "./mockBurnRows";
import { type TBurnRow } from "@/lib/types";
import { X } from "lucide-react";
import BurnForm from "../burnForm/burnForm";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
export default function BurnTable() {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();
  const selectedRowParams = burnRows.find((r) => r.tokenId === selectedRow);
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
        <div>
          <div className="flex flex-col gap-y-4 border-b-2 pb-8">
            <button
              type="button"
              onClick={() => setSelectedRow(undefined)}
              className="absolute -right-4 -top-12 cursor-pointer text-white/80 transition-transform hover:scale-105 hover:text-white"
            >
              <X />
            </button>
            <BurnTableHeaders />
            <tr className="grid grid-cols-6 text-left text-gray text-white">
              <th>{selectedRow}</th>
              <th>{selectedRowParams?.amount}</th>
              <th>0x</th>
              <th>0x1</th>
              <th>1.4x</th>
              <th>201</th>
            </tr>
          </div>
          <div className="flex justify-center pt-4">
            <div className=" w-[500px] justify-between">
              <BurnForm />
            </div>
          </div>
        </div>
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

function BurnTableHeaders() {
  return (
    <tr className="grid grid-cols-6 text-left text-gray">
      <th>Token:</th>
      <th>Amount:</th>
      <th>Long:</th>
      <th>Versus:</th>
      <th>Leverage ratio:</th>
      <th>Balance:</th>
    </tr>
  );
}
function BurnTableRow({
  tokenId,
  setSelectedRow,
}: {
  tokenId: string;
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { address } = useAccount();
  const { data } = api.user.getApeBalance.useQuery({
    address: tokenId,
    user: address,
  });
  console.log(data, "DATA");
  return (
    <tr className="grid grid-cols-6 text-left text-gray text-white">
      <th>{tokenId.slice(0, 5) + "..." + tokenId.slice(-4)}</th>
      <th>200</th>
      <th>0x</th>
      <th>0x1</th>
      <th>1.4x</th>
      <th>
        <div className="flex justify-between">
          <span>
            {parseFloat(parseFloat(formatUnits(data ?? 0n, 18)).toFixed(4))}
          </span>
          <Button
            onClick={() => setSelectedRow(tokenId)}
            type="button"
            variant="outline"
          >
            Burn
          </Button>
        </div>
      </th>
    </tr>
  );
}
