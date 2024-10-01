import { Button } from "@/components/ui/button";
import type { TAddressString } from "@/lib/types";
import { getLeverageRatio, formatNumber } from "@/lib/utils";
import type { TUserPosition } from "@/server/queries/vaults";
import { formatUnits } from "viem";
import { useTeaAndApeBals } from "./hooks/useTeaAndApeBals";
import type { ReactNode } from "react";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
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
  const { address } = useAccount();
  const { data: teaRewards } = api.user.getTeaRewards.useQuery(
    { userAddress: address ?? "0x", vaultId: row.vaultId },
    { enabled: Boolean(address) && !isApe },
  );
  const rewards = teaRewards ?? 0n;
  const hasUnclaimedSir = isApe ? false : rewards > 0n;
  const teaBalance = hasUnclaimedSir
    ? formatUnits(teaRewards ?? 0n, 12)
    : formatUnits(teaBal ?? 0n, 18);
  return (
    <>
      <tr className="hidden md:grid py-2 gap-x-4 grid-cols-6 items-start text-left  text-white">
        <th className="flex font-normal items-center gap-x-1 ">
          <span className="">{isApe ? "APE" : "TEA"}</span>
          <span className="text-gray-500">-</span>
          <span className="text-accent-100 text-xl ">{row.vaultId} </span>
        </th>
        <th className="font-normal  flex items-center text-gray-200">
          {row.debtSymbol}
        </th>
        <th className="font-normal text-gray-200">{row.collateralSymbol}</th>
        <th className="font-normal text-gray-200">
          {getLeverageRatio(parseInt(row.leverageTier))}x
        </th>
        <th className="font-normal space-y-3 col-span-2">
          <div className="flex justify-between  items-start">
            <span>
              {formatNumber(formatUnits(apeBal ?? 0n, 18), 4)}
              <span className="text-[12px] text-gray-400 pl-1"></span>
            </span>
            <div className="space-x-1">
              {!isApe && (
                <Button
                  onClick={() => setSelectedRow(row.vaultId)}
                  type="button"
                  disabled={teaRewards === 0n}
                  className="h-7 px-5 rounded-full text-[14px] "
                >
                  Claim{" "}
                  <span className="text-[14px] pl-1 text-gray-300">
                    {formatNumber(teaBalance, 3)}
                    <span className="pl-[2px] ">SIR</span>
                  </span>
                </Button>
              )}
              <Button
                onClick={() => setSelectedRow(row.vaultId)}
                disabled={hasUnclaimedSir}
                type="button"
                className="h-7 py-2 px-5 w-[65px] rounded-full text-[14px] "
              >
                {"Burn"}
              </Button>
            </div>
          </div>

          {/* {!isApe && ( */}
          {/*   <div className="flex justify-between lg:gap-x-8 gap-x-4 items-center"> */}
          {/*     <span> */}
          {/*       {formatNumber(teaBalance, 4)} */}
          {/**/}
          {/*       <span className="text-[12px] text-gray-400 pl-1">SIR</span> */}
          {/*     </span> */}
          {/*   </div> */}
          {/* )} */}
        </th>
      </tr>
      <BurnTableRowMobile
        row={{
          ...row,
        }}
        apeAddress={apeAddress}
        isApe={isApe}
        setSelectedRow={setSelectedRow}
      />
    </>
  );
}
// todo share component
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
    <tr className="md:hidden bg-black/60 p-2 rounded-md  w-full flex flex-col gap-y-4 py-2  text-[14px]   pb-4">
      <div className=" justify-center pt-1 font-bold">
        <div className="flex justify-center text-lg">
          <span className="">{isApe ? "APE" : "TEA"}</span>
          <span className="text-gray-500">-</span>
          <span className="text-accent-100  ">{row.vaultId} </span>
        </div>
      </div>
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
      <th>
        <Button
          onClick={() => setSelectedRow(row.vaultId)}
          type="button"
          className="h-8 py-2 px-5 rounded-full text-[14px] "
        >
          Burn
        </Button>
      </th>
    </tr>
  );
}

function MobileTh({ title, children }: { title: string; children: ReactNode }) {
  return (
    <th className="flex justify-between gap-x-12">
      <h2 className="text-gray-500 font-light">{title}</h2>
      {children}
    </th>
  );
}
