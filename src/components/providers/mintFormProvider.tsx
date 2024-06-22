import type { TMintForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
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
      depositToken:""
    },
  });
  function setVaultInputs({
    debtToken,
    debtSymbol,
    collateralSymbol,
    collateralToken,
    leverageTier,
  }: {
    collateralToken: string;
    debtToken: string;
    debtSymbol: string;
    collateralSymbol: string;
    leverageTier: number;
  }) {
    form.setValue("versus", debtToken + "," + debtSymbol);
    form.setValue("long", collateralToken + "," + collateralSymbol);
    form.setValue("leverageTier", leverageTier.toString());
  }
  const ContextValue: state = { form, setVaultInputs };

  return (
    <MintFormProviderContext.Provider value={ContextValue}>
      {children}
    </MintFormProviderContext.Provider>
  );
}
