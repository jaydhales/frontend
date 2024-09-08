"use client";
import React, { useState } from "react";
import BurnTable from "./burnTable/burnTable";
import { Card } from "../ui/card";
import { Container } from "../ui/container";
import PageHeader from "../shared/pageHeader";
import { StakedCard } from "./stakedCard";
import ClaimCard from "./claimCard";
import { SirCard } from "./sirCard";

export default function PortfolioPage() {
  const [value, setValue] = useState<"ape" | "tea" | "all">("all");
  return (
    <div className="w-full">
      <Container>
        <Card className="lg:w-[900px] mx-auto w-full border border-secondary-200 ">
          <PageHeader>Portfolio</PageHeader>
          <div className="pb-6"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-3">
              <SirCard />
              <StakedCard />
            </div>
            <ClaimCard />
          </div>
          <div className="pt-8"></div>
          <div className="flex justify-between items-center pb-8">
            <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
              <span>My Tokens</span>
            </h2>
            <Slider value={value} setValue={setValue} />
          </div>
          <BurnTable filter={value} />
        </Card>
      </Container>
    </div>
  );
}

function Slider({
  value,
  setValue,
}: {
  value: "ape" | "tea" | "all";
  setValue: (a: "ape" | "tea" | "all") => void;
}) {
  return (
    <div>
      <div className="rounded-full flex gap-x-1  items-center border border-secondary-100">
        <div
          onClick={() => setValue("all")}
          data-active={value === "all" ? "true" : ""}
          className="data-[active=true]:bg-gray-600 rounded-full px-3 text-sm py-1 cursor-pointer"
        >
          ALL
        </div>
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
      </div>
    </div>
  );
}
