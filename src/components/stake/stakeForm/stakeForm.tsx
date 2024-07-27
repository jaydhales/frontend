"use client";

import { useMemo } from "react";

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

// import { useCheckStakeValid } from "@/components/stake/hooks/checkStakeValid";

interface Props {
  balance?: string;
}

const StakeForm = ({ balance }: Props) => {
  const form = useFormContext<TStakeFormFields>();
  const formData = form.watch();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const safeStake = useMemo(() => {
    return z.coerce.number().safeParse(formData.stake);
  }, [formData.stake]);

  const onSubmit = () => {
    console.log("form submitted");
    console.log(safeStake.data);
  };

  return (
    <Card className="mx-auto w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel htmlFor="stake">Stake:</FormLabel>
          <StakeInput form={form} balance={balance}></StakeInput>
          <div className=" flex-col flex items-center justify-center mt-[20px]">
            {address && (
              <Button
                variant={"submit"}
                type="submit"
                // disabled={!isValid}
              >
                {/* {submitType === ESubmitType.mint ? "Stake" : "Approve"} */}
                Stake
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
            <GasFeeEstimation></GasFeeEstimation>

            <div className="w-[450px]">
              <p className="h-[20px] text-left text-sm text-red-400">
                {address && <>{form.formState.errors.root?.message}</>}
              </p>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default StakeForm;
