import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
interface state {
  form: UseFormReturn<
    {
      long: string;
      versus: string;
      leverageTier: string;
      depositToken: string;
      deposit: number;
    },
    undefined
  >;
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
  deposit: z.coerce.number(),
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
      leverageTier: "",
      long: "",
      versus: "",
      deposit: 0,
    },
  });
  const ContextValue: state = { form };

  return (
    <MintFormProviderContext.Provider value={ContextValue}>
      {children}
    </MintFormProviderContext.Provider>
  );
}
