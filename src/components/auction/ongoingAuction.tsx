import AuctionContentWrapper from "@/components/auction/auctionContentWrapper";
import AuctionCard, {
  AuctionCardTitle,
} from "@/components/auction/auctionCard";

const OngoingAuction = () => {
  return (
    <div>
      <AuctionContentWrapper header={"Ongoing auctions you’re Part of"}>
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
                  content: "DD:HH:MM:SS",
                },
                {
                  title: AuctionCardTitle.LEADER,
                  content: index === 0 ? "YOU ARE LEADING" : "SOMEONE ELSE",
                  variant: "large",
                },
              ],
            ]}
            key={index}
          />
        ))}
      </AuctionContentWrapper>
      <div className="h-[64px]" />
      <AuctionContentWrapper header={"Other ongoing auctions"}>
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
                  title: AuctionCardTitle.CLOSING_TIME,
                  content: "DD:HH:MM:SS",
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

export default OngoingAuction;
