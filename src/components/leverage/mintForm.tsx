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
const MintSchema = z.object({
  long: z.string(),
  versus: z.string(),
});
export default function MintForm() {
  const form = useForm<z.infer<typeof MintSchema>>({
    resolver: zodResolver(MintSchema),
  });
  return (
    <Card className="bg-card p-[24px] text-white">
      <Form {...form}>
        <div className="grid grid-cols-3 gap-x-4">
          <Dropdown title="Go long:" form={form} />
          <Dropdown title="Versus:" form={form} />
          <Dropdown title="Leverage Ratio:" form={form} />
        </div>
      </Form>
    </Card>
  );
}

function Dropdown({
  form,
  title,
}: {
  title: string;
  form: UseFormReturn<
    {
      long: string;
      versus: string;
    },
    undefined
  >;
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
                <SelectTrigger>
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
