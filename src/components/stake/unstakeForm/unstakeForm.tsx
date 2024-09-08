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
  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  //   useWaitForTransactionReceipt({ hash });

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

  return (
    <>
      {/* <ProgressAlert */}
      {/*   isTxSuccess={isConfirmed} */}
      {/*   isTxPending={isConfirming} */}
      {/*   waitForSign={isPending} */}
      {/* /> */}
      <Card className="w-full ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <Button variant={"submit"} type="submit" disabled={!isValid}>
                  {form.formState.errors.root?.message
                    ? form.formState.errors.root?.message.toString()
                    : "Unstake"}
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
          </form>
        </Form>
      </Card>
    </>
  );
};

export default UnstakeForm;
