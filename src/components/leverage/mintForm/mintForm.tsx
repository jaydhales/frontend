"use client";
import React from "react";
import { Card } from "../../ui/card";
import { Form, FormLabel } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { useMintFormProvider } from "@/components/providers/mintFormProvider";
import { api } from "@/trpc/react";
import { useAccount, useWriteContract } from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import useSetDepositToken from "./hooks/useSetDepositToken";
import { useMintOrBurn } from "@/components/shared/hooks/useMintOrBurn";
import { parseUnits } from "viem";
import { SubmitHandler } from "react-hook-form";
import { TMintFormFields, TVaults } from "@/lib/types";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { z } from "zod";
import DepositInputs from "./depositInputs";
import Estimations from "./estimations";
import TopSelects from "./topSelects";
export default function MintForm({ vaultsQuery }: { vaultsQuery: TVaults }) {
  const { form } = useMintFormProvider();
  const formData = form.watch();

  const { tokenDeposits } = useSetDepositToken({ formData, form });

  const { versus, leverageTiers, long } = useSelectMemo({
    formData,
    vaultsQuery,
  });
  const values = Object.values(tokenDeposits);
  const tokenDepositSelects = values.filter((e) => e?.value !== undefined) as {
    value: string;
    label: string;
  }[];

  const { address } = useAccount();

  const { openConnectModal } = useConnectModal();

  const userBalance = api.user.getBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(false) },
  );

  const { data: mintData } = useMintOrBurn({
    assetType: "ape",
    debtToken: formData.long,
    collateralToken: formData.versus,
    type: "mint",
    leverageTier: z.coerce.number().safeParse(formData.leverageTier).success
      ? parseInt(formData.leverageTier)
      : -1,
    amount: formData.deposit
      ? parseUnits(formData?.deposit.toString(), 18)
      : undefined,
  });

  const { writeContract } = useWriteContract();
  const onSubmit: SubmitHandler<TMintFormFields> = (data) => {
    if (
      userBalance?.data?.tokenBalance ??
      0n < parseUnits((data.deposit ?? 0).toString(), 18)
    ) {
      form.setError("root", { message: "Insufficient token balance." });
      return;
    }

    if (mintData) {
      writeContract(mintData.request);
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
                disabled={
                  !form.formState.isValid || !Boolean(mintData?.request)
                }
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
