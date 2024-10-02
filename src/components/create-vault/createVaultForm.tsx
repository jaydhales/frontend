"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMemo } from "react";
import type { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CreateVaultInputValues } from "@/lib/schemas";
import type { TAddressString, TCreateVaultKeys } from "@/lib/types";
import { useCreateVault } from "./hooks/useCreateVault";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { getLogoAsset } from "@/lib/utils";
import ImageWithFallback from "../shared/ImageWithFallback";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioItem } from "./radioItem";
const tokens = [
  {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" as TAddressString,
    label: "USDC",
  },
  {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" as TAddressString,
    label: "WETH",
  },
  {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f" as TAddressString,
    label: "DAI",
  },
  {
    address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9" as TAddressString,
    label: "AVE",
  },
];
export default function CreateVaultForm() {
  const form = useForm<z.infer<typeof CreateVaultInputValues>>({
    resolver: zodResolver(CreateVaultInputValues),
    mode: "all",
    defaultValues: {
      leverageTier: "2",
      longToken: "",
      versusToken: "",
    },
  });

  const formData = form.watch();
  const { longToken, versusToken, leverageTier } = formData;
  const data = useCreateVault({ longToken, versusToken, leverageTier });
  const { writeContract, isPending, data: hash } = useWriteContract();
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data?.request);
    }
  };
  const setLeverageTier = useCallback(
    (value: string) => {
      form.setValue("leverageTier", value);
    },
    [form],
  );
  const isValid = useMemo(() => {
    if (data?.request) {
      return true;
    } else {
      return false;
    }
  }, [data?.request]);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid  gap-y-2">
          <div className="w-full space-y-2 ">
            <FormField
              control={form.control}
              name="leverageTier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leverage</FormLabel>{" "}
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-4 gap-4"
                  >
                    {["-4", "-3", "-2", "-1", "0", "1", "2"].map((e) => {
                      return (
                        <RadioItem
                          key={e}
                          setValue={setLeverageTier}
                          fieldValue={field.value}
                          value={e}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormItem>
              )}
            />

            {
              <p className="text-sm text-red-400">
                {form.formState.errors.leverageTier?.message}
              </p>
            }
          </div>
          <div className="w-full space-y-2">
            <TokenInput name="longToken" title="Long Token" />
            <p
              data-active={formData.longToken.length > 0 ? "true" : "false"}
              className="text-sm text-red-400 data-[active=false]:hidden"
            >
              {form.formState.errors.longToken?.message}
            </p>
            <QuickSelects name="longToken" tokens={tokens} />
          </div>

          <div className="w-full space-y-2">
            <TokenInput name="versusToken" title="Versus Token" />
            <p
              data-active={formData.versusToken.length > 0 ? "true" : "false"}
              className="text-sm text-red-400 data-[active=false]:hidden"
            >
              {form.formState.errors.versusToken?.message}
            </p>
            <QuickSelects name="versusToken" tokens={tokens} />
          </div>
        </div>
        <div className="flex justify-center">
          <Button disabled={!isValid} variant={"submit"} type="submit">
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
interface PropsQuick {
  tokens: { address: `0x${string}`; label: string }[];
  name: "versusToken" | "longToken";
}

function QuickSelects({ tokens, name }: PropsQuick) {
  const form = useFormContext();
  return (
    <div className="flex flex-wrap items-center gap-x-2">
      <h2 className="pr-2 text-[12px]">Quick Selects:</h2>
      {tokens.map((e) => {
        return (
          <div
            key={e.address}
            className="flex cursor-pointer items-center gap-x-2 rounded-full bg-background px-2 py-1 hover:bg-background/60"
            onClick={() => {
              form.setValue(name, e.address);
            }}
          >
            <h2 className="text-[12px]">{e.label}</h2>
            <ImageWithFallback
              width={20}
              height={20}
              className="h-6 w-6"
              src={getLogoAsset(e.address)}
              alt={"Token " + e.label}
            />
          </div>
        );
      })}
    </div>
  );
}

function TokenInput({
  title,
  name,
}: {
  title: string;
  name: TCreateVaultKeys;
}) {
  const form = useFormContext();
  return (
    <>
      <FormLabel htmlFor="longToken">{title}</FormLabel>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="0x"
                autoComplete="off"
                className="w-full rounded-md px-2"
                background="primary"
                minLength={1}
                textSize="sm"
                step="any"
                {...field}
              ></Input>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
