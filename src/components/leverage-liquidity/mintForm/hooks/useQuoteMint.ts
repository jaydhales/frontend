import { useDebounce } from "@/components/shared/hooks/useDebounce";
import type { TMintFormFields } from "@/lib/types";
import { formatDataInput } from "@/lib/utils";
import { api } from "@/trpc/react";

export function useQuoteMint({
  formData,
  isApe,
  decimals,
}: {
  isApe: boolean;
  formData: TMintFormFields;
  decimals: number;
}) {
  const allSelected = Boolean(
    formData.deposit &&
      formData.long !== "" &&
      formData.versus !== "" &&
      formData.leverageTier !== "",
  );
  const { debouncedValue: depositDebounce } = useDebounce(
    formData.deposit,
    500,
  );

  const { data: uniswapQuote } = api.quote.getUniswapSwapQuote.useQuery(
    {
      amount: depositDebounce ?? "0",
      decimals,
      tokenAddressA: formatDataInput(formData.long),
      tokenAddressB: formatDataInput(formData.versus),
    },
    { enabled: formData.depositToken === formatDataInput(formData.versus) },
  );
  const { data: quoteData } = api.vault.quoteMint.useQuery(
    {
      amount: depositDebounce,
      isApe,
      collateralToken: formData.long.split(",")[0],
      debtToken: formData.versus.split(",")[0],
      leverageTier: parseInt(formData.leverageTier),
    },
    { enabled: allSelected },
  );
  return { quoteData, minCollateralOut: uniswapQuote?.amountOut };
}
