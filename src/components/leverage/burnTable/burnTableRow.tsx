import { Button } from "@/components/ui/button";
import type { TAddressString } from "@/lib/types";
import { getLeverageRatio } from "@/lib/utils";
import type { TUserPosition } from "@/server/queries/vaults";
import { formatUnits } from "viem";
import { useTeaAndApeBals } from "./hooks/useTeaAndApeBals";
interface Props {
  row: TUserPosition;
  isApe: boolean;
  apeAddress?: TAddressString;
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function BurnTableRow({
  setSelectedRow,
  row,
  isApe,
  apeAddress,
}: Props) {
  const { apeBal, teaBal } = useTeaAndApeBals({
    apeAddress,
    vaultId: row.vaultId,
    isApe,
  });

  return (
    <tr className="grid grid-cols-5 items-center text-left text-gray text-white">
      <th>{row.vaultId}</th>
      <th>{row.debtSymbol}</th>
      <th>{row.collateralSymbol}</th>
      <th>{getLeverageRatio(parseInt(row.leverageTier))}x</th>
      <th>
        <div className="flex items-center justify-between">
          {isApe ? (
            <span>
              {parseFloat(parseFloat(formatUnits(apeBal ?? 0n, 18)).toFixed(4))}
            </span>
          ) : (
            <span>
              {parseFloat(parseFloat(formatUnits(teaBal ?? 0n, 18)).toFixed(4))}
            </span>
          )}

          <Button
            onClick={() => setSelectedRow(row.vaultId)}
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
