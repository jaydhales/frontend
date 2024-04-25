"use client";
import React from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import { Input } from "../ui/input";
const MintSchema = z.object({
  long: z.string(),
  versus: z.string(),
  deposit: z.number(),
});
export default function MintForm() {
  const form = useForm<z.infer<typeof MintSchema>>({
    resolver: zodResolver(MintSchema),
  });
  return (
    <Card className="space-y-2">
      <Form {...form}>
        <div className="grid grid-cols-3 gap-x-4">
          <Dropdown title="Go long:" form={form} />
          <Dropdown title="Versus:" form={form} />
          <Dropdown title="Leverage Ratio:" form={form} />
        </div>
        <div>
          <FormLabel>Deposit:</FormLabel>
          <div className="pt-1"></div>
          <div className="flex justify-between rounded-md bg-card-foreground p-3">
            <div>
              <FormField
                control={form.control}
                name="deposit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        className="w-20 bg-transparent p-1 text-[40px] text-white"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <h2 className="pt-1 text-sm text-[#B6B6C9]">$22.55</h2>
            </div>
            <div>
              <Dropdown colorScheme={"dark"} form={form} title="" />
              <h2 className="pt-1 text-sm text-[#B6B6C9]">Balance: $232.32</h2>
              <h2 className="text-[#26DEC8]">25% 50% Max</h2>
            </div>
          </div>
        </div>
      </Form>
    </Card>
  );
}

function Dropdown({
  form,
  title,
  colorScheme,
}: {
  title: string;
  form: UseFormReturn<
    {
      long: string;
      versus: string;
      deposit: number;
    },
    undefined
  >;
  colorScheme?: "light" | "dark" | null;
}) {
  return (
    <div>
      <FormField
        control={form.control}
        name="long"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger colorScheme={colorScheme}>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="mint">Mint</SelectItem>
                <SelectItem value="burn">Burn</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
