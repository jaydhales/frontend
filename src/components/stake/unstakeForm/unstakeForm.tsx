"use client";

import { Card } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import UnstakeInput from "./unstakeInput";
import type { TUnstakeFormFields } from "@/lib/types";
import ClaimFeesCheckbox from "@/components/stake/unstakeForm/claimFeesCheck";
import GasFeeEstimation from "@/components/shared/gasFeeEstimation";
import { useMemo, useEffect } from "react";

import { type SimulateContractReturnType, parseUnits, formatUnits } from "viem";
import { z } from "zod";
import { useUnstake } from "../hooks/useUnstake";
import { useClaim } from "../hooks/useClaim";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import {
  ESubmitType,
  useCheckSubmitValid,
} from "@/components/shared/mintForm/hooks/useCheckSubmitValid";
import { SirContract } from "@/contracts/sir";

import useUnstakeError from "@/components/stake/hooks/useUnstakeError";

type SimulateReq = SimulateContractReturnType["request"] | undefined;
interface Props {
  balance?: bigint;
  dividends?: string;
}

const UnstakeForm = ({ balance, dividends }: Props) => {
  const form = useFormContext<TUnstakeFormFields>();
  const formData = form.watch();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const safeAmount = useMemo(() => {
    return z.coerce.number().safeParse(formData.amount);
  }, [formData.amount]);

  const {
    Unstake,
    isFetching: unstakeFetching,
    error: unstakeError,
  } = useUnstake({
    amount: safeAmount.success
      ? parseUnits(safeAmount.data.toString() ?? "0", 12)
      : undefined,
  });

  // useEffect(() => {
  //   console.log("UNSTAKE");
  //   console.log(Unstake, unstakeFetching, unstakeError);
  // }, [formData, Unstake, unstakeFetching, unstakeError]);

  const { Claim, isFetching: claimFetching, error: claimError } = useClaim();

  // useEffect(() => {
  //   console.log("Claim");
  //   console.log(Claim, claimFetching, claimError);
  //   console.log("Dividends to be claimed: ", Claim?.result);
  // }, [formData, Claim, claimFetching, claimError]);

  const { writeContract, error, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    deposit: safeAmount.success ? safeAmount.data.toString() : "0",
    depositToken: SirContract.address,
    mintRequest: Unstake?.request as SimulateReq,
    tokenBalance: balance,
    mintFetching: unstakeFetching,
  });

  useEffect(() => {
    console.log(isValid, errorMessage, submitType);
  }, [isValid, errorMessage, submitType, formData]);

  const onSubmit = () => {
    if (submitType === null) return;
    if (submitType === ESubmitType.mint && Unstake && Claim) {
      if (Boolean(Claim?.result)) {
        writeContract(Unstake?.request);
        writeContract(Claim?.request);
        return;
      } else {
        writeContract(Unstake?.request);

        return;
      }
    }
  };

  useUnstakeError({
    formData,
    setError: form.setError,
    errorMessage,
    rootErrorMessage: form.formState.errors.root?.message,
  });

  return (
    <Card className="mx-auto w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel htmlFor="stake">Amount:</FormLabel>
          <UnstakeInput
            form={form}
            balance={formatUnits(balance ?? 0n, 12)}
          ></UnstakeInput>
          <ClaimFeesCheckbox
            form={form}
            dividends={dividends}
            disabled={!Boolean(Claim?.result)}
          ></ClaimFeesCheckbox>

          <div className=" flex-col flex items-center justify-center mt-[20px]">
            {address && (
              <Button variant={"submit"} type="submit" disabled={!isValid}>
                Unstake
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
        </form>
      </Form>
    </Card>
  );
};

export default UnstakeForm;
