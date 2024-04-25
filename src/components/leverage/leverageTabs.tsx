"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Container } from "../ui/container";
import { Card } from "../ui/card";

export default function LeverageTabs() {
  return (
    <Tabs>
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
            <Card className="bg-card p-[24px] text-white">
              <div className="grid grid-cols-3">
                <div>
                  <h2>Go long:</h2>
                </div>
              </div>
            </Card>
            <Card>
              <h1>Positions</h1>
            </Card>
          </div>
        </Container>
      </TabsContent>
      {/*  */}
      <TabsContent value="burn">
        <Container>
          <Card>
            <h1 className="text-center">Popular Pools</h1>
          </Card>
        </Container>
      </TabsContent>
    </Tabs>
  );
}
