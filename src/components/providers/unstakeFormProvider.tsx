import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const UnstakeSchema = z.object({
  amount: z.string(),
  claimFees: z.boolean().default(false).optional(),
});

export default function UnstakeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof UnstakeSchema>>({
    resolver: zodResolver(UnstakeSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      claimFees: false,
    },
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}
