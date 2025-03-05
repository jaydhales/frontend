import React from "react";
import AuctionContentWrapper from "@/components/auction/auctionContentWrapper";
import AuctionCard, {
  AuctionCardTitle,
} from "@/components/auction/auctionCard";

const NewAuction = () => {
  return (
    <div>
      <AuctionContentWrapper header={"Ready to Start"}>
        {[1, 2, 3, 4].map((item, index) => (
          <AuctionCard
            data={[
              [
                {
                  title: AuctionCardTitle.AUCTION_DETAILS,
                  content: "XXXX / XXXX",
                  variant: "large",
                },
                {
                  title: AuctionCardTitle.AMOUNT,
                  content: "XXX ETH",
                  variant: "large",
                },
              ],
            ]}
            key={index}
          />
        ))}
      </AuctionContentWrapper>
      <div className="h-[64px]" />
      <AuctionContentWrapper header={"On Hold"}>
        {[1, 2, 3, 4].map((item, index) => (
          <AuctionCard
            data={[
              [
                {
                  title: AuctionCardTitle.AUCTION_DETAILS,
                  content: "XXXX / XXXX",
                  variant: "large",
                },
                {
                  title: AuctionCardTitle.AMOUNT,
                  content: "XXX ETH",
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

export default NewAuction;
