import { X } from "lucide-react";
import BurnTableHeaders from "./burnTableHeader";
import type { TAddressString } from "@/lib/types";
import { formatNumber, getLeverageRatio } from "@/lib/utils";
import BurnForm from "../burnForm/burnForm";
import type { TUserPosition } from "@/server/queries/vaults";
import { useTeaAndApeBals } from "./hooks/useTeaAndApeBals";
import { formatEther } from "viem";

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
      <div className="flex flex-col gap-y-4 pb-4">
        <BurnTableHeaders />
        <tr className="grid h-8 gap-x-4 relative grid-cols-5 items-center text-left text-white">
          <button
            type="button"
            onClick={() => close()}
            className="absolute top-2 right-2   cursor-pointer text-white/80 transition-transform hover:scale-105 hover:text-white"
          >
            <X />
          </button>

          <th className="flex font-normal items-center gap-x-1 ">
            <span className="">{isApe ? "APE" : "TEA"}</span>
            <span className="text-gray-500">-</span>
            <span className="text-accent-100 text-xl ">{params.vaultId} </span>
          </th>
          <th className="font-normal">{params?.debtSymbol}</th>
          <th className="font-normal">{params?.collateralSymbol}</th>
          <th className="font-normal">
            {getLeverageRatio(parseInt(params?.leverageTier ?? "0"))}x
          </th>
          <th className="font-normal  flex items-center ">
            <h2 className="h-8 flex items-center">
              <span>{formatNumber(formatEther(data ?? 0n), 4)}</span>
            </h2>
          </th>
        </tr>
      </div>
      <div className="flex justify-center pt-4">
        <div className="justify-between bg-secondary-700 p-4 rounded-lg">
          <BurnForm isApe={isApe} balance={data} row={params} />
        </div>
      </div>
    </div>
  );
}
