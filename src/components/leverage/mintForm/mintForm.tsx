"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../ui/card";
import { Form, FormLabel } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { useSelectMemo } from "./hooks/useSelectMemo";

import type { SimulateContractReturnType } from "viem";
import { erc20Abi, formatUnits, maxInt256, parseUnits } from "viem";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { TAddressString, TMintFormFields, TVaults } from "@/lib/types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { z } from "zod";
import DepositInputs from "./depositInputs";
import Estimations from "./estimations";
import TopSelects from "./topSelects";
import { AssistantContract } from "@/contracts/assistant";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import { useMintApe } from "@/components/shared/hooks/useMintApe";
import ProgressAlert from "./progressAlert";

import { useQuoteMint } from "./hooks/useQuoteMint";
import useSetRootError from "./hooks/useSetRootError";
import { formatBigInt } from "@/lib/utils";

export default function MintForm({ vaultsQuery }: { vaultsQuery: TVaults }) {
  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();
  const [useEth, setUseEth] = useState(false);

  const utils = api.useUtils();

  const { versus, leverageTiers, long } = useSelectMemo({
    formData,
    vaultsQuery,
  });

  const { address } = useAccount();

  const { openConnectModal } = useConnectModal();

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

  const safeLeverageTier = z.coerce.number().safeParse(formData.leverageTier);
  const leverageTier = safeLeverageTier.success ? safeLeverageTier.data : -1;
  const safeDeposit = useMemo(() => {
    return z.coerce.number().safeParse(formData.deposit);
  }, [formData.deposit]);

  /** ##MINT APE## */
  const {
    Mint,
    MintWithEth,
    isFetching: mintFetching,
  } = useMintApe({
    vaultId: findVault(vaultsQuery, formData),
    debtToken: formatDataInput(formData.versus), //value formatted : address,symbol
    collateralToken: formatDataInput(formData.long), //value formatted : address,symbol
    leverageTier: leverageTier,
    amount: safeDeposit.success
      ? parseUnits(safeDeposit.data.toString() ?? "0", 18)
      : undefined,
    tokenAllowance: userBalance?.tokenAllowance?.result,
  });

  const approveWrite = useSimulateContract({
    address: formatDataInput(formData.long) as TAddressString,
    abi: erc20Abi,
    functionName: "approve",
    args: [
      AssistantContract.address,
      parseUnits(formatUnits(maxInt256, 18), 0),
    ],
  });

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
    deposit: safeDeposit.success ? safeDeposit.data.toString() : "0",
    depositToken: formData.depositToken,
    mintRequest: Mint?.request as
      | SimulateContractReturnType["request"]
      | undefined,
    mintWithETHRequest: MintWithEth?.request as
      | SimulateContractReturnType["request"]
      | undefined,
    approveWriteRequest: approveWrite.data?.request as
      | SimulateContractReturnType["request"]
      | undefined,
    tokenBalance: userBalance?.tokenBalance?.result,
    tokenAllowance: userBalance?.tokenAllowance?.result,
    mintFetching,
    approveFetching: approveWrite.isFetching,
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
  const onSubmit: SubmitHandler<TMintFormFields> = () => {
    if (submitType === null) {
      return;
    }
    if (useEth && MintWithEth?.request) {
      writeContract(MintWithEth?.request);
      return;
    }
    // CHECK ALLOWANCE
    if (submitType === ESubmitType.mint && Mint?.request) {
      writeContract?.(Mint?.request);
      return;
    }
    if (submitType === ESubmitType.approve && approveWrite.data?.request) {
      writeContract(approveWrite.data?.request);
      return;
    }
  };

  return (
    <Card>
      <ProgressAlert
        isTxSuccess={isConfirmed}
        isTxPending={isConfirming}
        waitForSign={isPending}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 ">
          <TopSelects
            form={form}
            versus={versus}
            leverageTiers={leverageTiers}
            long={long}
          />
          <div>
            <FormLabel htmlFor="deposit">Deposit:</FormLabel>
            <div className="pt-1"></div>
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
          </div>

          <Estimations
            disabled={!Boolean(quoteData)}
            ape={formatBigInt(quoteData, 4).toString()}
          />
          <div className=" flex-col flex items-center justify-center gap-y-2">
            {/* TODO */}
            {/* Dont set size w-[450px] on all elements. */}
            <p className="w-[450px] pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
            {address && (
              <Button disabled={!isValid} variant={"submit"} type="submit">
                {submitType === ESubmitType.mint ? "Mint" : "Approve"}
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

            <div className="w-[450px]">
              <p className="h-[20px] text-left text-sm text-red-400">
                {/* Don't show form errors if users is not connected. */}
                {address && <>{form.formState.errors.root?.message}</>}
              </p>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
function formatDataInput(s: string) {
  return s.split(",")[0] ?? "";
}
// <SelectItem value="mint">Mint</SelectItem>
function findVault(vaultQuery: TVaults, formData: TMintFormFields) {
  const debtToken = formData.versus.split(",")[0] ?? "", //value formatted : address,symbol
    collateralToken = formData.long.split(",")[0] ?? ""; //value formatted : address,symbol
  const safeLeverageTier = z.coerce.number().safeParse(formData.leverageTier);
  const leverageTier = safeLeverageTier.success ? safeLeverageTier.data : -1;
  console.log({ vaultQuery, debtToken, collateralToken });

  return vaultQuery?.vaults.vaults.find((v) => {
    if (
      v.collateralToken === collateralToken &&
      v.debtToken === debtToken &&
      leverageTier === v.leverageTier
    ) {
      return true;
    } else {
      return false;
    }
  })?.vaultId;
}
