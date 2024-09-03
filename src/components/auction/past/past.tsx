"use client";

import AuctionCard from "@/components/auction/auctionTypes/auctionCard";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";

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
          <AuctionCard
            token1="SIR"
            token2="USDT"
            bidAmount={100n}
            highestBid={100n}
            closeTime={168624n}
            leader={address}
            participanting={true}
          />
          <AuctionCard
            token1="SIR"
            token2="USDT"
            bidAmount={100n}
            highestBid={100n}
            closeTime={168624n}
            leader={address}
            participanting={true}
          />
        </div>
      </div>
    </>
  );
};

export default Ongoing;
