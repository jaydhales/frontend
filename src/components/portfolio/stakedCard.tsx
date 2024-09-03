import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import UnstakeFormProvider from "../providers/unstakeFormProvider";
import { UnstakeModal } from "./unstakeModal";
import { useState } from "react";

export function StakedCard() {
  const { isConnected, address } = useAccount();
  const { data: totalBalance } = api.user.getTotalSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected },
  );
  const [openModal, setOpenModal] = useState(false);
  return (
    <Card className="border border-secondary-300">
      <UnstakeFormProvider>
        <UnstakeModal open={openModal} setOpen={setOpenModal} />
      </UnstakeFormProvider>
      <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
        <span>Staked Value</span>
      </h2>
      <div className="pt-2"></div>
      <div className="bg-secondary-300 px-2 py-4 rounded-md text-2xl">
        <div className="flex items-center justify-between">
          <div className="text-3xl flex gap-x-[2px] ">
            <h4>{formatNumber(formatUnits(totalBalance ?? 0n, 18))}</h4>
            <div className="flex items-end ">
              <h4 className="text-gray-500 text-sm ">SIR</h4>
            </div>
          </div>
          <Button onClick={() => setOpenModal(true)} className="py-2">
            Unstake
          </Button>
        </div>
      </div>
    </Card>
  );
}
