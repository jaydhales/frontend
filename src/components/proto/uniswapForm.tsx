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
import { useAccount, useWriteContract } from "wagmi";
import { useUniswap } from "./hooks/useUniswap";
import { TAddressString } from "~/lib/types";

const FormSchema = z.object({
  swapToken: z
    .string()
    .min(42, {
      message: "Address length too short.",
    })
    .startsWith("0x", { message: "Token starts with 0x." }),
});

export function SwapMintForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      swapToken: "",
    },
  });
  const { address } = useAccount();
  let { swapToken } = form.getValues();
  const { data } = useUniswap({
    token: swapToken as TAddressString,
    userAddress: address ?? "0x",
  });
  const { writeContract } = useWriteContract();
  function onSubmit() {
    writeContract(data!.request);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-1/2 space-y-6">
        <div className="">
          <FormField
            disabled={Boolean(data?.request)}
            control={form.control}
            name="swapToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Swap Token</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormDescription>Collateral token address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
