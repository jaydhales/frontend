"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useFormContext } from "react-hook-form";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import type { TUnstakeFormFields } from "@/lib/types";
import { useEffect, useState } from "react";
import { type SimulateContractReturnType, parseUnits, formatUnits } from "viem";
import { useWriteContract } from "wagmi";
import { SirContract } from "@/contracts/sir";
import useUnstakeError from "@/components/stake/hooks/useUnstakeError";
import TransactionModal from "@/components/shared/transactionModal";
import { TransactionStatus } from "@/components/leverage-liquidity/mintForm/transactionStatus";
import TransactionSuccess from "@/components/shared/transactionSuccess";
import { useGetStakedSir } from "@/components/shared/hooks/useGetStakedSir";
import StakeInput from "@/components/shared/stake/stakeInput";
import { useUnstake } from "../stake/hooks/useUnstake";
import ClaimFeesCheckbox from "./claimFeesCheck";
import { useGetReceivedSir } from "./hooks/useGetReceivedSir";
import { TokenDisplay } from "../ui/token-display";
import { useCheckStakeValidity } from "../shared/stake/stakeForm/useCheckStakeValidity";
import { SirCard } from "./sirCard";

type SimulateReq = SimulateContractReturnType["request"] | undefined;

const UnstakeForm = ({
  closeUnstakeModal,
}: {
  closeUnstakeModal: () => void;
}) => {
  const form = useFormContext<TUnstakeFormFields>();
  const formData = form.watch();

  const balance = useGetStakedSir();
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [unstakeAndClaimFees, setUnstakeAndClaimFees] = useState(false);
  const { Unstake, isFetching: unstakeFetching } = useUnstake({
    amount: parseUnits(formData.amount ?? "0", 12),
    unstakeAndClaimFees,
  });

  const { writeContract, reset, data: hash, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: transactionData,
  } = useWaitForTransactionReceipt({ hash });
  const utils = api.useUtils();
  // REFACTOR THIS INTO REUSABLE HOOK
  useEffect(() => {
    if (isConfirmed && form.getValues("amount")) {
      form.resetField("amount");
      utils.user.getUnstakedSirBalance
        .invalidate()
        .catch((e) => console.log(e));
      if (unstakeAndClaimFees) {
        utils.user.getUserSirDividends
          .invalidate()
          .catch((e) => console.log(e));
      }
    }
  }, [
    form,
    isConfirmed,
    unstakeAndClaimFees,
    utils.user.getUnstakedSirBalance,
    utils.user.getUserSirDividends,
  ]);

  const { isValid, errorMessage } = useCheckStakeValidity({
    deposit: formData.amount ?? "0",
    depositToken: SirContract.address,
    requests: {
      mintRequest: Unstake?.request as SimulateReq,
    },
    tokenBalance: balance.unlockedStake,
    mintFetching: unstakeFetching,
    decimals: 12,
  });

  const onSubmit = () => {
    if (Unstake) {
      writeContract(Unstake?.request);
    }
  };
  const { data: dividends } = api.user.getUserSirDividends.useQuery(
    {
      user: address,
    },
    { enabled: isConnected },
  );

  useUnstakeError({
    formData,
    setError: form.setError,
    errorMessage,
    rootErrorMessage: form.formState.errors.root?.message,
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isConfirmed && !open) {
      reset();
    }
  }, [isConfirmed, open, reset]);
  const { tokenReceived } = useGetReceivedSir({
    logs: transactionData?.logs,
    staking: false,
  });
  return (
    <>
      <div className="w-full px-4 py-4">
        <TransactionModal.Root title="Unstake" setOpen={setOpen} open={open}>
          <TransactionModal.Close setOpen={setOpen} />
          <TransactionModal.InfoContainer
            isConfirming={isConfirming}
            hash={hash}
          >
            {!isConfirmed && (
              <>
                <TransactionStatus
                  action="Unstake"
                  waitForSign={isPending}
                  showLoading={isConfirming}
                />
                <div className="flex items-center justify-between py-2">
                  {/* <h2 className="text-sm text-gray-400">Amount</h2> */}
                  <h3 className="text-xl">
                    <TokenDisplay
                      amount={parseUnits(form.getValues("amount") ?? "0", 12)}
                      unitLabel="SIR"
                      decimals={12}
                      disableRounding
                    />
                  </h3>
                </div>
              </>
            )}
            {isConfirmed && (
              <TransactionSuccess
                hash={hash}
                amountReceived={tokenReceived}
                assetReceived="SIR"
                assetAddress={SirContract.address}
                decimals={12}
              />
            )}
          </TransactionModal.InfoContainer>
          <TransactionModal.StatSubmitContainer>
            <TransactionModal.SubmitButton
              isPending={isPending}
              isConfirmed={isConfirmed}
              onClick={() => {
                if (isConfirmed) {
                  closeUnstakeModal();
                  setOpen(false);
                } else {
                  onSubmit();
                }
              }}
              loading={isConfirming}
              disabled={!isValid && !isConfirmed}
            >
              Confirm Unstake
            </TransactionModal.SubmitButton>
          </TransactionModal.StatSubmitContainer>
        </TransactionModal.Root>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <StakeInput
              isStaking={false}
              form={form}
              balance={formatUnits(balance.unlockedStake ?? 0n, 12)}
            ></StakeInput>
            <ClaimFeesCheckbox
              value={unstakeAndClaimFees}
              dividends={
                Boolean(dividends) ? formatUnits(dividends ?? 0n, 18) : ""
              }
              onChange={setUnstakeAndClaimFees}
            ></ClaimFeesCheckbox>

            <div className=" mt-[20px] flex flex-col items-center justify-center">
              {address && (
                <Button
                  variant={"submit"}
                  onClick={() => {
                    if (isValid) {
                      setOpen(true);
                    }
                  }}
                  type="button"
                  disabled={!isValid}
                >
                  Unstake
                </Button>
              )}
              {!address && (
                <Button
                  onClick={() => openConnectModal?.()}
                  variant="submit"
                  type="button"
                >
                  Connect Wallet
                </Button>
              )}
              {form.formState.errors.root?.message && (
                <div className="flex w-[450px] items-center justify-center pt-[20px]">
                  <p className="h-[20px] text-center text-sm text-red-400">
                    {address && <>{form.formState.errors.root?.message}</>}
                  </p>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UnstakeForm;
