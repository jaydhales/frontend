import type { TMintForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
type Tinputs = {
  collateralToken: string;
  debtToken: string;
  debtSymbol: string;
  collateralSymbol: string;
  leverageTier: number;
};
interface state {
  form: TMintForm;
  setVaultInputs: (inputs: Tinputs) => void;
}

const MintFormProviderContext = createContext<state | undefined>(undefined);
export function useMintFormProvider() {
  const context = useContext(MintFormProviderContext);
  if (context === undefined) {
    throw new Error(
      "useMintFormProvider must be used within a MintFormProvider",
    );
  }
  return context;
}

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
  console.log(form.getValues())
  return <FormProvider {...form}>{children}</FormProvider>;
}
