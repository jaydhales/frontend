"use client";

import { useMemo } from "react";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";

import StakeFormProvider from "@/components/providers/stakeFormProvider";
import StakeForm from "@/components/stake/stakeForm/stakeForm";

import UnstakeForm from "@/components/stake/unstakeForm/unstakeForm";
import UnstakeFormProvider from "@/components/providers/unstakeFormProvider";

import ClaimFees from "@/components/stake/claimFees/claimFees";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { formatUnits, formatEther } from "viem";
import { api } from "@/trpc/react";

const StakeTabs = () => {
  const { address, isConnected } = useAccount();

  const { data: userBalance } = api.user.getUnstakedSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected }
  );

  const { data: totalBalance } = api.user.getTotalSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected }
  );

  const { data: dividends } = api.user.getDividends.useQuery(
    {
      staker: address,
    },
    { enabled: isConnected }
  );

  const safeUnstakedBalance = useMemo(() => {
    return z.coerce.bigint().default(0n).safeParse(userBalance);
  }, [userBalance]);

  const safeTotalBalance = useMemo(() => {
    return z.coerce.bigint().default(0n).safeParse(totalBalance);
  }, [totalBalance]);

  const safeDividends = useMemo(() => {
    return z.coerce.bigint().default(0n).safeParse(dividends);
  }, [dividends]);

  useEffect(() => {
    console.log("Debug: ");
    console.log(`Unstaked SIR: ${safeUnstakedBalance.data}`);
    console.log(
      `Staked SIR: ${safeUnstakedBalance.success && safeTotalBalance.success && safeTotalBalance.data - safeUnstakedBalance.data}`
    );
    console.log(`Dividends: ${safeDividends.data}`);
  }, [safeTotalBalance, safeUnstakedBalance, safeDividends]);

  return (
    <Tabs defaultValue="stake">
      <div className="flex justify-center">
        <TabsList defaultValue={"stake"}>
          <TabsTrigger value={"stake"}>Stake</TabsTrigger>
          <TabsTrigger value={"unstake"}>Unstake</TabsTrigger>
          <TabsTrigger value={"claimFees"}>Claim fees</TabsTrigger>
        </TabsList>
      </div>
      <br />
      <TabsContent value="stake">
        <Container>
          <StakeFormProvider>
            <StakeForm
              balance={formatUnits(
                safeUnstakedBalance.success ? safeUnstakedBalance.data : 0n,
                18
              )}
            ></StakeForm>
          </StakeFormProvider>
        </Container>
      </TabsContent>
      <TabsContent value="unstake">
        <Container>
          <UnstakeFormProvider>
            <UnstakeForm
              balance={formatUnits(
                safeTotalBalance.success && safeUnstakedBalance.success
                  ? safeTotalBalance.data - safeUnstakedBalance.data
                  : 0n,
                18
              )}
              dividends={formatEther(
                safeDividends.success ? safeDividends.data : 0n
              )}
            ></UnstakeForm>
            ;
          </UnstakeFormProvider>
        </Container>
      </TabsContent>
      <TabsContent value="claimFees">
        <Container>
          <ClaimFees balance={"111.1"}></ClaimFees>
        </Container>
      </TabsContent>
    </Tabs>
  );
};

export default StakeTabs;
