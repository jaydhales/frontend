"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CreateVaultInputValues } from "@/lib/schemas";
import type { TCreateVaultKeys } from "@/lib/types";
import { useCreateVault } from "./hooks/useCreateVault";
import { useWriteContract } from "wagmi";
export default function CreateVaultForm() {
  const form = useForm<z.infer<typeof CreateVaultInputValues>>({
    resolver: zodResolver(CreateVaultInputValues),
    mode: "onChange",
    defaultValues: {
      leverageTier: "",
      longToken: "",
      versusToken: "",
    },
  });
  const formData = form.watch();
  const { longToken, versusToken, leverageTier } = formData;
  const data = useCreateVault({ longToken, versusToken, leverageTier });
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (form.formState.isValid && data?.request) {
      writeContract(data?.request);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid  gap-y-2">
          <div className="w-full space-y-2">
            <TokenInput name="longToken" title="Long Token" />
            <p
              data-active={formData.longToken.length > 0 ? "true" : "false"}
              className="text-red-400 text-sm data-[active=false]:hidden"
            >
              {form.formState.errors.longToken?.message}
            </p>
          </div>

          <div className="w-full space-y-2">
            <TokenInput name="versusToken" title="Versus Token" />
            <p
              data-active={formData.versusToken.length > 0 ? "true" : "false"}
              className="text-red-400 text-sm data-[active=false]:hidden"
            >
              {form.formState.errors.versusToken?.message}
            </p>
          </div>

          <div className="w-full space-y-2">
            <FormLabel htmlFor="leverageTier">Leverage Tier</FormLabel>
            <FormField
              control={form.control}
              name="leverageTier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="text"
                      autoComplete="off"
                      className="w-full"
                      background="primary"
                      // pattern="^[0-9]*[.,]?[0-9]*$"
                      minLength={1}
                      textSize="sm"
                      // inputMode="decimal"
                      step="any"
                      {...field}
                      onChange={(e) => {
                        const pattern = /^-?[0-9]*[.,]?[0-9]*$/;
                        if (pattern.test(e.target.value))
                          return field.onChange(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />

            {
              <p className="text-red-400 text-sm">
                {form.formState.errors.leverageTier?.message}
              </p>
            }
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            disabled={!form.formState.isValid}
            variant={"submit"}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
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
                className="w-full"
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
