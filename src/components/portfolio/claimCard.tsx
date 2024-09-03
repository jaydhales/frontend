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
    <Card className="border border-secondary-300">
      <ClaimModal open={openModal} setOpen={setOpenModal} />
      <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
        <span>Claimable Value</span>
      </h2>
      <div className="pt-2"></div>
      <div className="bg-secondary-300 px-2 py-4 rounded-md text-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl">
            {formatEther(dividends ?? 0n)}{" "}
            <span className="text-gray-500 text-[14px]">SIR</span>
          </h3>
          <Button onClick={() => setOpenModal(true)} className="py-2">
            Claim
          </Button>
        </div>
      </div>
    </Card>
  );
}
