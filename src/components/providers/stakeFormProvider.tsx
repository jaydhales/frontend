import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const StakeSchema = z.object({
  stake: z.string(),
});

export default function StakeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof StakeSchema>>({
    resolver: zodResolver(StakeSchema),
    mode: "onChange",
    defaultValues: {
      stake: "",
    },
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}
