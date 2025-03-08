import React from "react";
import AuctionContentWrapper from "@/components/auction/auctionContentWrapper";
import AuctionCard, {
  AuctionCardTitle,
} from "@/components/auction/auctionCard";
import type { TAuctions, TVaultsCollateralToken } from "@/lib/types";
import { TokenDisplay } from "@/components/ui/token-display";
import { useAccount } from "wagmi";

const PastAuction = ({
  auctions,
  tokensForAuctions,
}: {
  auctions?: TAuctions[];
  tokensForAuctions: TVaultsCollateralToken;
}) => {
  const { address } = useAccount();

  return (
    <div>
      <AuctionContentWrapper header={"Past auctions"}>
        {auctions?.map(({ bidder, bid, tokenIndex }) => (
          <AuctionCard
            data={[
              [
                {
                  title: AuctionCardTitle.AUCTION_DETAILS,
                  content: tokensForAuctions.collateralSymbol[tokenIndex],
                  variant: "large",
                },
              ],
              [
                {
                  title: AuctionCardTitle.YOUR_BID,
                  content: "XXX ETH",
                },
                {
                  title: AuctionCardTitle.HIGHEST_BID,
                  content: (
                    <TokenDisplay
                      amount={bid}
                      labelSize="small"
                      amountSize="large"
                      decimals={tokensForAuctions.apeDecimals[tokenIndex]}
                      unitLabel={
                        tokensForAuctions.collateralSymbol[tokenIndex] ?? ""
                      }
                      className={"text-lg"}
                    />
                  ),
                },
              ],
              [
                {
                  title: AuctionCardTitle.CLOSING_TIME,
                  content: "Closed",
                },
                {
                  title: AuctionCardTitle.LEADER,
                  content: bidder === address ? "YOU WON" : "YOU LOST",
                  variant: "large",
                },
              ],
            ]}
            key={tokenIndex}
          />
        ))}
      </AuctionContentWrapper>
    </div>
  );
};

export default PastAuction;
