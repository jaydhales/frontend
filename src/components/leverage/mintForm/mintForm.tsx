"use client";
import React, { useEffect, useMemo } from "react";
import { Card } from "../../ui/card";
import { Form, FormLabel } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { useMintFormProvider } from "@/components/providers/mintFormProvider";
import { api } from "@/trpc/react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import useSetDepositToken from "./hooks/useSetDepositToken";
import type { SimulateContractReturnType } from "viem";
import { erc20Abi, formatUnits, maxInt256, parseUnits } from "viem";
import type { SubmitHandler } from "react-hook-form";
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
// TODO
// Retrieve token decimals
export default function MintForm({ vaultsQuery }: { vaultsQuery: TVaults }) {
  const { form } = useMintFormProvider();
  const formData = form.watch();

  const utils = api.useUtils();
  const { tokenDeposits } = useSetDepositToken({ formData, form });

  const { versus, leverageTiers, long } = useSelectMemo({
    formData,
    vaultsQuery,
  });

  const tokenDepositSelects = useMemo(() => {
    const values = Object.values(tokenDeposits);
    return values.filter((e) => e?.value !== undefined) as {
      value: string;
      label: string;
    }[];
  }, [tokenDeposits]);

  const { address } = useAccount();

  const { openConnectModal } = useConnectModal();

  const { data } = api.user.getBalance.useQuery(
    {
      userAddress: address,
      tokenAddress: formData.depositToken,
      spender: AssistantContract.address,
    },
    { enabled: Boolean(address) && Boolean(formData.depositToken) },
  );
  const safeLeverageTier = z.coerce.number().safeParse(formData.leverageTier);
  const leverageTier = safeLeverageTier.success ? safeLeverageTier.data : -1;
  const safeDeposit = useMemo(() => {
    return z.coerce.number().safeParse(formData.deposit);
  }, [formData.deposit]);
  /** ##MINT APE## */
  const { data: mintData, isFetching: mintFetching } = useMintApe({
    vaultId: findVault(vaultsQuery, formData),
    debtToken: formDataInput(formData.long), //value formatted : address,symbol
    collateralToken: formDataInput(formData.versus), //value formatted : address,symbol
    leverageTier: leverageTier,
    amount: safeDeposit.success
      ? parseUnits(safeDeposit.data.toString() ?? "0", 18)
      : undefined,
    tokenAllowance: data?.tokenAllowance?.result,
  });

  const approveWrite = useSimulateContract({
    address: formData.depositToken as TAddressString,
    abi: erc20Abi,
    functionName: "approve",
    args: [AssistantContract.address, maxInt256],
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  // Invalidate if approve or mint tx is successful.
  useEffect(() => {
    if (isConfirmed) {
      utils.user.getBalance.invalidate().catch((e) => console.log(e));
    }
  }, [isConfirming, isConfirmed, utils.user.getBalance]);

  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    deposit: safeDeposit.success ? safeDeposit.data.toString() : "0",
    depositToken: formData.depositToken,
    mintRequest: mintData?.request as
      | SimulateContractReturnType["request"]
      | undefined,
    approveWriteRequest: approveWrite.data?.request as
      | SimulateContractReturnType["request"]
      | undefined,
    tokenBalance: data?.tokenBalance?.result,
    tokenAllowance: data?.tokenAllowance?.result,
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
   *
   * SUBMIT
   */
  const onSubmit: SubmitHandler<TMintFormFields> = () => {
    if (submitType === null) {
      return;
    }

    // CHECK ALLOWANCE
    if (submitType === ESubmitType.mint && mintData?.request) {
      writeContract?.(mintData?.request);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              balance={formatUnits(data?.tokenBalance?.result ?? 0n, 18)}
              form={form}
              tokenDepositSelects={tokenDepositSelects}
            />
          </div>
          <Estimations
            disabled={!Boolean(quoteData)}
            ape={formatBigInt(quoteData, 4).toString()}
          />
          <div className="flex flex-col items-center justify-center gap-y-2">
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
function formDataInput(s: string) {
  return s.split(",")[0] ?? "";
}
// <SelectItem value="mint">Mint</SelectItem>
function findVault(vaultQuery: TVaults, formData: TMintFormFields) {
  const debtToken = formData.long.split(",")[0] ?? "", //value formatted : address,symbol
    collateralToken = formData.versus.split(",")[0] ?? ""; //value formatted : address,symbol
  const safeLeverageTier = z.coerce.number().safeParse(formData.leverageTier);
  const leverageTier = safeLeverageTier.success ? safeLeverageTier.data : -1;
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
