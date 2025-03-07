import type { TCalculatorFormFields } from "@/components/providers/calculatorFormProvider";
import { parseAddress } from "@/lib/utils";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export default function useIsDebtToken() {
  const formData = useFormContext<TCalculatorFormFields>().watch();
  const usingDebtToken = useMemo(() => {
    return (
      formData.depositToken === parseAddress(formData.versus) &&
      formData.depositToken !== ""
    );
  }, [formData.depositToken, formData.versus]);
  return usingDebtToken;
}
