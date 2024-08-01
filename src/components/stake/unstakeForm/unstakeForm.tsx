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

import { parseUnits } from "viem";
import { z } from "zod";
import { useUnstake } from "../hooks/useUnstake";
import { useClaim } from "../hooks/useClaim";

interface Props {
  balance?: string;
  dividends?: string;
}

const UnstakeForm = ({ balance, dividends }: Props) => {
  const form = useFormContext<TUnstakeFormFields>();
  const formData = form.watch();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const onSubmit = () => {
    console.log("form submitted");
    console.log(formData.amount);
    console.log(formData.claimFees);
  };

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

  useEffect(() => {
    console.log("UNSTAKE");
    console.log(Unstake, unstakeFetching, unstakeError);
  }, [formData, Unstake, unstakeFetching, unstakeError]);

  const { Claim, isFetching: claimFetching, error: claimError } = useClaim();

  useEffect(() => {
    console.log("Claim");
    console.log(Claim, claimFetching, claimError);
    console.log("Dividends to be claimed: ", !!Claim?.result);
  }, [formData, Claim, claimFetching, claimError]);

  return (
    <Card className="mx-auto w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel htmlFor="stake">Amount:</FormLabel>
          <UnstakeInput form={form} balance={balance}></UnstakeInput>
          <ClaimFeesCheckbox
            form={form}
            dividends={dividends}
            disabled={!Boolean(Claim?.result)}
          ></ClaimFeesCheckbox>

          <div className=" flex-col flex items-center justify-center mt-[20px]">
            {address && (
              <Button
                variant={"submit"}
                type="submit"
                // disabled={!isValid}
              >
                {/* {submitType === ESubmitType.mint ? "Stake" : "Approve"} */}
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
