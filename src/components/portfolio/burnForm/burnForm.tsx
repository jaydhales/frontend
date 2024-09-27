import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SirContract } from "@/contracts/sir";
import type { UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/trpc/react";
import { useBurnApe } from "./hooks/useBurnApe";
import type { SimulateContractReturnType } from "viem";
import { formatUnits, parseUnits } from "viem";
import { useCheckValidityBurn } from "./hooks/useCheckValidityBurn";
import { Section } from "./section";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import type { TUserPosition } from "@/server/queries/vaults";
import { Button } from "@/components/ui/button";
import { SectionTwo } from "./sectionTwo";
import TransactionModal from "@/components/shared/transactionModal";
import { TransactionEstimates } from "@/components/shared/transactionEstimates";
import TransactionSuccess from "@/components/shared/transactionSuccess";
import { useGetTxTokens } from "./hooks/useGetTxTokens";
import { X } from "lucide-react";
import { TransactionStatus } from "@/components/leverage-liquidity/mintForm/transactionStatus";
import { useClaimTeaRewards } from "./hooks/useClaimTeaRewards";
import useGetFee from "./hooks/useGetFee";
import { formatNumber } from "@/lib/utils";

const BurnSchema = z.object({
  deposit: z.string().optional(),
});

export type TBurnForm = UseFormReturn<
  { deposit?: string | undefined },
  undefined
>;
export type TBurnFields = { deposit?: string | undefined };

export default function BurnForm({
  balance,
  row,
  isApe,
  close,
  levTier,
  teaRewardBalance,
}: {
  balance: bigint | undefined;
  teaRewardBalance: bigint | undefined;
  isApe: boolean;
  row: TUserPosition;
  close: () => void;
  levTier: string;
}) {
  const form = useForm<z.infer<typeof BurnSchema>>({
    resolver: zodResolver(BurnSchema),
  });
  const formData = form.watch();

  const { data: quoteBurn } = api.vault.quoteBurn.useQuery(
    {
      amount: formData.deposit ?? "0",
      isApe,
      debtToken: row.debtToken,
      leverageTier: parseInt(row.leverageTier),
      collateralToken: row.collateralToken,
    },
    {
      enabled: Boolean(formData.deposit),
    },
  );

  const {
    writeContract,
    reset,
    data: writeData,
    isPending,
  } = useWriteContract();
  const {
    data: receiptData,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  const utils = api.useUtils();

  useEffect(() => {
    if (receiptData) {
      if (isApe) {
        utils.user.getApeBalance.invalidate().catch((e) => {
          console.log(e);
        });
      } else {
        utils.user.getTeaBalance.invalidate().catch((e) => {
          console.log(e);
        });
      }
    }
  }, [receiptData, utils.user.getApeBalance, isApe, utils.user.getTeaBalance]);

  const { data: burnData } = useBurnApe({
    isApe: isApe,
    data: {
      collateralToken: row.collateralToken,
      debtToken: row.debtToken,
      leverageTier: parseFloat(row.leverageTier),
    },
    amount: parseUnits(formData.deposit?.toString() ?? "0", 18),
  });
  const { claimRewardRequest } = useClaimTeaRewards({
    vaultId: parseUnits(row.vaultId, 0),
  });

  useEffect(() => {
    if (isConfirmed) {
      form.setValue("deposit", "");
    }
  }, [form, isConfirmed]);
  const reward = teaRewardBalance ?? 0n;
  const isClaimingRewards = Boolean(!isApe && reward > 0n);

  const { isValid, error } = useCheckValidityBurn(
    formData,
    balance,
    isClaimingRewards,
    claimRewardRequest as unknown as SimulateContractReturnType["request"],
  );

  const { tokenReceived } = useGetTxTokens({ logs: receiptData?.logs });

  const onSubmit = () => {
    if (isConfirmed) {
      return setOpen(false);
    }
    console.log(claimRewardRequest && isClaimingRewards);
    if (isClaimingRewards && claimRewardRequest) {
      writeContract(claimRewardRequest);
      return;
    }
    if (burnData?.request) {
      writeContract(burnData.request);
    }
  };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isConfirmed && !open) {
      reset();
    }
  }, [isConfirmed, reset, open]);

  let submitButtonText = isClaimingRewards ? "Confirm Claim" : "Confirm Burn";
  if (isPending || isConfirming) {
    submitButtonText = "Pending...";
  }
  if (isConfirmed) {
    submitButtonText = "Close";
  }

  const fee = useGetFee({ isApe, levTier });

  return (
    <FormProvider {...form}>
      <TransactionModal.Root open={open} setOpen={setOpen}>
        <TransactionModal.Close setOpen={setOpen} />
        <TransactionModal.InfoContainer>
          {!isConfirmed && (
            <>
              <TransactionStatus
                action={isClaimingRewards ? "Claim Rewards" : "Burn"}
                waitForSign={isPending}
                isTxPending={isConfirming}
              />
              {isClaimingRewards && (
                <div>{formatNumber(formatUnits(reward, 18), 9)} weth</div>
              )}
              {!isClaimingRewards && (
                <TransactionEstimates
                  inAssetName={isApe ? "APE" : "TEA"}
                  outAssetName={row.collateralSymbol}
                  collateralEstimate={quoteBurn}
                  usingEth={false}
                />
              )}
            </>
          )}
          {isConfirmed && (
            <TransactionSuccess
              assetReceived={row.collateralSymbol}
              amountReceived={tokenReceived}
            />
          )}
        </TransactionModal.InfoContainer>
        {/*----*/}
        <TransactionModal.StatSubmitContainer>
          <TransactionModal.StatContainer>
            <TransactionModal.StatRow
              title="Fee"
              value={fee ?? ""}
            ></TransactionModal.StatRow>
          </TransactionModal.StatContainer>
          <TransactionModal.SubmitButton
            disabled={false}
            loading={isConfirming || isPending}
            onClick={() => onSubmit()}
          >
            {submitButtonText}
          </TransactionModal.SubmitButton>
        </TransactionModal.StatSubmitContainer>
      </TransactionModal.Root>
      <form>
        <div className="space-y-2 w-[320px] md:w-full">
          <div className="flex justify-between">
            {!isClaimingRewards && (
              <label htmlFor="a" className="">
                Burn Amount
              </label>
            )}
            {isClaimingRewards && (
              <h2 className="text-[24px] pl-[24px] text-center w-full font-lora">
                Claim
              </h2>
            )}

            <button
              type="button"
              onClick={() => close()}
              className="cursor-pointer text-white/80 transition-transform hover:scale-105 hover:text-white"
            >
              <X />
            </button>
          </div>
          {!isClaimingRewards && (
            <Section
              balance={balance}
              bg="bg-primary"
              form={form}
              vaultId={row.vaultId}
              isApe={isApe}
            />
          )}
          <div className="pt-2"></div>
          <div>
            <label htmlFor="a" className="">
              {isClaimingRewards ? "Amount" : "Into"}
            </label>
          </div>

          <SectionTwo
            data={{
              leverageTier: parseFloat(row.leverageTier),
              collateralToken: isClaimingRewards
                ? SirContract.address
                : row.collateralToken,
              debtToken: row.debtToken,
            }}
            amount={
              isClaimingRewards
                ? formatUnits(reward, 12)
                : formatUnits(quoteBurn ?? 0n, 18)
            }
            collateralSymbol={isClaimingRewards ? "SIR" : row.collateralSymbol}
            bg=""
          />
          <div className="pt-2"></div>
          <div className="flex justify-center">
            <h4 className="w-[400px] text-center text-sm italic text-gray-500">
              With leveraging you risk losing up to 100% of your deposit, you
              can not lose more than your deposit.
            </h4>
          </div>
          <div className="pt-1"></div>
          <Button
            disabled={
              !isValid ||
              !Boolean(
                isClaimingRewards ? claimRewardRequest : burnData?.request,
              )
            }
            variant="submit"
            onClick={() => setOpen(true)}
            className="w-full"
            type="button"
          >
            {isClaimingRewards && "Claim Rewards"}
            {!isClaimingRewards && `Burn ${isApe ? "APE" : "TEA"}`}
          </Button>
          {error && (
            <div className="h-5 text-sm text-red-400">{<p>{error}</p>}</div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
