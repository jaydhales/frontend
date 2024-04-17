"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useSwapAndMint } from "./hooks/useSwapAndMint";
import { useWriteContract } from "wagmi";
import { Switch } from "../ui/switch";

const FormSchema = z.object({
  collateralToken: z
    .string()
    .min(42, {
      message: "Address length too short.",
    })
    .startsWith("0x", { message: "Token starts with 0x." }),
  debtToken: z
    .string()
    .min(10, {
      message: "Address length too short.",
    })
    .startsWith("0x", { message: "Token starts with 0x." }),
  amount: z.number().positive({ message: "Positive numbers only." }),
  isApe: z.boolean(),
});

export function SwapMintForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      collateralToken: "",
      debtToken: "",
      amount: 0,
      isApe: true,
    },
  });
  const { collateralToken, debtToken } = form.getValues();
  const { data } = useSwapAndMint({ collateralToken, debtToken, amount: 0n });
  const { writeContract } = useWriteContract();
  function onSubmit() {
    writeContract(data!.request);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-6"
      >
        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            control={form.control}
            name="collateralToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CollateralToken</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormDescription>Collateral token address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="debtToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Debt</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormDescription>Debt token address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0" type="number" {...field} />
                </FormControl>
                <FormDescription>Amount</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isApe"
            render={({ field }) => (
              <FormItem className=" flex items-center justify-between">
                <FormLabel>Is Ape</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  ></Switch>
                  {/* <Input placeholder="0" type="number" {...field} /> */}
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button disabled={!Boolean(data?.request)} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
