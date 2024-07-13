import { Button } from "@/components/ui/button";
import type { TAddressString } from "@/lib/types";
import { getLeverageRatio } from "@/lib/utils";
import type { TUserPosition } from "@/server/queries/vaults";
import { api } from "@/trpc/react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
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
  const { address } = useAccount();
  const { data: apeBal } = api.user.getApeBalance.useQuery(
    {
      address: apeAddress,
      user: address,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      enabled: isApe,
      // enabled: false,
    },
  );
  const { data: teaBal } = api.user.getTeaBalance.useQuery(
    {
      user: address,
      vaultId: row.vaultId,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      enabled: !isApe,
    },
  );

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
