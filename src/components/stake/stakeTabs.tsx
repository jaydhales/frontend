"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

import StakeFormProvider from "@/components/providers/stakeFormProvider";

import { Card } from "../ui/card";
import ClaimCard from "../shared/claimCard";
import { StakeModal } from "../shared/stake/stakeModal";

const StakeTabs = () => {
  const [stakeModal, setStakeModal] = useState(false);
  return (
    <div>
      <br />
      <Container>
        <Card className="mx-auto grid w-[600px] grid-cols-2">
          <div>
            <StakeFormProvider>
              <button
                onClick={() => {
                  setStakeModal(true);
                }}
              >
                Open stake
              </button>
              <StakeModal open={stakeModal} setOpen={setStakeModal} />
            </StakeFormProvider>
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
