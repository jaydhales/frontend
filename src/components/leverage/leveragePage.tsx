import React, { ReactNode } from "react";

export default function LeveragePage({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <h1 className="text-center font-lora text-[32px] font-bold">
        Take on leverage
      </h1>
      <br />
      <div className="w-full">{children}</div>
    </div>
  );
}
