import React from "react";
import { Button } from "../ui/button";

export default function BurnTable() {
  return (
    <table className="flex flex-col gap-y-4">
      <caption className="hidden">Burn Tokens</caption>
      <BurnTableHeaders />
      <BurnTableRow />
      <BurnTableRow />
      <BurnTableRow />
    </table>
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
function BurnTableRow() {
  return (
    <tr className="grid grid-cols-6 text-left text-gray text-white">
      <th>Token id</th>
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
