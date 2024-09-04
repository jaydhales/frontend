import { api } from "@/trpc/react";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import UnstakeFormProvider from "../providers/unstakeFormProvider";
import { UnstakeModal } from "./unstakeModal";
import { useState } from "react";

export function SirCard() {
  const { isConnected, address } = useAccount();
  const { data: totalBalance } = api.user.getTotalSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected },
  );
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className=" border-secondary-300">
      <UnstakeFormProvider>
        <UnstakeModal open={openModal} setOpen={setOpenModal} />
      </UnstakeFormProvider>
      <div className="bg-secondary-300 px-2 py-2 rounded-md text-2xl">
        <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
          <span>Sir</span>
        </h2>
        <div className="flex items-center justify-between">
          <div className="text-3xl   ">
            <h4>
              <span>{formatNumber(formatUnits(totalBalance ?? 0n, 18))}</span>
              <span className="text-gray-500 text-sm"> SIR</span>
            </h4>
          </div>
          <Button onClick={() => setOpenModal(true)} className="py-2">
            Stake
          </Button>
        </div>
      </div>
    </div>
  );
}
