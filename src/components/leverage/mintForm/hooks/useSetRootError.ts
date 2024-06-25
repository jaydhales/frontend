import type { TMintFormFields } from "@/lib/types";
import { useEffect } from "react";
import type { UseFormSetError } from "react-hook-form";

export default function useSetRootError({
  formData,
  setError,
  errorMessage,
  rootErrorMessage,
}: {
  formData: TMintFormFields;
  errorMessage: string | null;
  setError: UseFormSetError<TMintFormFields>;
  rootErrorMessage: string | undefined;
}) {
  // ONLY SET ERROR IF ALL VALUES SET IN FORM
  useEffect(() => {
    if (
      errorMessage &&
      formData.deposit &&
      formData.leverageTier &&
      formData.long &&
      formData.versus
    ) {
      setError("root", { message: errorMessage });
    } else if (rootErrorMessage) {
      setError("root", { message: "" });
    }
  }, [errorMessage, formData.deposit, formData.depositToken, formData.leverageTier, formData.long, formData.versus, rootErrorMessage, setError]);
}
