import type { TMintForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface state {
  form: TMintForm;
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
    },
  });
  const ContextValue: state = { form };

  return (
    <MintFormProviderContext.Provider value={ContextValue}>
      {children}
    </MintFormProviderContext.Provider>
  );
}
