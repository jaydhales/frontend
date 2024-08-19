"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import { z } from "zod";
import DepositInputs from "./deposit-inputs";
import TopSelects from "./topSelects";
import { AssistantContract } from "@/contracts/assistant";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import ProgressAlert from "./progressAlert";
import { useQuoteMint } from "./hooks/useQuoteMint";
import useSetRootError from "./hooks/useSetRootError";
import { formatDataInput } from "@/lib/utils";
import MintFormLayout from "./mint-form-layout";

export default function MintFormDisplay({
  vaultsQuery,
  Mint,
  MintWithEth,
  approveFetching,
  approveSimulate,
  mintFetching,
}: {
  vaultsQuery: TVaults;
  Mint: SimulateContractReturnType["request"] | undefined;
  MintWithEth: SimulateContractReturnType["request"] | undefined;
  mintFetching: boolean;
  approveFetching: boolean;
  approveSimulate: SimulateContractReturnType["request"] | undefined;
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

  const { data: userBalance } = api.user.getBalance.useQuery(
    {
      userAddress: address,
      tokenAddress: formatDataInput(formData.long),
      spender: AssistantContract.address,
    },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );

  const { data: userEthBalance } = api.user.getEthBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );

  const safeDeposit = useMemo(() => {
    return z.coerce.number().safeParse(formData.deposit);
  }, [formData.deposit]);

  const { writeContract, error, data: hash, isPending } = useWriteContract();
  console.log(error, "WRITE ERROR");
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
    deposit: safeDeposit.success ? safeDeposit.data.toString() : "0",
    depositToken: formData.depositToken,
    mintRequest: Mint,
    mintWithETHRequest: MintWithEth,
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
    if (useEth && MintWithEth) {
      writeContract(MintWithEth);
      form.resetField("deposit");
      return;
    }
    // CHECK ALLOWANCE
    if (submitType === ESubmitType.mint && Mint) {
      writeContract?.(Mint);
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
      <ProgressAlert
        isTxSuccess={isConfirmed}
        isTxPending={isConfirming}
        waitForSign={isPending}
      />
      <MintFormLayout
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
