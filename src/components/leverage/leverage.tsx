import React from "react";
import LeverageTabs from "./leverageTabs";

export default function Leverage() {
  return (
    <div className="w-full">
      <h1 className="text-center font-lora text-[32px] font-bold">
        Take on leverage
      </h1>
      <br />
      <div className="w-full">
        <LeverageTabs />
      </div>
    </div>
  );
}
