"use client";
import { Container } from "@/components/ui/container";
import { Card } from "../ui/card";
import ClaimCard from "../shared/claimCard";
import StakeCard from "./stakeCard";

const StakeTabs = () => {
  return (
    <div>
      <br />
      <Container>
        <Card className="mx-auto grid w-[600px] grid-cols-2 gap-x-4">
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
