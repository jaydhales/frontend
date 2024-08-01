import type { TStakeFormFields } from "@/lib/types";
import { useEffect } from "react";
import type { UseFormSetError } from "react-hook-form";

export default function useSetRootError({
  formData,
  setError,
  errorMessage,
  rootErrorMessage,
}: {
  formData: TStakeFormFields;
  errorMessage: string | null;
  setError: UseFormSetError<TStakeFormFields>;
  rootErrorMessage: string | undefined;
}) {
  // ONLY SET ERROR IF ALL VALUES SET IN FORM
  useEffect(() => {
    if (errorMessage && formData.stake) {
      setError("root", { message: errorMessage });
    } else if (rootErrorMessage) {
      setError("root", { message: "" });
    }
  }, [errorMessage, formData.stake, rootErrorMessage, setError]);
}
