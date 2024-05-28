"use client";
import React, { useMemo } from "react";
import { Card } from "../../ui/card";
import { Form, FormLabel } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { useMintFormProvider } from "@/components/providers/mintFormProvider";
import { api } from "@/trpc/react";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
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
// TODO
// Retrieve token decimals
export default function MintForm({ vaultsQuery }: { vaultsQuery: TVaults }) {
  const { form } = useMintFormProvider();
  const formData = form.watch();

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
  console.log({
    userAddress: address,
    tokenAddress: formData.depositToken,
    spender: Assistant.address,
  });
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
    debtToken: formData.long.split(",")[0] ?? "",
    collateralToken: formData.versus.split(",")[0] ?? "",
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
  const { writeContract } = useWriteContract();
  /**
   * SUBMIT
   */
  const onSubmit: SubmitHandler<TMintFormFields> = (formData) => {
    if (
      data?.tokenBalance?.result ??
      0n < parseUnits((formData.deposit ?? 0).toString(), 18)
    ) {
      form.setError("root", { message: "Insufficient token balance." });
      return;
    }

    if (
      parseUnits(formData?.deposit?.toString() ?? "0", 18) <
      (data?.tokenAllowance?.result ?? 0n)
    ) {
      if (approveWrite.data?.request) writeContract(approveWrite.data?.request);
      else {
        form.setError("root", {
          message: "Error occured attempting to approve tokens.",
        });
        return;
      }
    }

    if (mintData) {
      writeContract(mintData.request);
    }
  };
  const isValid = useMemo(() => {
    if (
      data?.tokenBalance?.result ??
      0n < parseUnits((formData.deposit ?? 0).toString(), 18)
    ) {
      return false;
    }
    if (
      parseUnits(formData?.deposit?.toString() ?? "0", 18) <
      (data?.tokenAllowance?.result ?? 0n)
    ) {
      if (approveWrite.data?.request) return true;
      else return false;
    } else {
      if (mintData?.request) return true;
      else return false;
    }
  }, [formData.deposit?.toString()]);
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
