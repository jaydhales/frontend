import React, { useState } from "react";
import { Button } from "../../ui/button";
import { burnRows } from "./mockBurnRows";
import { type TBurnRow } from "@/lib/types";
import { X } from "lucide-react";

export default function BurnTable() {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();
  const selectedRowParams = burnRows.find((r) => r.tokenId === selectedRow);
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
        </div>
      )}
      {!selectedRow && (
        <table className="flex flex-col gap-y-4">
          <caption className="hidden">Burn Tokens</caption>
          <BurnTableHeaders />
          {burnRows.map((r) => (
            <BurnTableRow
              setSelectedRow={setSelectedRow}
              key={r.tokenId}
              {...r}
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
}: TBurnRow & {
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <tr className="grid grid-cols-6 text-left text-gray text-white">
      <th>{tokenId}</th>
      <th>200</th>
      <th>0x</th>
      <th>0x1</th>
      <th>1.4x</th>
      <th>
        <div className="flex justify-between">
          <span>201</span>
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
