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

const UnstakeForm = () => {
  const form = useFormContext<TUnstakeFormFields>();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const onSubmit = () => {
    console.log("form submitted");
  };

  return (
    <Card className="mx-auto w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLabel htmlFor="stake">Amount:</FormLabel>
          <UnstakeInput form={form} balance="68.86"></UnstakeInput>
          <ClaimFeesCheckbox form={form}></ClaimFeesCheckbox>

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

export default UnstakeForm;
