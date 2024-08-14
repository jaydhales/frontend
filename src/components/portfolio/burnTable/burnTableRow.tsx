import { Button } from "@/components/ui/button";
import type { TAddressString } from "@/lib/types";
import { getLeverageRatio } from "@/lib/utils";
import type { TUserPosition } from "@/server/queries/vaults";
import { formatUnits } from "viem";
import { useTeaAndApeBals } from "./hooks/useTeaAndApeBals";
import type { ReactNode } from "react";
interface Props {
  row: TUserPosition;
  isApe: boolean;
  apeAddress?: TAddressString;
  setSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export function BurnTableRow({
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
    <tr className="  hidden md:grid gap-x-4 grid-cols-5 items-center text-left text-gray text-white">
      <th className="flex">
        <span>{isApe ? "APE" : "TEA"}-</span>
        <span>{row.vaultId} </span>
      </th>
      <th>{row.debtSymbol}</th>
      <th>{row.collateralSymbol}</th>
      <th>{getLeverageRatio(parseInt(row.leverageTier))}x</th>
      <th>
        <div className="flex gap-x-8 items-center justify-between">
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

export function BurnTableRowMobile({
  setSelectedRow,
  isApe,
  apeAddress,
  row,
}: Props) {
  const { apeBal, teaBal } = useTeaAndApeBals({
    apeAddress,
    vaultId: row.vaultId,
    isApe,
  });
  return (
    <tr className="md:hidden border-opacity-35 w-[380px] flex flex-col gap-y-4 px-4 text-[14px] border-b border-white pb-4">
      <MobileTh title="Token">
        <div>
          <span>{isApe ? "APE" : "TEA"}-</span>
          <span>{row.vaultId} </span>
        </div>
      </MobileTh>
      <MobileTh title={"Long"}>{row.debtSymbol}</MobileTh>
      <MobileTh title={"Versus"}>{row.collateralSymbol}</MobileTh>
      <MobileTh title={"Leverage"}>
        {getLeverageRatio(parseInt(row.leverageTier))}
      </MobileTh>
      <MobileTh title="Balance">
        {isApe ? (
          <span>
            {parseFloat(parseFloat(formatUnits(apeBal ?? 0n, 18)).toFixed(4))}
          </span>
        ) : (
          <span>
            {parseFloat(parseFloat(formatUnits(teaBal ?? 0n, 18)).toFixed(4))}
          </span>
        )}
      </MobileTh>
      <Button
        onClick={() => setSelectedRow(row.vaultId)}
        type="button"
        variant="outline"
      >
        Burn
      </Button>
    </tr>
  );
}

function MobileTh({ title, children }: { title: string; children: ReactNode }) {
  return (
    <th className="flex justify-between gap-x-12">
      <h2 className="text-gray font-light">{title}</h2>
      {children}
    </th>
  );
}
