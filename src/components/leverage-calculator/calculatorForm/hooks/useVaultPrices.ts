import { api } from "@/trpc/react";
import type { TCalculatorFormFields } from "@/components/providers/calculatorFormProvider";
import { useFormContext } from "react-hook-form";

export function useVaultPrices() {
    const form = useFormContext<TCalculatorFormFields>();
    const formData = form.watch();

    // Explicitly provide a fallback value using ?? ""
    const depositTicker =
        formData.long?.trim()
            ? (formData.long.split(",")[1] ?? "")
            : "";
    const collateralTicker =
        formData.versus?.trim()
            ? (formData.versus.split(",")[1] ?? "")
            : "";

    // Enable the query only when both tickers have a non empty value.
    const { data: vaultPrices, error } = api.price.getVaultPrices.useQuery(
        {
            depositToken: "ETH",
            collateralToken: "USDC",
        },
        {
            enabled: Boolean(depositTicker && collateralTicker),
        }
    );

    if (error) {
        console.error(error);
    } else {
        console.log("Prices", vaultPrices);
    }

    return vaultPrices ?? null;
}