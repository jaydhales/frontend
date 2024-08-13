import { ReactNode } from "react";
import PageHeader from "../pageHeader";

export default function LeverageLiquidityPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <PageHeader>Take on leverage</PageHeader>
      <br />
      <div className="w-full">{children}</div>
    </div>
  );
}
