import React from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { type UseFormReturn } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export default function SearchSelect({
  form,
  name,
  placeholder,
  title,
  items,
  noSearch,
}: {
  title: string;
  clear?: boolean;
  noSearch?: boolean;
  items: { value: string; label: string; imageUrl?: string }[];
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

  className?: string;
}) {
  console.log({ items });
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{title}</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl className="">
                <Button
                  role="combobox"
                  variant="card"
                  className={cn(
                    " h-[40px] justify-between",
                    !field.value && "  text-muted-foreground",
                  )}
                >
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder ?? "Select Token"}
                  <ChevronDown className="h-7 w-7" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" w-[180px] p-0">
              <Command>
                {!field.value && !noSearch && (
                  <CommandInput placeholder={placeholder ?? "Select Token"} />
                )}
                <CommandEmpty>No tokens found.</CommandEmpty>
                {/* <CommandGroup> */}
                <CommandList>
                  {items.map((item) => (
                    <CommandItem
                      key={item.label}
                      value={item.value}
                      onSelect={() => {
                        form.setValue(name, item.value);
                      }}
                      className="flex h-[40px] justify-between px-2"
                    >
                      <div className="flex items-center gap-x-2">
                        {item.imageUrl && (
                          <Image
                            height={30}
                            width={30}
                            src={item.imageUrl}
                            alt={item.label}
                          />
                        )}
                        {item.label}
                      </div>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
                {/* </CommandGroup> */}
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
