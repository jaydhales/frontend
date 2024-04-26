"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Container } from "../ui/container";
import { Card } from "../ui/card";
import { HeadOne } from "../ui/headers";
import MintForm from "./mintForm";
import VaultTable from "./vaultTable";

export default function LeverageTabs() {
  return (
    <Tabs defaultValue="mint">
      <div className="flex justify-center">
        <TabsList defaultValue={"mint"}>
          <TabsTrigger value={"mint"}>Mint</TabsTrigger>
          <TabsTrigger value={"burn"}>Burn</TabsTrigger>
        </TabsList>
      </div>
      <br />
      <TabsContent value="mint">
        <Container>
          <div className="grid w-full grid-cols-2 gap-x-[16px]">
            <MintForm />
            <Card>
              <HeadOne>Popular Vaults</HeadOne>
              <VaultTable />
            </Card>
          </div>
        </Container>
      </TabsContent>
      {/*  */}
      <TabsContent value="burn">
        <Container>
          <Card>
            <h1>Pools</h1>
          </Card>
        </Container>
      </TabsContent>
    </Tabs>
  );
}
