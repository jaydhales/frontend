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
import { useMintOrBurn } from "@/components/shared/hooks/useMintOrBurn";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { SubmitHandler } from "react-hook-form";
import { TAddressString, TMintFormFields, TVaults } from "@/lib/types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { z } from "zod";
import DepositInputs from "./depositInputs";
import Estimations from "./estimations";
import TopSelects from "./topSelects";
import { Assistant } from "@/contracts/assistant";
import { useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
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

  const { data: mintData } = useMintOrBurn({
    assetType: "ape",
    debtToken: formData.long.split(",")[0] ?? "", //value formatted : address,symbol
    collateralToken: formData.versus.split(",")[0] ?? "", //value formatted : address,symbol
    type: "mint",
    leverageTier: z.coerce.number().safeParse(formData.leverageTier).success
      ? parseInt(formData.leverageTier)
      : -1,
    amount: formData.deposit
      ? parseUnits(formData?.deposit.toString(), 18)
      : undefined,
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

  const { isValid } = useCheckSubmitValid({
    deposit: formData.deposit,
    depositToken: formData.depositToken,
    mintRequest: mintData?.request,
    approveWriteRequest: approveWrite.data?.request,
    tokenBalance: data?.tokenBalance?.result,
    tokenAllowance: data?.tokenAllowance?.result,
  });
  /**
   * SUBMIT
   */
  const onSubmit: SubmitHandler<TMintFormFields> = (formData) => {
    // if (
    //   data?.tokenBalance?.result ??
    //   0n < parseUnits((formData.deposit ?? 0).toString(), 18)
    // ) {
    //   form.setError("root", { message: "Insufficient token balance." });
    //   return;
    // }
    console.clear();
    if (
      parseUnits(formData?.deposit?.toString() ?? "0", 18) >
      (data?.tokenAllowance?.result ?? 0n)
    ) {
      if (approveWrite.data?.request) {
        writeContract(approveWrite.data?.request);

        utils.user.invalidate();
      } else {
        form.setError("root", {
          message: "Error occured attempting to approve tokens.",
        });
        return;
      }
    } else {
      if (mintData) {
        writeContract(mintData.request);
      }
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
                Mint
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
              <p className="text-left text-sm text-red-400">
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
