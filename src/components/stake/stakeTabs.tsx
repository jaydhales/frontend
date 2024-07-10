"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";

// import StakeForm from "./stakeForm/stakeForm";

const StakeTabs = () => {
  return (
    <Tabs defaultValue="stake">
      <div className="flex justify-center">
        <TabsList defaultValue={"stake"}>
          <TabsTrigger value={"stake"}>Stake</TabsTrigger>
          <TabsTrigger value={"unstake"}>Unstake</TabsTrigger>
          <TabsTrigger value={"claimFees"}>Claim fees</TabsTrigger>
        </TabsList>
      </div>
      <br />
      <TabsContent value="stake">
        <Container>
          <div>Stake</div>
        </Container>
      </TabsContent>
      <TabsContent value="unstake">
        <Container>
          <div>Unstake</div>
        </Container>
      </TabsContent>
      <TabsContent value="claimFees">
        <Container>
          <div>Claim Fees</div>
        </Container>
      </TabsContent>
    </Tabs>
  );
};

export default StakeTabs;
