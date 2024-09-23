"use client";

import { useMemo } from "react";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";

import StakeFormProvider from "@/components/providers/stakeFormProvider";
import StakeForm from "@/components/stake/stakeForm/stakeForm";

// import UnstakeForm from "@/components/stake/unstakeForm/unstakeForm";
// import UnstakeFormProvider from "@/components/providers/unstakeFormProvider";

import ClaimFees from "@/components/stake/claimFees/claimFees";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { type SimulateContractReturnType, formatEther } from "viem";
import { api } from "@/trpc/react";

import { SirContract } from "@/contracts/sir";
import { useClaim } from "@/components/stake/hooks/useClaim";

type SimulateReq = SimulateContractReturnType["request"] | undefined;

const StakeTabs = () => {
  const { address, isConnected } = useAccount();

  const { data: balance } = api.user.getBalance.useQuery(
    {
      userAddress: address,
      tokenAddress: SirContract.address,
      spender: SirContract.address,
    },
    { enabled: isConnected },
  );

  const { data: ethBalance } = api.user.getEthBalance.useQuery(
    {
      userAddress: address,
    },
    {
      enabled: isConnected,
    },
  );

  return (
    <div>
      <br />
      <Container>
        <StakeFormProvider>
          <StakeForm
            balance={balance?.tokenBalance?.result}
            allowance={balance?.tokenAllowance?.result}
            ethBalance={ethBalance}
          ></StakeForm>
        </StakeFormProvider>
      </Container>
    </div>
  );
};

export default StakeTabs;
