import type { ReactNode } from "react";
import React from "react";
import PageHeader from "../shared/pageHeader";

export default function LeveragePage({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <PageHeader>Take on leverage</PageHeader>
      <br />
      <div className="w-full">{children}</div>
    </div>
  );
}
