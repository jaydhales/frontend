import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CreateAuctionProps {
  token1: string;
  token2: string;
  amount: bigint;
  startsIn?: bigint | undefined;
}

const CreateAuction = ({
  token1,
  token2,
  amount,
  startsIn,
}: CreateAuctionProps) => {
  return (
    <Card className="w-[400px] p-4">
      <div className="flex flex-row gap-12 pb-6">
        <div>
          <h2 className="font-lora text-sm text-gray-500">Auction Details</h2>
          <div className="font-lora font-bold text-2xl uppercase">
            {token1} / {token2}
          </div>
        </div>

        <div>
          <h2 className="font-lora text-sm text-gray-500">Auction Details</h2>
          <div className="font-lora font-bold text-2xl uppercase">
            {amount.toString()}
          </div>
        </div>
      </div>

      <Button
        variant="submit"
        type="button"
        className="font-lora w-full max-w-full"
        disabled={Boolean(startsIn)}
      >
        {startsIn === undefined ? (
          "Bid"
        ) : (
          <p className="font-semibold">
            Starts in{" "}
            {(() => {
              const totalSeconds = Number(startsIn);
              const days = Math.floor(totalSeconds / (24 * 60 * 60));
              const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
              const minutes = Math.floor((totalSeconds % 3600) / 60);
              const seconds = totalSeconds % 60;
              return `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            })()}
          </p>
        )}
      </Button>
    </Card>
  );
};

export default CreateAuction;
