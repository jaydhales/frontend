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

  const { data: totalBalance } = api.user.getTotalSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected },
  );

  const { data: dividends } = api.user.getDividends.useQuery(
    {
      staker: address,
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

  const safeTotalBalance = useMemo(() => {
    return z.coerce.bigint().default(0n).safeParse(totalBalance);
  }, [totalBalance]);
  console.log(safeTotalBalance, "safe total balance");
  const safeDividends = useMemo(() => {
    return z.coerce.bigint().default(0n).safeParse(dividends);
  }, [dividends]);

  useEffect(() => {
    console.log("---TABS---");
    console.log(`Unstaked SIR: ${balance?.tokenBalance?.result}`);
    console.log(`Unstaked SIR Allowance: ${balance?.tokenAllowance?.result}`);
    console.log(
      `Staked SIR: ${balance?.tokenBalance?.result && safeTotalBalance.success && safeTotalBalance.data - balance?.tokenBalance?.result}`,
    );
    console.log(`Dividends: ${safeDividends.data}`);
    console.log(
      `ETH Balance: ${parseFloat(formatEther(ethBalance ?? 0n)).toFixed(4)}`,
    );
  }, [balance, safeTotalBalance, safeDividends, ethBalance]);

  const { Claim, isFetching: claimFetching } = useClaim();

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
              balance={balance?.tokenBalance?.result}
              allowance={balance?.tokenAllowance?.result}
              ethBalance={ethBalance}
            ></StakeForm>
          </StakeFormProvider>
        </Container>
      </TabsContent>
      <TabsContent value="unstake">
        <Container>
          <UnstakeFormProvider>
            <UnstakeForm
              balance={
                safeTotalBalance.success && balance?.tokenBalance?.result
                  ? safeTotalBalance.data - balance?.tokenBalance?.result
                  : 0n
              }
              dividends={formatEther(
                safeDividends.success ? safeDividends.data : 0n,
              )}
              claimSimulate={Claim?.request as SimulateReq}
              claimResult={Claim?.result}
              claimFetching={claimFetching}
            ></UnstakeForm>
          </UnstakeFormProvider>
        </Container>
      </TabsContent>
      <TabsContent value="claimFees">
        <Container>
          <ClaimFees
            ethBalance={formatEther(ethBalance ?? 0n)}
            claimAmount={formatEther(
              safeDividends.success ? safeDividends.data : 0n,
            )}
            claimSimulate={Claim?.request as SimulateReq}
            claimResult={Claim?.result}
            claimFetching={claimFetching}
          ></ClaimFees>
        </Container>
      </TabsContent>
    </Tabs>
  );
};

export default StakeTabs;
