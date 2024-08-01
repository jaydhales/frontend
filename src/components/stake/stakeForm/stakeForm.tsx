"use client";

import { useEffect, useMemo } from "react";

import { Card } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import GasFeeEstimation from "@/components/shared/gasFeeEstimation";
import StakeInput from "@/components/stake/stakeForm/stakeInput";
import type { TStakeFormFields } from "@/lib/types";

import { z } from "zod";
import { type SimulateContractReturnType, parseUnits, formatUnits } from "viem";

import { useStake } from "@/components/stake/hooks/useStake";
import { useApprove } from "@/components/shared/mintForm/hooks/useApprove";
import { SirContract } from "@/contracts/sir";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  ESubmitType,
  useCheckSubmitValid,
} from "@/components/shared/mintForm/hooks/useCheckSubmitValid";

import useStakeError from "@/components/stake/hooks/useStakeError";

type SimulateReq = SimulateContractReturnType["request"] | undefined;
interface Props {
  balance?: bigint;
  allowance?: bigint;
  ethBalance?: bigint;
}

const StakeForm = ({ balance, allowance, ethBalance }: Props) => {
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

  // useEffect(() => {
  //   console.log("STAKE:")
  //   console.log(Stake, isFetching);
  //   console.log("APPROVE:")
  //   console.log(approveSimulate)
  // }, [Stake, isFetching, approveSimulate]);

  const { writeContract, error, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    deposit: safeStake.success ? safeStake.data.toString() : "0",
    depositToken: SirContract.address,
    mintRequest: Stake?.request as SimulateReq,
    approveWriteRequest: approveSimulate?.data?.request as SimulateReq,
    tokenAllowance: allowance,
    tokenBalance: balance,
    mintFetching: isFetching,
    approveFetching: approveSimulate.isFetching,
  });

  // useEffect(() => {
  //   console.log(isValid, errorMessage, submitType);
  // }, [isValid, errorMessage, submitType, formData]);

  const onSubmit = () => {
    if (submitType === null) return;
    if (submitType === ESubmitType.mint && Stake) {
      writeContract(Stake?.request);
      return;
    }
    if (submitType === ESubmitType.approve && approveSimulate?.data?.request) {
      writeContract(approveSimulate?.data?.request);
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
                {submitType === ESubmitType.mint ? "Stake" : "Approve"}
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
            {form.formState.errors.root?.message && (
              <div className="w-[450px] pt-[20px] flex justify-center items-center">
                <p className="h-[20px] text-center text-sm text-red-400">
                  {address && <>{form.formState.errors.root?.message}</>}
                </p>
              </div>
            )}
          </div>

          {/* <GasFeeEstimation></GasFeeEstimation>s */}
        </form>
      </Form>
    </Card>
  );
};

export default StakeForm;
