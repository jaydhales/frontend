"use client";

// import { useEffect } from "react";
import { useMemo } from "react";

import { Card } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

// import GasFeeEstimation from "@/components/shared/gasFeeEstimation";
import StakeInput from "@/components/stake/stakeForm/stakeInput";
import type { TStakeFormFields } from "@/lib/types";

import { z } from "zod";
import { type SimulateContractReturnType, parseUnits, formatUnits } from "viem";

import { useStake } from "@/components/stake/hooks/useStake";
import { SirContract } from "@/contracts/sir";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import useStakeError from "@/components/stake/hooks/useStakeError";
import { useApprove } from "@/components/leverage-liquidity/mintForm/hooks/useApprove";
import { useCheckSubmitValid } from "@/components/leverage-liquidity/mintForm/hooks/useCheckSubmitValid";

type SimulateReq = SimulateContractReturnType["request"] | undefined;
interface Props {
  balance?: bigint;
  allowance?: bigint;
  ethBalance?: bigint;
}

const StakeForm = ({ balance, allowance }: Props) => {
  const form = useFormContext<TStakeFormFields>();
  const formData = form.watch();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const safeStake = useMemo(() => {
    return z.coerce.number().safeParse(formData.stake);
  }, [formData.stake]);

  const { Stake, isFetching } = useStake({
    amount: safeStake.success
      ? parseUnits(safeStake.data.toString() ?? "0", 12)
      : undefined,
  });

  const { approveSimulate } = useApprove({
    tokenAddr: SirContract.address,
    approveContract: SirContract.address,
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const { isValid, errorMessage } = useCheckSubmitValid({
    deposit: safeStake.success ? safeStake.data.toString() : "0",
    depositToken: SirContract.address,
    mintRequest: Stake?.request as SimulateReq,
    approveWriteRequest: approveSimulate?.data?.request as SimulateReq,
    tokenAllowance: allowance,
    tokenBalance: balance,
    mintFetching: isFetching,
    approveFetching: approveSimulate.isFetching,
  });

  const onSubmit = () => {
    if (Stake) {
      writeContract(Stake?.request);
      return;
    }
  };

  useStakeError({
    formData,
    setError: form.setError,
    errorMessage,
    rootErrorMessage: form.formState.errors.root?.message,
  });

  return (
    <>
      <Card className="mx-auto w-[80%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormLabel htmlFor="stake">Stake:</FormLabel>
            <StakeInput
              form={form}
              balance={formatUnits(balance ?? 0n, 12)}
            ></StakeInput>

            <div className=" flex-col flex items-center justify-center pt-[20px]">
              {address && (
                <Button variant={"submit"} type="submit" disabled={!isValid}>
                  {form.formState.errors.root?.message
                    ? form.formState.errors.root?.message.toString()
                    : "Stake"}
                </Button>
              )}
              {!address && (
                <Button
                  onClick={() => openConnectModal?.()}
                  variant="submit"
                  type="button"
                >
                  Connect Wallet
                </Button>
              )}
              {/* {form.formState.errors.root?.message && (
              <div className="w-[450px] pt-[20px] flex justify-center items-center">
                <p className="h-[20px] text-center text-sm text-red-400">
                  {address && <>{form.formState.errors.root?.message}</>}
                </p>
              </div>
            )} */}
            </div>

            {/* <GasFeeEstimation></GasFeeEstimation>*/}
          </form>
        </Form>
      </Card>
    </>
  );
};

export default StakeForm;
