import type { ReactNode } from "react";
import PageHeader from "../shared/pageHeader";

export default function LeverageLiquidityPage({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="w-full">
      {/* <PageHeader>{title}</PageHeader> */}
      <br />
      <div className="w-full">{children}</div>
    </div>
  );
}
