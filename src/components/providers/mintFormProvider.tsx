"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import MintFormProviderApi from "./mintFormProviderApi";

const MintSchema = z.object({
  long: z.string(),
  versus: z.string(),
  leverageTier: z.string(),
  depositToken: z.string(),
  deposit: z.string().optional(),
});

export default function MintFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof MintSchema>>({
    resolver: zodResolver(MintSchema),
    mode: "onChange",
    defaultValues: {
      deposit: "",
      leverageTier: "",
      long: "",
      versus: "",
      depositToken: "",
    },
  });
  return (
    <FormProvider {...form}>
      <MintFormProviderApi setValue={form.setValue}>
        {children}
      </MintFormProviderApi>
    </FormProvider>
  );
}
