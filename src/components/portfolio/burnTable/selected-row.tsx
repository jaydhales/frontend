import BurnTableHeaders from "./burnTableHeader";
import type { TAddressString } from "@/lib/types";
import { formatNumber, getLeverageRatio } from "@/lib/utils";
import BurnForm from "../burnForm/burnForm";
import type { TUserPosition } from "@/server/queries/vaults";
import { useTeaAndApeBals } from "./hooks/useTeaAndApeBals";
import { formatEther, formatUnits } from "viem";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";

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
  const { address } = useAccount();
  const { data: teaRewards } = api.user.getTeaRewards.useQuery(
    { userAddress: address ?? "0x", vaultId: params.vaultId },
    { enabled: Boolean(address) && !isApe },
  );
  const atBal = isApe ? apeBal : teaBal;
  if (!params) {
    <div>
      <h1>Hello</h1>
    </div>;
  }
  if (!atBal) {
    return;
  }
  const isClaiming = (teaRewards ?? 0n) > 0n && !isApe;
  const balance = isClaiming
    ? formatUnits(teaRewards ?? 0n, 12)
    : formatEther(atBal);
  return (
    <div>
      <div className="md:flex hidden flex-col gap-y-4 pb-4">
        <tr className=" font-thin hidden text-[14px] md:grid gap-x-4 grid-cols-5 text-left text-gray-500 border-b border-white  pb-1 border-opacity-10">
          <th className="font-normal">Token</th>
          <th className="font-normal">Long</th>
          <th className="font-normal">Versus</th>
          <th className="font-normal">Leverage ratio</th>
          <th className="font-normal justify-end flex">Balance</th>
        </tr>
        {/* <BurnTableHeaders /> */}
        <tr className="grid h-8 gap-x-4 relative grid-cols-5 items-center text-left text-white">
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
          <th className="font-normal  flex justify-end items-center ">
            <h2 className="h-8 flex items-center space-x-1">
              <span className="text-lg">{formatNumber(balance, 6)}</span>
              <span className="text-gray-500 text-[14px]">
                {isClaiming ? "SIR" : ""}
              </span>
            </h2>
          </th>
        </tr>
      </div>
      <div className="flex justify-center pt-4">
        <div
          id="burn-form"
          className="justify-between bg-secondary-700 p-4 rounded-lg"
        >
          <BurnForm
            teaRewardBalance={teaRewards}
            levTier={params.leverageTier}
            close={close}
            isApe={isApe}
            balance={atBal}
            row={params}
          />
        </div>
      </div>
    </div>
  );
}
