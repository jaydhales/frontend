import { useApproveErc20 } from "@/components/shared/hooks/useApproveErc20";
import { useMintApeOrTea } from "@/components/shared/hooks/useMintApeOrTea";
import { AssistantContract } from "@/contracts/assistant";
import type { TMintFormFields, TVaults } from "@/lib/types";
import { formatDataInput, findVault } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import type { SimulateContractReturnType } from "viem";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { z } from "zod";

type SimulateReq = SimulateContractReturnType["request"] | undefined;
export function useTransactions({
  isApe,
  vaultsQuery,
  decimals,
}: {
  isApe: boolean;
  vaultsQuery: TVaults;
  decimals: number;
}) {
  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();

  const { address } = useAccount();
  const { data: userBalance } = api.user.getBalance.useQuery(
    {
      userAddress: address,
      tokenAddress: formatDataInput(formData.long),
      spender: AssistantContract.address,
    },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );
  console.log(userBalance, "USER BALANCE");
  const safeLeverageTier = z.coerce.number().safeParse(formData.leverageTier);
  const leverageTier = safeLeverageTier.success ? safeLeverageTier.data : -1;
  const safeDeposit = useMemo(() => {
    return z.coerce.number().safeParse(formData.deposit);
  }, [formData.deposit]);
  const {
    Mint,
    MintWithEth,
    isFetching: mintFetching,
  } = useMintApeOrTea({
    vaultId: findVault(vaultsQuery, formData).toString(),
    isApe,
    debtToken: formatDataInput(formData.versus), //value formatted : address,symbol
    collateralToken: formatDataInput(formData.long), //value formatted : address,symbol
    leverageTier: leverageTier,
    amount: safeDeposit.success
      ? safeParseUnits(safeDeposit.data.toString() ?? "0", decimals)
      : undefined,
    tokenAllowance: userBalance?.tokenAllowance?.result,
  });

  const { approveSimulate } = useApproveErc20({
    tokenAddr: formatDataInput(formData.long),
    approveContract: AssistantContract.address,
  });

  return {
    requests: {
      mintRequest: Mint?.request as SimulateReq,
      mintWithETHRequest: MintWithEth?.request as SimulateReq,
      approveWriteRequest: approveSimulate.data?.request as SimulateReq,
    },
    isApproveFetching: approveSimulate.isFetching,
    isMintFetching: mintFetching,
    userBalance,
  };
}

function safeParseUnits(s: string, n: number) {
  try {
    return parseUnits(s, n);
  } catch {
    return 0n;
  }
}
