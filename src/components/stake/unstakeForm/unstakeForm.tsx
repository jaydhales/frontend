"use client";

import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useFormContext } from "react-hook-form";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import UnstakeInput from "./unstakeInput";
import type { TUnstakeFormFields } from "@/lib/types";
import ClaimFeesCheckbox from "@/components/stake/unstakeForm/claimFeesCheck";
// import GasFeeEstimation from "@/components/shared/gasFeeEstimation";
// import { useEffect } from "react";
import { useMemo, useState } from "react";

import { type SimulateContractReturnType, parseUnits, formatUnits } from "viem";
import { z } from "zod";
import { useUnstake } from "../hooks/useUnstake";

import { useWriteContract } from "wagmi";
import { SirContract } from "@/contracts/sir";

import useUnstakeError from "@/components/stake/hooks/useUnstakeError";
import { useCheckSubmitValid } from "@/components/leverage-liquidity/mintForm/hooks/useCheckSubmitValid";
import TransactionModal from "@/components/shared/transactionModal";
import { TransactionStatus } from "@/components/leverage-liquidity/mintForm/transactionStatus";

type SimulateReq = SimulateContractReturnType["request"] | undefined;
interface Props {
  balance?: bigint;
  dividends?: string;
  claimSimulate: SimulateReq;
  claimResult: bigint | undefined;
  claimFetching: boolean;
}

const UnstakeForm = ({
  balance,
  dividends,
  claimSimulate,
  claimResult,
  claimFetching,
}: Props) => {
  const form = useFormContext<TUnstakeFormFields>();
  const formData = form.watch();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const safeAmount = useMemo(() => {
    return z.coerce.number().safeParse(formData.amount);
  }, [formData.amount]);

  const { Unstake, isFetching: unstakeFetching } = useUnstake({
    amount: safeAmount.success
      ? parseUnits(safeAmount.data.toString() ?? "0", 12)
      : undefined,
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const { isValid, errorMessage } = useCheckSubmitValid({
    deposit: safeAmount.success ? safeAmount.data.toString() : "0",
    depositToken: SirContract.address,
    requests: {
      mintRequest: Unstake?.request as SimulateReq,
      approveWriteRequest: claimSimulate,
    },
    tokenBalance: balance,
    mintFetching: unstakeFetching,
    approveFetching: claimFetching,
  });

  const [claimFees, setClaimFees] = useState(false);
  const onSubmit = () => {
    if (Unstake && claimSimulate) {
      if (Boolean(claimResult) && claimFees) {
        writeContract(Unstake?.request);
        writeContract(claimSimulate);
        return;
      } else {
        console.log("here");
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
  const [open, setOpen] = useState(false);
  let submitButtonText = "Confirm Unstake";
  if (isPending || isConfirming) {
    submitButtonText = "Pending...";
  }
  if (isConfirmed) {
    submitButtonText = "Close";
  }
  return (
    <>
      <Card className="w-full ">
        <TransactionModal.Root setOpen={setOpen} open={open}>
          <TransactionModal.InfoContainer>
            <TransactionStatus
              waitForSign={isPending}
              isTxPending={isConfirming}
            />
          </TransactionModal.InfoContainer>
          <TransactionModal.StatSubmitContainer>
            <TransactionModal.SubmitButton
              onClick={() => {
                onSubmit();
              }}
              loading={isPending || isConfirming}
              disabled={isValid}
            >
              {submitButtonText}
            </TransactionModal.SubmitButton>
          </TransactionModal.StatSubmitContainer>
        </TransactionModal.Root>

        <Form {...form}>
          <form>
            <UnstakeInput
              form={form}
              balance={formatUnits(balance ?? 0n, 12)}
            ></UnstakeInput>
            <ClaimFeesCheckbox
              form={form}
              dividends={dividends}
              disabled={!Boolean(claimResult)}
              onChange={setClaimFees}
            ></ClaimFeesCheckbox>

            <div className=" flex-col flex items-center justify-center mt-[20px]">
              {address && (
                <Button
                  variant={"submit"}
                  onClick={() => {
                    if (isValid) {
                      setOpen(true);
                    }
                  }}
                  type="submit"
                  disabled={!isValid}
                >
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
    </>
  );
};

export default UnstakeForm;
