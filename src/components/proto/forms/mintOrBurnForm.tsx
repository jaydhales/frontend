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
import { useMintOrBurn } from "./hooks/useMintOrBurn";
import { useWriteContract } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseUnits } from "viem";

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
  amount: z.coerce
    .number()
    .positive({ message: "Positive numbers only." })
    .finite({ message: "Must be a number." }),
  type: z.union([z.literal("mint"), z.literal("burn")]),
});

export function MintOrBurnForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      collateralToken: "",
      debtToken: "",
      amount: 0,
      type: "mint",
    },
    mode: "onBlur",
  });
  const { collateralToken, debtToken, type, amount } = form.getValues();
  const { data } = useMintOrBurn({
    collateralToken,
    debtToken,
    amount: parseUnits(amount.toString(), 18),
    type,
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
        <div className="grid grid-cols-2 gap-2">
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
            name="type"
            render={({ field }) => (
              <FormItem className=" ">
                <FormLabel>Action</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mint">Mint</SelectItem>
                    <SelectItem value="burn">Burn</SelectItem>
                  </SelectContent>
                </Select>

                <FormDescription>Action type.</FormDescription>
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
