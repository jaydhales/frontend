"use client";
import React from "react";
import Image from "next/image";
import { Card } from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { SelectItem } from "../../ui/select";
import { Input } from "../../ui/input";
import SearchSelect from "@/components/shared/Select";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/dropDown";
import { useMintFormProvider } from "@/components/providers/mintFormProvider";
import { api } from "@/trpc/react";
import { useAccount, useWriteContract } from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import useSetDepositToken from "./hooks/useSetDepositToken";
import { useMintOrBurn } from "@/components/shared/hooks/useMintOrBurn";
import { parseUnits } from "viem";
import { SubmitHandler } from "react-hook-form";
import { TMintFormFields } from "@/lib/types";
export default function MintForm() {
  const { form } = useMintFormProvider();
  const formData = form.watch();

  const { tokenDeposits } = useSetDepositToken({ formData, form });

  const { versus, leverageTiers, long } = useSelectMemo({ formData });
  const values = Object.values(tokenDeposits);
  const tokenDepositSelects = values.filter((e) => e?.value !== undefined) as {
    value: string;
    label: string;
  }[];
  const { address } = useAccount();
  const userBalance = api.user.getBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(false) },
  );
  const { data: mintData } = useMintOrBurn({
    assetType: "ape",
    debtToken: formData.long,
    collateralToken: formData.versus,
    type: "mint",
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
  console.log({ mintData });
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className=" grid grid-cols-3 gap-x-4">
            <SearchSelect
              name="long"
              title="Go long:"
              form={form}
              items={long.map((e) => ({
                label: e.debtTokenSymbol,
                value: e.debtToken + "," + e.debtTokenSymbol,
                imageUrl:
                  "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
              }))}
            />
            <SearchSelect
              name="versus"
              title="Versus:"
              form={form}
              items={versus.map((e) => ({
                label: e.collateralTokenSymbol,
                value: e.collateralToken + "," + e.collateralTokenSymbol,
                imageUrl:
                  "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
              }))}
            />
            <SearchSelect
              placeholder="Select Tier"
              items={leverageTiers.map((e) => ({
                label: e.toString(),
                value: e.toString(),
              }))}
              noSearch
              name="leverageTier"
              title="Leverage Tier:"
              form={form}
            />
          </div>
          <div>
            <FormLabel htmlFor="deposit">Deposit:</FormLabel>

            <div className="pt-1"></div>
            <div className="flex justify-between rounded-md bg-card-foreground p-3">
              <div>
                <FormField
                  control={form.control}
                  name="deposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="0" textSize="xl" {...field}></Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <h2 className="pt-1 text-sm text-[#B6B6C9]">$22.55</h2>
              </div>
              <div>
                <Dropdown
                  name="depositToken"
                  colorScheme={"dark"}
                  form={form}
                  className="w-[150px]"
                  disabled={tokenDepositSelects.length === 0}
                  title="Deposit Token:"
                >
                  {tokenDepositSelects.map((s) => (
                    <SelectItem key={s.value} value={s.value} className=" ">
                      <div className="flex items-center gap-x-2">
                        <Image
                          src="https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
                          alt=""
                          width={28}
                          height={28}
                        />
                        {s.label}
                      </div>
                    </SelectItem>
                  ))}
                </Dropdown>
                <h2 className="pt-1 text-right text-sm text-[#B6B6C9]">
                  Balance: $232.32
                </h2>
                <h2 className="text-right text-[#26DEC8]">25% 50% Max</h2>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-sm">You recieve:</h2>
            <div className="pt-1"></div>
            <div className="rounded-md bg-card-foreground p-3">
              <h2 className="text-xl">12 APE</h2>
              <h2 className=" text-sm italic text-gray">{"$20.55 (-X.XX%)"}</h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            {/* TODO */}
            {/* Dont set size w-[450px] on all elements. */}
            <p className="w-[450px]  pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
            <Button
              disabled={!form.formState.isValid && Boolean(mintData?.request)}
              variant={"submit"}
              type="submit"
            >
              Mint
            </Button>
            <div className="w-[450px]">
              <p className="text-left text-sm text-red-400">
                {form.formState.errors.root?.message}
              </p>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}

// <SelectItem value="mint">Mint</SelectItem>
