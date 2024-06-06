import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { type ReactNode } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import type { TMintForm } from "@/lib/types";
//retrive FormField props
export default function Dropdown({
  form,
  title,
  colorScheme,
  name,
  placeholder,
  children,
  className,
  disabled,
}: {
  title: string;
  clear?: boolean;
  placeholder?: string;
  name: "leverageTier" | "long" | "versus" | "depositToken";
  form: TMintForm;
  colorScheme?: "light" | "dark" | null;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div className={"flex  gap-x-2 " + className}>
      <div className="flex-grow">
        <FormField
          disabled={disabled}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{title}</FormLabel>
              <Select
                disabled={disabled}
                onValueChange={field.onChange}
                value={field.value}
              >
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
