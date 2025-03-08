import React, { useEffect } from "react";
import AuctionContentWrapper from "@/components/auction/auctionContentWrapper";
import AuctionCard, {
  AuctionCardTitle,
} from "@/components/auction/auctionCard";
import { api } from "@/trpc/react";
import type { TVaultsCollateralToken } from "@/lib/types";
import { TokenDisplay } from "@/components/ui/token-display";
import { useWriteContract } from "wagmi";
import { useStartAuction } from "@/components/auction/hooks/auctionSimulationHooks";

const NewAuction = ({
  tokensForAuctions,
}: {
  tokensForAuctions: TVaultsCollateralToken;
}) => {
  const { data: tokenFeesInVault, refetch } =
    api.vault.getTotalCollateralFeesInVault.useQuery(
      tokensForAuctions.collateralToken,
      {
        enabled: tokensForAuctions.collateralSymbol.length > 0,
      },
    );
  const { writeContractAsync } = useWriteContract();
  const [id, setId] = React.useState<string>();
  const startAuctionRequest = useStartAuction({ id });

  const handleAuctionStart = (id: string) => {
    setId(id);
  };

  useEffect(() => {
    if (id && startAuctionRequest) {
      console.log("startAuctionRequest", { startAuctionRequest, id });
      writeContractAsync(startAuctionRequest)
        ?.then(async () => {
          setId(undefined);
          await refetch();
        })
        .catch((reason) => {
          console.log("startAuctionRequest error", reason);
        });
    }
  }, [id, refetch, startAuctionRequest, writeContractAsync]);

  return (
    <div>
      <AuctionContentWrapper header={"Ready to Start"}>
        {!!tokenFeesInVault &&
          tokenFeesInVault.map(
            (fees, index) =>
              fees > BigInt(0n) && (
                <AuctionCard
                  data={[
                    [
                      {
                        title: AuctionCardTitle.AUCTION_DETAILS,
                        content: tokensForAuctions.collateralSymbol[index],
                        variant: "large",
                      },
                      {
                        title: AuctionCardTitle.AMOUNT,
                        content: (
                          <TokenDisplay
                            labelSize="small"
                            amountSize="large"
                            amount={fees}
                            decimals={tokensForAuctions.apeDecimals[index]}
                            unitLabel={
                              tokensForAuctions.collateralSymbol[index] ?? ""
                            }
                            className={
                              "font-lora text-[32px] font-normal leading-[32px]"
                            }
                          />
                        ),
                        variant: "large",
                      },
                    ],
                  ]}
                  action={{
                    title: "Start Auction",
                    onClick: (id) => {
                      if (id) {
                        handleAuctionStart(id);
                      }
                    },
                  }}
                  id={tokensForAuctions.collateralToken[index]}
                  key={index}
                />
              ),
          )}
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
