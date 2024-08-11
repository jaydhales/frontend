import { X } from "lucide-react";
import BurnTableHeaders from "./burnTableHeader";
import type { TAddressString } from "@/lib/types";
import { formatBigInt, getLeverageRatio } from "@/lib/utils";
import BurnForm from "../burnForm/burnForm";
import type { TUserPosition } from "@/server/queries/vaults";
import { useTeaAndApeBals } from "./hooks/useTeaAndApeBals";

export default function SelectedRow({
  params,
  close,
  apeAddress,
  isApe,
}: {
  params: TUserPosition;
  apeAddress?: TAddressString;
  isApe: boolean;
  close: () => void;
}) {
  const { apeBal, teaBal } = useTeaAndApeBals({
    vaultId: params.vaultId,
    apeAddress,
    isApe,
  });
  const data = isApe ? apeBal : teaBal;
  if (!params) {
    <div>
      <h1>Hello</h1>
    </div>;
  }
  return (
    <div>
      <div className="flex flex-col gap-y-4 border-b-2 pb-8">
        <button
          type="button"
          onClick={() => close()}
          className="absolute -right-4 -top-12 cursor-pointer text-white/80 transition-transform hover:scale-105 hover:text-white"
        >
          <X />
        </button>
        <BurnTableHeaders />
        <tr className="grid h-[41px] grid-cols-5 items-center text-left text-gray text-white">
          <th>{params?.vaultId}</th>
          <th>{params?.debtSymbol}</th>
          <th>{params?.collateralSymbol}</th>
          <th>{getLeverageRatio(parseInt(params?.leverageTier ?? "0"))}x</th>
          <th>{formatBigInt(data, 4)}</th>
        </tr>
      </div>
      <div className="flex justify-center pt-4">
        <div className=" w-[500px] justify-between">
          <BurnForm isApe={isApe} balance={data} row={params} />
        </div>
      </div>
    </div>
  );
}
