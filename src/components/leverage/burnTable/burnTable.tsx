import React, { useState } from "react";
import { Button } from "../../ui/button";
import { burnRows } from "./mockBurnRows";
import { type TBurnRow } from "@/lib/types";

export default function BurnTable() {
  const [selectedRow, setSelectedRow] = useState<string | undefined>();
  return (
    <div>
      <div></div>
      <table className="flex flex-col gap-y-4">
        <caption className="hidden">Burn Tokens</caption>
        <BurnTableHeaders />
        {burnRows.map((r) => (
          <BurnTableRow {...r} key={r.tokenId}></BurnTableRow>
        ))}
      </table>
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
function BurnTableRow({ tokenId }: TBurnRow) {
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
          <Button variant="outline">Burn</Button>
        </div>
      </th>
    </tr>
  );
}
