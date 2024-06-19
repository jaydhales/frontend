"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Container } from "../ui/container";
import { Card } from "../ui/card";
import StakeForm from "./stakeForm/stakeForm";

import MintFormProvider from "../providers/mintFormProvider";
// import type { TVaults } from "@/lib/types";

export default function SakeTabs() {
  return (
    <Tabs defaultValue="stake">
      <div className="flex justify-center">
        <TabsList defaultValue={"stake"}>
          <TabsTrigger value={"stake"}>Stake</TabsTrigger>
          <TabsTrigger value={"unstake"}>Unstake</TabsTrigger>
          <TabsTrigger value={"claim"}>Claim</TabsTrigger>
        </TabsList>
      </div>
      <br />
      <TabsContent value="stake">
        <Container className={"max-w-4xl"}>
          <div className={"text-center"}>
            <p>
              By staking your SIR you have a pro-rata claim on future fees from
              the SIR protocol. The amount will depend on the activity on SIR
              and what vaults are most active.
            </p>
            <p>So far our stakers have earned XXX ETH</p>
            <p>In the last 30 days stakers have earned XXX ETH</p>
          </div>
          <Card>Stake Form</Card>

        </Container>
      </TabsContent>
      {/*  */}
      <TabsContent value="unstake">
        <Container className={"max-w-4xl"}>
          <Card>Unstake Form</Card>
        </Container>
      </TabsContent>
      {}
      <TabsContent value="claim">
        <Container className={"max-w-4xl"}>
          <Card>Claim Form</Card>
        </Container>
      </TabsContent>
    </Tabs>
  );
}
