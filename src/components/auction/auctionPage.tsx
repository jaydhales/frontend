"use client";
import PageHeadingSpace from "@/components/shared/pageHeadingSpace";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OngoingAuction from "@/components/auction/ongoingAuction";
import NewAuction from "@/components/auction/newAuction";
import PastAuction from "@/components/auction/pastAuction";

const tabsItems = [
  ["ongoing", "Ongoing"],
  ["new", "Start new"],
  ["past", "Past"],
] as const;
export const auctionTabContentHeader = "";

const AuctionPage = () => {
  return (
    <div>
      <PageHeadingSpace />
      <Container className="max-w-[904px] lg:w-[904px]">
        <Tabs defaultValue="ongoing">
          <TabsList className="mx-auto w-max">
            {tabsItems.map(([value, text]) => (
              <TabsTrigger
                value={value}
                key={value}
                className="data-[state=active]:border-white"
              >
                {text}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="ongoing" className="mt-10">
            <OngoingAuction />
          </TabsContent>
          <TabsContent value="new" className="mt-10">
            <NewAuction />
          </TabsContent>
          <TabsContent value="past" className="mt-10">
            <PastAuction />
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default AuctionPage;
