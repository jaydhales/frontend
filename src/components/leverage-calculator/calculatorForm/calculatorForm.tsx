"use client";
import React from "react";
import { type TVaults } from "@/lib/types";
import DepositInputs from "./deposit-inputs";
import PriceInputs from "./price-inputs";
import VaultParamsInputSelects from "./vaultParamsInputSelects";
import { Card } from "@/components/ui/card";
import Show from "@/components/shared/show";
import { useCalculateMaxApe } from "./hooks/useCalculateMaxApe";
import { useFilterVaults } from "./hooks/useFilterVaults";
import Dropdown from "@/components/shared/dropDown";
import useSetDepositTokenDefault from "./hooks/useSetDepositTokenDefault";
import { useFindVault } from "./hooks/useFindVault";
import useIsDebtToken from "./hooks/useIsDebtToken";
import useGetFormTokensInfo from "./hooks/useGetUserBals";
import Calculations from "@/components/leverage-calculator/calculatorForm/calculations";
import { useFormContext } from "react-hook-form";
import type { TCalculatorFormFields } from "@/components/providers/calculatorFormProvider";
import { api } from "@/trpc/react";

interface Props {
  vaultsQuery: TVaults;
  isApe?: boolean;
}

/**
 * Contains form actions and validition.
 */
export default function CalculatorForm({ vaultsQuery }: Props) {
  const { collateralDecimals } = useGetFormTokensInfo();
  const { versus, long, leverageTiers } = useFilterVaults({ vaultsQuery });

  const { setValue, resetField, watch } =
    useFormContext<TCalculatorFormFields>();

  const selectedVault = useFindVault(vaultsQuery);

  const tokenPrices = () => {
    const debtToken = selectedVault.result?.debtSymbol ?? "USDC";
    const collateralToken = selectedVault.result?.collateralSymbol ?? "ETH";
    const { data: tokens } = api.price.getVaultPrices.useQuery({
      debtToken,
      collateralToken,
    });

    console.log(tokens);
    const collateralTokenPrice = Number(tokens?.data[0]?.prices[0]?.value) ;
    const debtTokenPrice = Number(tokens?.data[1]?.prices[0]?.value);

    const collateralInDebtToken = collateralTokenPrice && debtTokenPrice
        ? (collateralTokenPrice  / debtTokenPrice).toFixed(6)
        : undefined;
    const debtInCollateralToken = collateralTokenPrice && debtTokenPrice
      ? (debtTokenPrice / collateralTokenPrice).toFixed(6) :
        undefined;
    return {
      collateralTokenPrice,
      debtTokenPrice,
      collateralInDebtToken,
      debtInCollateralToken,
    };
  };
  const { debtTokenPrice, collateralTokenPrice, collateralInDebtToken, debtInCollateralToken } = tokenPrices();
  console.log(
    "debtTokenPrice",
    debtTokenPrice,
    "collateralTokenPrice",
    collateralTokenPrice,
      "collateralInDebtToken",
      collateralInDebtToken,
      "debtInCollateralToken",
      debtInCollateralToken,
  );


  // Clear price inputs on vault change
  React.useEffect(() => {
    setValue("entryPrice", "1");

    setValue("exitPrice",  "1");
    setValue("deposit", "1");
  }, [selectedVault.result, setValue]);

  useSetDepositTokenDefault({
    collToken: selectedVault.result?.collateralToken,
  });

  const usingDebtToken = useIsDebtToken();
  const { isLoading } = useCalculateMaxApe({
    usingDebtToken,
    collateralDecimals: collateralDecimals ?? 18,
    vaultId: Number.parseInt(selectedVault.result?.vaultId ?? "-1"),
  });

  const disabledPriceInputs = !Boolean(selectedVault.result);
  console.log("disabledPriceInputs", selectedVault.result);
  return (
    <Card>
      <form>
        {/* Versus, Long, and Leverage Dropdowns */}
        <VaultParamsInputSelects
          versus={versus}
          leverageTiers={leverageTiers}
          long={long}
        />
        <DepositInputs.Root>
          <DepositInputs.Inputs
            inputLoading={isLoading}
            disabled={false}
            decimals={collateralDecimals ?? 18}
          >
            <Dropdown.Root
              colorScheme="dark"
              name="depositToken"
              title=""
              disabled={!Boolean(selectedVault.result)}
            >
              <Show when={Boolean(selectedVault.result)}>
                <Dropdown.Item
                  tokenAddress={selectedVault.result?.collateralToken ?? ""}
                  value={selectedVault.result?.collateralToken ?? ""}
                >
                  {selectedVault.result?.collateralSymbol}
                </Dropdown.Item>
                <Dropdown.Item
                  tokenAddress={selectedVault.result?.debtToken ?? ""}
                  value={selectedVault.result?.debtToken ?? ""}
                >
                  {selectedVault.result?.debtSymbol}
                </Dropdown.Item>
              </Show>
            </Dropdown.Root>
          </DepositInputs.Inputs>
        </DepositInputs.Root>
        <PriceInputs.Root>
          {/* TODO: this component will be responsible of fetching and calculating the tokenPrice and,
                    set it onto entry and exit price
          */}
          <PriceInputs.EntryPrice disabled={disabledPriceInputs} />
          <PriceInputs.ExitPrice disabled={disabledPriceInputs} />
        </PriceInputs.Root>
        <Calculations disabled={false} />
      </form>
    </Card>
  );
}
