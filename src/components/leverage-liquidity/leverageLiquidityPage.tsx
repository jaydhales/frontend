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
    <div className="xl:w-[1300px]">
      {/* <PageHeader>{title}</PageHeader> */}
      <div className="pt-[44px]"></div>
      <div className="w-full">{children}</div>
    </div>
  );
}
