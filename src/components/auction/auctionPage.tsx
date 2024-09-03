import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import Ongoing from "@/components/auction/ongoing/ongoing";
import Past from "@/components/auction/past/past";
import Create from "@/components/auction/create/create";

const AuctionPage = () => {
  return (
    <Tabs defaultValue="ongoing">
      <div className="flex justify-center">
        <TabsList defaultValue={"ongoing"}>
          <TabsTrigger value={"ongoing"}>Ongoing</TabsTrigger>
          <TabsTrigger value={"create"}>Create</TabsTrigger>
          <TabsTrigger value={"past"}>Past</TabsTrigger>
        </TabsList>
      </div>
      <br />
      <TabsContent value="ongoing">
        <Container>
          <Ongoing />
        </Container>
      </TabsContent>
      <TabsContent value="create">
        <Container>
          <Create />
        </Container>
      </TabsContent>
      <TabsContent value="past">
        <Container>
          <Past />
        </Container>
      </TabsContent>
    </Tabs>
  );
};

export default AuctionPage;
