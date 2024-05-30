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
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { SubmitHandler } from "react-hook-form";
import { TAddressString, TMintFormFields, TVaults } from "@/lib/types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { z } from "zod";
import DepositInputs from "./depositInputs";
import Estimations from "./estimations";
import TopSelects from "./topSelects";
import { Assistant } from "@/contracts/assistant";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import { useMintApe } from "@/components/shared/hooks/useMintApe";
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
      spender: Assistant.address,
    },
    { enabled: Boolean(address) && Boolean(formData.depositToken) },
  );

  const debtToken = formData.long.split(",")[0] ?? "", //value formatted : address,symbol
    collateralToken = formData.versus.split(",")[0] ?? ""; //value formatted : address,symbol
  const safeLeverageTier = z.coerce.number().safeParse(formData.leverageTier);
  const leverageTier = safeLeverageTier.success ? safeLeverageTier.data : -1;

  const { data: mintData } = useMintApe({
    vaultId: vaultsQuery?.vaults.vaults.find((v) => {
      if (
        v.collateralToken === collateralToken &&
        v.debtToken === debtToken &&
        leverageTier === v.leverageTier
      ) {
        return true;
      } else {
        return false;
      }
    })?.vaultId,
    debtToken, //value formatted : address,symbol
    collateralToken, //value formatted : address,symbol
    leverageTier: leverageTier,
    amount: formData.deposit ? parseUnits(formData?.deposit, 18) : undefined,
  });

  const approveWrite = useSimulateContract({
    address: formData.depositToken as TAddressString,
    abi: erc20Abi,
    functionName: "approve",
    args: [
      Assistant.address,
      parseUnits(formData?.deposit?.toString() ?? "0", 18),
    ],
  });
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Invalidate if approve or mint tx is successful.
  useEffect(() => {
    if (isConfirmed) {
      utils.user.getBalance.invalidate();
    }
  }, [isConfirming, isConfirmed]);

  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    deposit: formData.deposit,
    depositToken: formData.depositToken,
    mintRequest: mintData?.request,
    approveWriteRequest: approveWrite.data?.request,
    tokenBalance: data?.tokenBalance?.result,
    tokenAllowance: data?.tokenAllowance?.result,
  });

  // ONLY SET ERROR IF ALL VALUES SET IN FORM
  useEffect(() => {
    if (
      errorMessage &&
      formData.deposit &&
      formData.depositToken &&
      formData.leverageTier &&
      formData.long &&
      formData.versus
    ) {
      form.setError("root", { message: errorMessage });
    } else if (form.formState.errors.root) {
      form.setError("root", { message: "" });
    }
  }, [
    errorMessage,
    formData.deposit,
    formData.depositToken,
    formData.leverageTier,
    formData.long,
    formData.versus,
  ]);
  /**
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
          <Estimations />
          <div className="flex flex-col items-center justify-center gap-y-2">
            {/* TODO */}
            {/* Dont set size w-[450px] on all elements. */}
            <p className="w-[450px]  pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
            {address && (
              <Button
                disabled={!form.formState.isValid || !isValid}
                variant={"submit"}
                type="submit"
              >
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

// <SelectItem value="mint">Mint</SelectItem>
