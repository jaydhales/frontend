"use client";
import React, { type ReactNode } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { Card } from "../../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { useSelectReducer } from "./hooks/useSelectReducer";
// import { Input } from "../ui/input";
const MintSchema = z.object({
  long: z.string(),
  versus: z.string(),
  leverageTier: z.string(),
  depositToken: z.string(),
  deposit: z.coerce.number(),
});

export default function MintForm() {
  const form = useForm<z.infer<typeof MintSchema>>({
    resolver: zodResolver(MintSchema),
    defaultValues: {
      leverageTier: "",
      long: "",
      versus: "",
      deposit: 0,
    },
  });
  const formData = form.watch();
  console.log({ formData });
  const { versus, leverageTiers, long } = useSelectReducer({ formData });

  return (
    <Card className="space-y-4">
      <Form {...form}>
        <div className="flex items-center">
          <button
            type="reset"
            onClick={() => {
              form.reset();
            }}
          >
            <span className="text-blue-400">clear</span>
          </button>
        </div>
        <div className=" grid grid-cols-3 gap-x-4">
          <Dropdown name="long" clear title="Go long:" form={form}>
            {long.map((e) => (
              <SelectItem value={e} key={e}>
                {e}
              </SelectItem>
            ))}
          </Dropdown>

          <Dropdown name="versus" clear title="Versus:" form={form}>
            {versus.map((e) => (
              <SelectItem value={e} key={e}>
                {e}
              </SelectItem>
            ))}
          </Dropdown>
          <Dropdown
            name="leverageTier"
            clear
            title="Leverage Ratio:"
            form={form}
          >
            {leverageTiers.map((e) => (
              <SelectItem value={e.toString()} key={e}>
                {e.toString()}
              </SelectItem>
            ))}
          </Dropdown>
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
                title=""
              >
                <SelectItem value="burn">Burn</SelectItem>
              </Dropdown>
              <h2 className="pt-1 text-sm text-[#B6B6C9]">Balance: $232.32</h2>
              <h2 className="text-[#26DEC8]">25% 50% Max</h2>
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
          <p className="w-[450px]  pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
          <button
            className="w-[450px] rounded-md bg-primary-foreground py-2 text-xl font-semibold hover:bg-primary-foreground/75"
            type="submit"
          >
            Mint
          </button>
        </div>
      </Form>
    </Card>
  );
}

function Dropdown({
  form,
  title,
  colorScheme,
  name,
  placeholder,
  children,
  className,
  clear,
}: {
  title: string;
  clear?: boolean;
  placeholder?: string;
  name: "leverageTier" | "long" | "versus" | "depositToken";
  form: UseFormReturn<
    {
      long: string;
      versus: string;
      leverageTier: string;
      deposit: number;
      depositToken: string;
    },
    undefined
  >;
  colorScheme?: "light" | "dark" | null;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"flex items-center gap-x-2 " + className}>
      <div className="flex-grow">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{title}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger colorScheme={colorScheme}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{children}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {clear && (
        <button type="reset" onClick={() => form.setValue(name, "")}>
          x
        </button>
      )}
    </div>
  );
}

// <SelectItem value="mint">Mint</SelectItem>
