import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const BurnSchema = z.object({
  deposit: z.coerce.number(),
});
export default function BurnForm() {
  const form = useForm<z.infer<typeof BurnSchema>>({
    resolver: zodResolver(BurnSchema),
    defaultValues: {
      deposit: undefined,
    },
  });
  return (
    <Form {...form}>
      <div className="flex w-full justify-between rounded-md bg-card-foreground p-2">
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
          <span className="text-primary-foreground">40 50 max</span>
        </div>
      </div>
    </Form>
  );
}
