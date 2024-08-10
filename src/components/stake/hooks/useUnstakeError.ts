import type { TUnstakeFormFields } from "@/lib/types";
import { useEffect } from "react";
import type { UseFormSetError } from "react-hook-form";

export default function useSetRootError({
  formData,
  setError,
  errorMessage,
  rootErrorMessage,
}: {
  formData: TUnstakeFormFields;
  errorMessage: string | null;
  setError: UseFormSetError<TUnstakeFormFields>;
  rootErrorMessage: string | undefined;
}) {
  // ONLY SET ERROR IF ALL VALUES SET IN FORM
  useEffect(() => {
    if (errorMessage && formData.amount) {
      setError("root", { message: errorMessage });
    } else if (rootErrorMessage) {
      setError("root", { message: "" });
    }
  }, [
    errorMessage,
    formData.amount,
    formData.claimFees,
    rootErrorMessage,
    setError,
  ]);
}
