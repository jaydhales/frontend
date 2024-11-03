"use client";
import { Container } from "@/components/ui/container";
import { Card } from "../ui/card";
import ClaimCard from "../shared/claimCard";
import StakeCard from "./stakeCard";

const StakeTabs = () => {
  return (
    <div className="pt-6">
      <Container>
        <Card className="mx-auto grid w-[600px]  gap-y-4">
          <div>
            <StakeCard />
          </div>
          <div>
            <ClaimCard />
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default StakeTabs;
