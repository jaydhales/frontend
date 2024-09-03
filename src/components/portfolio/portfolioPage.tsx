"use client";
import React, { useState } from "react";
import BurnTable from "./burnTable/burnTable";
import { Card } from "../ui/card";
import { Container } from "../ui/container";
import PageHeader from "../shared/pageHeader";
import { Button } from "../ui/button";

export default function PortfolioPage() {
  return (
    <div>
      <PageHeader>Portfolio</PageHeader>
      <div className="pt-6"></div>
      <Container>
        <div className="grid grid-cols-2 gap-x-4">
          <Card className="border border-secondary-100">
            <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
              <span>Staked Value</span>
            </h2>
            <div className="pt-2"></div>
            <div className="bg-secondary-200 px-2 py-4 rounded-md text-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl">
                  7291 <span className="text-gray-500 text-[14px]">SIR</span>
                </h3>
                <Button className="py-2">Unstake</Button>
              </div>
            </div>
          </Card>
          <Card className="border border-secondary-100">
            <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
              <span>Claimable Value</span>
            </h2>
            <div className="pt-2"></div>
            <div className="bg-secondary-200 px-2 py-4 rounded-md text-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl">
                  7291 <span className="text-gray-500 text-[14px]">SIR</span>
                </h3>
                <Button className="py-2">Claim</Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="pt-8"></div>
        <Card className="lg:w-[900px] border border-secondary-100 ">
          <div className="flex justify-between items-center pb-8">
            <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
              <span>My Tokens</span>
            </h2>
            <Slider />
          </div>
          <BurnTable />
        </Card>
      </Container>
    </div>
  );
}

function Slider() {
  const [value, setValue] = useState<"ape" | "tea" | "all">("ape");
  return (
    <div>
      <div className="rounded-full flex gap-x-1  items-center border border-secondary-100">
        <div
          data-active={value === "ape" ? "true" : ""}
          className="data-[active=true]:bg-gray-600 rounded-full px-3 text-sm py-1 cursor-pointer"
          onClick={() => setValue("ape")}
        >
          APE
        </div>
        <div
          onClick={() => setValue("tea")}
          data-active={value === "tea" ? "true" : ""}
          className="data-[active=true]:bg-gray-600 rounded-full px-3 text-sm py-1 cursor-pointer"
        >
          TEA
        </div>
        <div
          onClick={() => setValue("all")}
          data-active={value === "all" ? "true" : ""}
          className="data-[active=true]:bg-gray-600 rounded-full px-3 text-sm py-1 cursor-pointer"
        >
          ALL
        </div>
      </div>
    </div>
  );
}
