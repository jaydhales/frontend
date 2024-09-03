"use client";

import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import CreateAuction from "@/components/auction/auctionTypes/createAuctionCard";

const Ongoing = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  if (!address) {
    return (
      <Button
        onClick={() => openConnectModal?.()}
        variant="submit"
        type="button"
        className="max-w-full"
      >
        Connect Wallet
      </Button>
    );
  }
  return (
    <>
      <div className="w-[100%] flex flex-col items-center">
        <div className="font-lora font-bold text-2xl uppercase">
          Past Auctions
        </div>
        <div className="w-[100%] flex flex-wrap justify-center gap-4 p-10">
          <CreateAuction token1="SIR" token2="USDT" amount={100n} />
          <CreateAuction token1="SIR" token2="USDT" amount={100n} />
          <CreateAuction token1="SIR" token2="USDT" amount={100n} />
          <CreateAuction token1="SIR" token2="USDT" amount={100n} />
        </div>
        <div className="font-lora font-bold text-2xl uppercase">On Hold</div>
        <div className="w-[100%] flex flex-wrap justify-center gap-4 p-10">
          <CreateAuction
            token1="SIR"
            token2="USDT"
            amount={100n}
            startsIn={168624n}
          />
          <CreateAuction
            token1="SIR"
            token2="USDT"
            amount={100n}
            startsIn={168624n}
          />
          <CreateAuction
            token1="SIR"
            token2="USDT"
            amount={100n}
            startsIn={168624n}
          />
          <CreateAuction
            token1="SIR"
            token2="USDT"
            amount={100n}
            startsIn={168624n}
          />
        </div>
      </div>
    </>
  );
};

export default Ongoing;
