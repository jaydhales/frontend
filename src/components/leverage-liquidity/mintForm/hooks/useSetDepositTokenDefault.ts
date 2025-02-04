import type { TMintFormFields } from "@/components/providers/mintFormProvider";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useSetDepositTokenDefault({
  collToken,
}: {
  collToken: string | undefined;
}) {
  const form = useFormContext<TMintFormFields>();
  useEffect(() => {
    form.setValue("depositToken", collToken ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collToken, form.setValue]);
}
