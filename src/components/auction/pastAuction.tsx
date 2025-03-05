import React from "react";
import AuctionContentWrapper from "@/components/auction/auctionContentWrapper";
import AuctionCard, {
  AuctionCardTitle,
} from "@/components/auction/auctionCard";

const PastAuction = () => {
  return (
    <div>
      <AuctionContentWrapper header={"Past auctions"}>
        {[1, 2].map((item, index) => (
          <AuctionCard
            data={[
              [
                {
                  title: AuctionCardTitle.AUCTION_DETAILS,
                  content: "XXXX / XXXX",
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
                  content: "XXX ETH",
                },
              ],
              [
                {
                  title: AuctionCardTitle.CLOSING_TIME,
                  content: "Closed",
                },
                {
                  title: AuctionCardTitle.LEADER,
                  content: index === 0 ? "YOU WON" : "YOU LOST",
                  variant: "large",
                },
              ],
            ]}
            key={index}
          />
        ))}
      </AuctionContentWrapper>
    </div>
  );
};

export default PastAuction;
