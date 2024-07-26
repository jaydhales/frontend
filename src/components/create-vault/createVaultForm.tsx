"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { isValid, z } from "zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSimulateContract } from "wagmi";
import { VaultContract } from "@/contracts/vault";
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
  return (
    <FormProvider {...form}>
      <form className="space-y-6">
        <div className="grid  gap-y-2">
          <div className="w-full space-y-2">
            <FormLabel htmlFor="longToken">Long Token</FormLabel>
            <FormField
              control={form.control}
              name="longToken"
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
                      textSize="md"
                      step="any"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full space-y-2">
            <FormLabel htmlFor="versusToken">Versus Token</FormLabel>
            <FormField
              control={form.control}
              name="versusToken"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="0x"
                      type="text"
                      autoComplete="off"
                      className="w-full"
                      background="primary"
                      minLength={1}
                      textSize="md"
                      step="any"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />
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
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      minLength={1}
                      textSize="md"
                      inputMode="decimal"
                      step="any"
                      {...field}
                      onChange={(e) => {
                        const pattern = /^[0-9]*[.,]?[0-9]*$/;
                        if (pattern.test(e.target.value))
                          return field.onChange(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />
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
