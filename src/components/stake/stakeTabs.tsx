"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";

import StakeFormProvider from "@/components/providers/stakeFormProvider";
import StakeForm from "./stakeForm/stakeForm";

import UnstakeForm from "./unstakeForm/unstakeForm";
import UnstakeFormProvider from "../providers/unstakeFormProvider";

import ClaimFees from "./claimFees/claimFees";

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
          <StakeFormProvider>
            <StakeForm></StakeForm>
          </StakeFormProvider>
        </Container>
      </TabsContent>
      <TabsContent value="unstake">
        <Container>
          <UnstakeFormProvider>
            <UnstakeForm></UnstakeForm>
          </UnstakeFormProvider>
        </Container>
      </TabsContent>
      <TabsContent value="claimFees">
        <Container>
          <ClaimFees balance={"111.1"}></ClaimFees>
        </Container>
      </TabsContent>
    </Tabs>
  );
};

export default StakeTabs;
