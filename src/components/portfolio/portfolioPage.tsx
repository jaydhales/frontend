"use client";
import React, { useState } from "react";
import BurnTable from "./burnTable/burnTable";
import { Card } from "../ui/card";
import { Container } from "../ui/container";
// import PageHeader from "../shared/pageHeader";
import { StakedCard } from "./stakedCard";
import ClaimCard from "./claimCard";
import { SirCard } from "./sirCard";

export default function PortfolioPage() {
  const [value, setValue] = useState<"ape" | "tea" | "all">("all");
  return (
    <div className="w-full ">
      <div className="pt-[44px]"></div>
      <Container>
        <Card className="lg:w-[900px] px-4 mx-auto  w-full">
          <div className="space-y-3 ">
            <SirCard />
            <div className="grid grid-cols-2 pt-2  gap-x-3">
              {/* <SirCard /> */}
              <StakedCard />
              <ClaimCard />
            </div>
          </div>
          <div className="pt-8"></div>
          <div className="bg-secondary-400 px-4 py-2 rounded-md">
            <div className="flex  justify-between items-center pb-4 lg:pb-8 ">
              <h2 className="flex text-gray-200 gap-x-1 pb-1 items-center text-sm ">
                <span>My Tokens</span>
              </h2>
              <Slider value={value} setValue={setValue} />
            </div>
            <div className="">
              <BurnTable filter={value} />
            </div>
          </div>
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
        <Slide active={value === "all"} onClick={() => setValue("all")}>
          All
        </Slide>
        <Slide active={value === "ape"} onClick={() => setValue("ape")}>
          APE
        </Slide>
        <Slide onClick={() => setValue("tea")} active={value === "tea"}>
          TEA
        </Slide>
      </div>
    </div>
  );
}

function Slide({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      data-active={active ? "true" : ""}
      className=" w-12 text-center data-[active=true]:bg-secondary-100 rounded-full px-3 text-sm py-1 cursor-pointer"
    >
      {children}
    </div>
  );
}
