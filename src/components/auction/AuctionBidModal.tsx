import { Dialog, DialogContent } from "@/components/ui/dialog";
import TransactionModal from "@/components/shared/transactionModal";
import AuctionBidInputs from "./bid-inputs";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import { getLogoAsset } from "@/lib/assets";
import type { Address } from "viem";
import { formatUnits, parseEther } from "viem";
import useAuctionTokenInfo from "@/components/auction/hooks/useAuctionTokenInfo";
import { useFormContext } from "react-hook-form";
import type { TMintFormFields } from "@/components/providers/mintFormProvider";
import type { TAuctionBidFormFields } from "@/components/providers/auctionBidFormProvider";
import { Button } from "@/components/ui/button";
import { useBid } from "@/components/auction/hooks/auctionSimulationHooks";

export type TAuctionBidModalState = {
  open: boolean;
  id?: string;
  bid?: bigint;
  isTopUp?: boolean;
  tokenSymbol?: string;
};

interface Props {
  open: TAuctionBidModalState;
  setOpen: (b: TAuctionBidModalState) => void;
}

export function AuctionBidModal({ open, setOpen }: Props) {
  const { id: tokenAddress, bid: currentBid, tokenSymbol, isTopUp } = open;

  const { userBalance, tokenDecimals, userBalanceFetching } =
    useAuctionTokenInfo({ tokenAddress });
  const { setError, formState, setValue, handleSubmit, getValues } =
    useFormContext<TAuctionBidFormFields>();

  const bidRequest = useBid({
    token: tokenAddress,
    amount: getValues("bid"),
    tokenDecimals,
  });

  console.log({ bidRequest });

  const balance = userBalance?.tokenBalance?.result;

  return (
    <Dialog open={open.open} onOpenChange={(open) => setOpen({ open })}>
      <DialogContent title="Auction Bid Modal" className="bg-transparent">
        <div
          className={`nav-shadow relative rounded-xl bg-secondary p-4  text-white transition-all duration-700 `}
        >
          <TransactionModal.Close setOpen={(open) => setOpen({ open })} />
          <h1 className="text-center font-lora text-2xl">
            {isTopUp ? "Top up bid" : "Place bid"}{" "}
          </h1>
          <AuctionBidInputs.Root>
            <AuctionBidInputs.Inputs
              decimals={tokenDecimals ?? 18}
              disabled={false}
              inputLoading={false}
              balance={formatUnits(balance ?? 0n, tokenDecimals ?? 18)}
            >
              <ImageWithFallback
                src={getLogoAsset(tokenAddress as Address)}
                alt="alt"
                width={25}
                height={25}
              />
              <p>{tokenSymbol}</p>
            </AuctionBidInputs.Inputs>
          </AuctionBidInputs.Root>
          <Button
            onClick={handleSubmit((data) => {
              console.log(data);
            })}
            disabled={
              formState.isSubmitting ||
              userBalanceFetching ||
              getValues("bid") <=
                formatUnits(currentBid ?? BigInt(0), tokenDecimals ?? 18)
            }
            variant="submit"
            className="mt-4 w-full md:w-full"
          >
            {" "}
            {isTopUp ? "Top up Bid" : "Place Bid"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
