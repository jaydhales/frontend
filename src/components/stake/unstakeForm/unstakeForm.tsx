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
import { useMemo, useEffect, useState } from "react";
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
  claimResult: bigint | undefined;
}

const UnstakeForm = ({
  balance,
  dividends,
  claimResult,
}: Props): JSX.Element => {
  const utils = api.useUtils();
  const form = useFormContext<TUnstakeFormFields>();
  const formData = form.watch();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [claimFees, setClaimFees] = useState(false);

  useEffect(() => {
    console.log(`CLAIM FEES: ${claimFees}`);
  }, [claimFees]);

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

  useEffect(() => {
    if (isConfirmed) {
      utils.user.getBalance.invalidate().catch((e) => console.log(e));
      utils.user.getDividends.invalidate().catch((e) => console.log(e));
      utils.user.getSirTotalSupply.invalidate().catch((e) => console.log(e));
      utils.user.getSirSupply.invalidate().catch((e) => console.log(e));
    }
  }, [
    isConfirming,
    isConfirmed,
    utils.user.getBalance,
    utils.user.getDividends,
    utils.user.getSirTotalSupply,
    utils.user.getSirSupply,
  ]);

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

  const onSubmit = () => {
    if (Unstake && UnstakeAndClaim) {
      if (Boolean(claimResult) && claimFees) {
        writeContract(UnstakeAndClaim?.request);
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
            ></ClaimFeesCheckbox>

          <div className="flex-col flex items-center justify-center mt-[20px]">
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
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default UnstakeForm;
