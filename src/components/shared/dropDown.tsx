import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { type ReactNode } from "react";
import { type UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

export default function Dropdown({
  form,
  title,
  colorScheme,
  name,
  placeholder,
  children,
  className,
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
    <div className={"flex  gap-x-2 " + className}>
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
      {/* 
      {clear && (
        <button type="reset" onClick={() => form.setValue(name, "")}>
          x
        </button>
      )} */}
    </div>
  );
}
