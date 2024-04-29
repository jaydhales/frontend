import React, { useState } from "react";
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

import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "../ui/button";
import { type UseFormReturn } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
// TODO
// rm default placeholders
export default function Select({
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
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{title}</FormLabel>

          <Popover onOpenChange={(b) => setOpen(b)} open={open}>
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

                  {!field.value ? (
                    <ChevronDown className="h-7 w-7" />
                  ) : (
                    <X
                      className="h-5 w-5"
                      onClick={(e) => {
                        e.preventDefault();
                        form.setValue(name, "");
                      }}
                    ></X>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" w-[180px] p-0">
              <Command>
                {!field.value && !noSearch && (
                  <CommandInput placeholder={placeholder ?? "Search..."} />
                )}
                <CommandEmpty>No tokens found.</CommandEmpty>
                {/* <CommandGroup> */}
                <CommandList>
                  {items.map((item) => (
                    <CommandItem
                      key={item.label}
                      value={item.value}
                      onSelect={() => {
                        setOpen(false);
                        setTimeout(() => {
                          form.setValue(name, item.value);
                        }, 100);
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
