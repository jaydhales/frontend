import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/trpc/react";
import { useBurnApe } from "./hooks/useBurnApe";
import { parseUnits } from "viem";
import { useCheckValidityBurn } from "./hooks/useCheckValidityBurn";
import { Section } from "./section";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
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
}: {
  balance: bigint | undefined;
  isApe: boolean;
  row: TUserPosition;
  close: () => void;
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
  const { address } = useAccount();
  const { data: teaRewards } = api.user.getTeaRewards.useQuery(
    { userAddress: address ?? "0x" },
    { enabled: Boolean(address) && !isApe },
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
  const { claimRewardRequest } = useClaimTeaRewards();

  useEffect(() => {
    if (isConfirmed) {
      form.setValue("deposit", "");
    }
  }, [form, isConfirmed]);

  const { isValid, error } = useCheckValidityBurn(formData, balance);

  const { tokenReceived } = useGetTxTokens({ logs: receiptData?.logs });

  const isClaimingRewards = !isApe && (teaRewards ?? 0n > 0n);
  const onSubmit = () => {
    if (isConfirmed) {
      return setOpen(false);
    }
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

  let submitButtonText = "Confirm Burn";
  if (isPending || isConfirming) {
    submitButtonText = "Pending...";
  }

  if (isConfirmed) {
    submitButtonText = "Close";
  }
  return (
    <FormProvider {...form}>
      <TransactionModal.Root open={open} setOpen={setOpen}>
        <TransactionModal.Close setOpen={setOpen} />
        <TransactionModal.InfoContainer>
          {!isConfirmed && (
            <>
              <TransactionStatus
                action="Burn"
                waitForSign={isPending}
                isTxPending={isConfirming}
              />
              <TransactionEstimates
                inAssetName={isApe ? "APE" : "TEA"}
                outAssetName={row.collateralSymbol}
                collateralEstimate={quoteBurn}
                usingEth={false}
              />
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
          <div className="pt-2"></div>
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
            <label htmlFor="a" className="">
              Burn Amount
            </label>

            <button
              type="button"
              onClick={() => close()}
              className="cursor-pointer text-white/80 transition-transform hover:scale-105 hover:text-white"
            >
              <X />
            </button>
          </div>
          <Section
            balance={balance}
            bg="bg-primary"
            form={form}
            vaultId={row.vaultId}
            isApe={isApe}
          />
          <div className="pt-2"></div>
          <div>
            <label htmlFor="a" className="">
              Into
            </label>
          </div>

          <SectionTwo
            data={{
              leverageTier: parseFloat(row.leverageTier),
              collateralToken: row.collateralToken,
              debtToken: row.debtToken,
            }}
            amount={quoteBurn}
            collateralSymbol={row.collateralSymbol}
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
              !Boolean(burnData?.request) ||
              !Boolean(formData.deposit)
            }
            variant="submit"
            onClick={() => setOpen(true)}
            className="w-full"
            type="button"
          >
            {isClaimingRewards && "Claim Rewards"}
            {!isClaimingRewards && `Burn ${isApe ? "APE" : "TEA"}`}
          </Button>
          <div className="h-5 text-sm text-red-400">
            {error && <p>{error}</p>}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
