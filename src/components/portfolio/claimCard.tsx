import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { useAccount } from "wagmi";
import { ClaimModal } from "./claimModal";
import { formatEther } from "viem";

export default function ClaimCard() {
  const { isConnected, address } = useAccount();
  const [openModal, setOpenModal] = useState(false);

  const { data: dividends } = api.user.getDividends.useQuery(
    {
      staker: address,
    },
    { enabled: isConnected },
  );
  return (
    <div className=" border-secondary-300">
      <ClaimModal open={openModal} setOpen={setOpenModal} />
      <div className="bg-secondary-300 px-2 py-2 rounded-md text-2xl">
        <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
          <span>Claimable Dividends</span>
        </h2>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl">
            {formatEther(dividends ?? 0n)}
            <span className="text-gray-500 text-sm"> ETH</span>
          </h3>
          <Button onClick={() => setOpenModal(true)} className="py-2">
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
}
