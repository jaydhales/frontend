"use client";
import { useSimulateContract } from "wagmi";
import type { TAddressString } from "@/lib/types";
import { VaultContract } from "@/contracts/vault";
import { useEffect } from "react";
import { api } from "@/trpc/react";
import { formatUnits } from "viem";
interface Props {
  collateralToken: string;
  debtToken: string;
  amount: bigint | undefined;
  tokenAllowance: bigint | undefined;
  depositToken: string;
  leverageTier: number;
  vaultId: string | undefined;
  isApe: boolean;
  useEth: boolean;
  decimals: number;
}
export function useMintApeOrTea({
  collateralToken,
  debtToken,
  leverageTier,
  amount,
  tokenAllowance,
  isApe,
  useEth,
  depositToken,
  decimals,
}: Props) {
  const vault = {
    debtToken: debtToken as TAddressString,
    collateralToken: collateralToken as TAddressString,
    leverageTier,
  };
  const debtTokenDeposit = depositToken === debtToken && debtToken !== "";
  const { data: uniswapQuote } = api.quote.getUniswapSwapQuote.useQuery(
    {
      amount: formatUnits(amount ?? 0n, 18),
      decimals,
      tokenAddressA: collateralToken,
      tokenAddressB: debtToken,
    },
    { enabled: debtTokenDeposit },
  );
  const tokenAmount = useEth ? 0n : amount;
  const ethAmount = useEth ? amount : 0n;
  const {
    data: Mint,
    refetch,
    isFetching,
    error,
  } = useSimulateContract({
    ...VaultContract,
    functionName: "mint",
    args: [
      isApe,
      { ...vault },
      // isApe ? apeAddress : zeroAddress,
      tokenAmount ?? 0n,
      debtTokenDeposit ? uniswapQuote?.amountOut ?? 0n : 0n,
    ],
    value: ethAmount ?? 0n,
  });

  if (error) {
    // console.log(error, "APE OR TEA ERROR");
  }
  useEffect(() => {
    refetch().catch((e) => console.log(e));
  }, [refetch, tokenAllowance]);
  return { Mint, isFetching };
}
