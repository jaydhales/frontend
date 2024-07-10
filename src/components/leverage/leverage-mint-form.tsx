"use client";
import { findVault, formatDataInput } from "@/lib/utils";
import MintForm from "../shared/mintForm/mint-form-display";
import { useFormContext } from "react-hook-form";
import { AssistantContract } from "@/contracts/assistant";
import type { SimulateContractReturnType } from "viem";
import { parseUnits } from "viem";
import type { TMintFormFields, TVaults } from "@/lib/types";
import { useMemo } from "react";
import { z } from "zod";
import { useAccount } from "wagmi";
import { api } from "@/trpc/react";
import { useApprove } from "../shared/mintForm/hooks/useApprove";
import { useMintApeOrTea } from "../shared/hooks/useMintApeOrTea";
type SimulateReq = SimulateContractReturnType["request"] | undefined;
export function LeverageMintForm({
  vaultsQuery,
  isApe,
}: {
  vaultsQuery: TVaults;
  isApe: boolean;
}) {
  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();
  /** ##MINT APE## */
  const { address } = useAccount();
  const { data: userBalance } = api.user.getBalance.useQuery(
    {
      userAddress: address,
      tokenAddress: formatDataInput(formData.long),
      spender: AssistantContract.address,
    },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );

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
    vaultId: findVault(vaultsQuery, formData),
    isApe,
    debtToken: formatDataInput(formData.versus), //value formatted : address,symbol
    collateralToken: formatDataInput(formData.long), //value formatted : address,symbol
    leverageTier: leverageTier,
    amount: safeDeposit.success
      ? parseUnits(safeDeposit.data.toString() ?? "0", 18)
      : undefined,
    tokenAllowance: userBalance?.tokenAllowance?.result,
  });

  const { approveSimulate } = useApprove({
    tokenAddr: formatDataInput(formData.long),
    approveContract: AssistantContract.address,
  });

  return (
    <MintForm
      approveFetching={approveSimulate.isFetching}
      approveSimulate={approveSimulate.data?.request as SimulateReq}
      MintWithEth={MintWithEth as SimulateReq}
      Mint={Mint?.request as SimulateReq}
      vaultsQuery={vaultsQuery}
      mintFetching={mintFetching}
    />
  );
}
