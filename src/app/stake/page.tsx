import React from "react";
import StakePage from "@/components/stake/stakePage";
import StakeTabs from "@/components/stake/stakeTabs";

const StakeHome = () => {
  return (
    <main className="flex z-10 flex-col items-center justify-center text-white">
      <StakePage>
        <StakeTabs></StakeTabs>
      </StakePage>
    </main>
  );
};

export default StakeHome;
