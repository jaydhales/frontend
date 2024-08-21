"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import type { SimulateContractReturnType } from "viem";
import { formatUnits } from "viem";
import { useFormContext } from "react-hook-form";
import type { TMintFormFields, TVaults } from "@/lib/types";
import DepositInputs from "./deposit-inputs";
import TopSelects from "./topSelects";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import { useQuoteMint } from "./hooks/useQuoteMint";
import useSetRootError from "./hooks/useSetRootError";
import MintFormLayout from "./mint-form-layout";
type TUserBalance =
  | {
      tokenBalance?: undefined;
      tokenAllowance?: undefined;
    }
  | {
      tokenBalance:
        | {
            error: Error;
            result?: undefined;
            status: "failure";
          }
        | {
            error?: undefined;
            result: bigint;
            status: "success";
          };
      tokenAllowance:
        | {
            error: Error;
            result?: undefined;
            status: "failure";
          }
        | {
            error?: undefined;
            result: bigint;
            status: "success";
          };
    }
  | undefined;

/**
 * Contains form actions and validity.
 */
export default function MintFormWrapper({
  vaultsQuery,
  mint,
  mintWithEth,
  approveFetching,
  approveSimulate,
  mintFetching,
  userBalance,
}: {
  vaultsQuery: TVaults;
  mint: SimulateContractReturnType["request"] | undefined;
  mintWithEth: SimulateContractReturnType["request"] | undefined;
  mintFetching: boolean;
  approveFetching: boolean;
  approveSimulate: SimulateContractReturnType["request"] | undefined;
  userBalance: TUserBalance;
}) {
  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();
  const [useEth, setUseEth] = useState(false);
  const utils = api.useUtils();

  const { versus, leverageTiers, long } = useSelectMemo({
    formData,
    vaultsQuery,
  });

  const { address } = useAccount();

  const { data: userEthBalance } = api.user.getEthBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  // Invalidate if approve or mint tx is successful.
  useEffect(() => {
    if (isConfirmed && !useEth) {
      utils.user.getBalance.invalidate().catch((e) => console.log(e));
    }
    if (isConfirmed && useEth) {
      utils.user.getEthBalance.invalidate().catch((e) => console.log(e));
    }
  }, [
    isConfirming,
    isConfirmed,
    utils.user.getBalance,
    utils.user.getEthBalance,
    useEth,
  ]);

  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    ethBalance: userEthBalance,
    useEth,
    deposit: formData.deposit ?? "0",
    depositToken: formData.depositToken,
    mintRequest: mint,
    mintWithETHRequest: mintWithEth,
    approveWriteRequest: approveSimulate,
    tokenBalance: userBalance?.tokenBalance?.result,
    tokenAllowance: userBalance?.tokenAllowance?.result,
    mintFetching,
    approveFetching,
  });

  const { quoteData } = useQuoteMint({ formData });
  useSetRootError({
    formData,
    setError: form.setError,
    errorMessage,
    rootErrorMessage: form.formState.errors.root?.message,
  });
  /**
   * SUBMIT
   */
  const onSubmit = () => {
    if (submitType === null) {
      return;
    }
    if (useEth && mintWithEth) {
      writeContract(mintWithEth);
      form.resetField("deposit");
      return;
    }
    // CHECK ALLOWANCE
    if (submitType === ESubmitType.mint && mint) {
      writeContract?.(mint);
      form.resetField("deposit");
      return;
    }
    if (submitType === ESubmitType.approve && approveSimulate) {
      writeContract(approveSimulate);
      form.resetField("deposit");
      return;
    }
  };

  return (
    <>
      <MintFormLayout
        isTxSuccess={isConfirmed}
        isTxPending={isConfirming}
        waitForSign={isPending}
        quoteData={quoteData}
        isValid={isValid}
        topSelects={
          <TopSelects
            form={form}
            versus={versus}
            leverageTiers={leverageTiers}
            long={long}
          />
        }
        depositInputs={
          <DepositInputs
            useEth={useEth}
            setUseEth={(b: boolean) => {
              setUseEth(b);
            }}
            balance={formatUnits(
              (useEth ? userEthBalance : userBalance?.tokenBalance?.result) ??
                0n,
              18,
            )}
            form={form}
            depositAsset={formData.long}
          />
        }
        submitType={submitType}
        onSubmit={onSubmit}
      />
    </>
  );
}
// <SelectItem value="mint">Mint</SelectItem>
