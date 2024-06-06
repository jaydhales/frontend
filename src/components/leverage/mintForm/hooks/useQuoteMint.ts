import { useDebounce } from "@/components/shared/hooks/useDebounce";
import type { TMintFormFields } from "@/lib/types";
import { api } from "@/trpc/react";

export function useQuoteMint({ formData }: { formData: TMintFormFields }) {
  const allSelected = Boolean(
    formData.deposit &&
      formData.long !== "" &&
      formData.versus !== "" &&
      formData.leverageTier !== "",
  );
  const depositDebounce = useDebounce(formData.deposit, 500);
  const { data: quoteData } = api.vault.quoteMint.useQuery(
    {
      amount: depositDebounce,
      collateralToken: formData.versus.split(",")[0],
      debtToken: formData.long.split(",")[0],
      leverageTier: parseInt(formData.leverageTier),
    },
    { enabled: allSelected },
  );
  return { quoteData };
}
