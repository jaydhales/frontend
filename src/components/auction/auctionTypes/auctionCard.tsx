import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Hex } from "viem";

interface AuctionCardProps {
  token1: string;
  token2: string;
  bidAmount: bigint;
  highestBid: bigint;
  closeTime: bigint;
  leader: Hex;
  participanting: boolean;
}

const AuctionCard = ({
  token1,
  token2,
  bidAmount,
  highestBid,
  closeTime,
  leader,
  participanting,
}: AuctionCardProps) => {
  return (
    <Card className="w-[400px] p-4">
      <h2 className="font-lora text-sm text-gray-500">Auction Details</h2>
      <div className="font-lora font-bold text-2xl uppercase">
        {token1} / {token2}
      </div>
      <div className="font-lora grid grid-cols-2 gap-4 py-8">
        {participanting && (
          <div>
            <p className="text-sm text-gray-500">Your Bid</p>
            <p className="font-semibold">
              {bidAmount.toString()} {token2}
            </p>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">Highest Bid</p>
          <p className="font-semibold">
            {highestBid.toString()} {token2}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Closing Time</p>
          <p className="font-semibold">
            {(() => {
              const totalSeconds = Number(closeTime);
              const days = Math.floor(totalSeconds / (24 * 60 * 60));
              const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = totalSeconds % 60;
              return `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            })()}
          </p>
        </div>
        {participanting && (
          <div>
            <p className="text-sm text-gray-500">Leader</p>
            <p className="font-semibold">
              {`${leader.slice(0, 6)}...${leader.slice(-4)}`}
            </p>
          </div>
        )}
      </div>
      <Button
        variant="submit"
        type="button"
        className="font-lora w-full max-w-full"
      >
        Bid
      </Button>
    </Card>
  );
};

export default AuctionCard;
