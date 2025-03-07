import type { TCalculatorFormFields } from "@/components/providers/calculatorFormProvider";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useSetDepositTokenDefault({
  collToken,
}: {
  collToken: string | undefined;
}) {
  const { setValue } = useFormContext<TCalculatorFormFields>();
  useEffect(() => {
    setValue("depositToken", collToken ?? "");
  }, [collToken, setValue]);
}
