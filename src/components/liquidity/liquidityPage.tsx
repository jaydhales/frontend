import type { ReactNode } from "react";
import React from "react";

export default function LiquidityPage({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <h1 className="text-center font-lora text-[32px] font-bold">
        Provide Liquidity
      </h1>
      <div className="pt-[44px]"></div>
      <div className="w-full">{children}</div>
    </div>
  );
}
