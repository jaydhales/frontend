"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWethDeposit } from "./hooks/useWethDeposit";
import { useWriteContract } from "wagmi";

import { parseUnits } from "viem";

const FormSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: "Positive numbers only." })
    .finite({ message: "Must be a number." }),
});

export function MintOrBurnForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
    mode: "onBlur",
  });
  const { amount } = form.getValues();
  const { data } = useWethDeposit({
    amount: parseUnits(amount.toString(), 18),
  });
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
        <div className="grid grid-cols-2 gap-2 ">
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
        </div>

        <Button disabled={!Boolean(data?.request)} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
