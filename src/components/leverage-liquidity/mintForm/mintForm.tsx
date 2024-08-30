"use client";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/trpc/react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import { formatUnits, parseEventLogs } from "viem";
import { useFormContext } from "react-hook-form";
import type { TMintFormFields, TVaults } from "@/lib/types";
import DepositInputs from "./deposit-inputs";
import TopSelects from "./topSelects";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import { useQuoteMint } from "./hooks/useQuoteMint";
import useSetRootError from "./hooks/useSetRootError";
import { Card } from "@/components/ui/card";
import { calculateApeVaultFee, formatBigInt, formatNumber } from "@/lib/utils";
import Estimations from "./estimations";
import MintFormSubmit from "./submit";
import { useFormSuccessReset } from "./hooks/useFormSuccessReset";
import { useTransactions } from "./hooks/useTransactions";
import { Status } from "./transactionStatus";
import { Estimates } from "./transactionEstimates";
import { CircleCheck } from "lucide-react";
import TransactionModal from "@/components/shared/transactionModal";
interface Props {
  vaultsQuery: TVaults;
  isApe: boolean;
}

/**
 * Contains form actions and validity.
 */
export default function MintForm({ vaultsQuery, isApe }: Props) {
  const { requests, isApproveFetching, isMintFetching, userBalance } =
    useTransactions({
      isApe,
      vaultsQuery,
    });

  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();
  const [useEth, setUseEth] = useState(false);
  const { versus, leverageTiers, long } = useSelectMemo({
    formData,
    vaultsQuery,
  });
  const { address } = useAccount();
  const { data: userEthBalance } = api.user.getEthBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );

  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
  } = useWaitForTransactionReceipt({ hash });
  // useEffect(() => {
  //   if (data?.logs) {
  //     const logs = data.logs.filter(l => l.  )
  //     const parsed = parseEventLogs({
  //       abi: [],
  //       logs: data.logs,
  //     });
  //   }
  // }, [data?.logs]);
  // Invalidate if approve or mint tx is successful.
  const [currentTxType, setCurrentTxType] = useState<
    // Used to know which
    "approve" | "mint" | undefined
  >();
  useFormSuccessReset({ isConfirming, isConfirmed, currentTxType, useEth });
  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    ethBalance: userEthBalance,
    useEth,
    deposit: formData.deposit ?? "0",
    depositToken: formData.depositToken,
    requests,
    tokenBalance: userBalance?.tokenBalance?.result,
    tokenAllowance: userBalance?.tokenAllowance?.result,
    mintFetching: isMintFetching,
    approveFetching: isApproveFetching,
  });
  const { quoteData } = useQuoteMint({ formData });
  useSetRootError({
    formData,
    setError: form.setError,
    errorMessage,
    rootErrorMessage: form.formState.errors.root?.message,
  });

  const onSubmit = () => {
    if (submitType === null) {
      return;
    }
    if (useEth && requests.mintWithETHRequest) {
      writeContract(requests.mintWithETHRequest);
      return;
    }
    // CHECK ALLOWANCE
    if (submitType === ESubmitType.mint && requests.mintRequest) {
      setCurrentTxType("mint");
      writeContract?.(requests.mintRequest);
      return;
    }
    if (submitType === ESubmitType.approve && requests.approveWriteRequest) {
      setCurrentTxType("approve");
      writeContract(requests.approveWriteRequest);
      return;
    }
  };

  let balance = userBalance?.tokenBalance?.result;
  if (useEth) {
    balance = userEthBalance;
  }

  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  useEffect(() => {
    if (isConfirmed && !openTransactionModal) {
      reset();
    }
  }, [isConfirmed, reset, openTransactionModal]);

  const levTier = form.getValues("leverageTier");
  const fee = useMemo(() => {
    const lev = parseFloat(levTier);
    if (isFinite(lev)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return formatNumber(calculateApeVaultFee(lev) * 100, 2);
    } else {
      return undefined;
    }
  }, [levTier]);
  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TransactionModal.Root
          setOpen={setOpenTransactionModal}
          open={openTransactionModal}
        >
          <TransactionModal.Close setOpen={setOpenTransactionModal} />
          <TransactionModal.InfoContainer>
            {!isConfirmed && (
              <>
                <Status isTxPending={isConfirming} waitForSign={isPending} />
                <Estimates
                  isApe={isApe}
                  usingEth={useEth}
                  collateralEstimate={quoteData}
                />
                <TransactionModal.Disclaimer>
                  Output is estimated.
                </TransactionModal.Disclaimer>{" "}
              </>
            )}
            {isConfirmed && (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <CircleCheck size={40} color="#137C6F" />
                </div>
                <h1 className="text-center">Transaction Successful!</h1>
              </div>
            )}
          </TransactionModal.InfoContainer>
          {/* ---------------------------------- */}
          <TransactionModal.StatSubmitContainer>
            <TransactionModal.StatContainer>
              <TransactionModal.StatRow
                title={"Fee"}
                value={fee ? fee.toString() + "%" : "0%"}
              />
            </TransactionModal.StatContainer>
            {
              <TransactionModal.SubmitButton
                onClick={() => {
                  if (!isConfirmed) {
                    onSubmit();
                  } else {
                    setOpenTransactionModal(false);
                  }
                }}
                disabled={!isValid && !isConfirmed}
              >
                {isConfirmed ? (
                  <>Close</>
                ) : (
                  <>
                    {submitType === ESubmitType.mint
                      ? "Confirm Mint"
                      : " Confirm Approve"}
                  </>
                )}
              </TransactionModal.SubmitButton>
            }
          </TransactionModal.StatSubmitContainer>
        </TransactionModal.Root>

        {/* Versus, Long, and Leverage Dropdowns */}
        <TopSelects
          form={form}
          versus={versus}
          leverageTiers={leverageTiers}
          long={long}
        />
        <DepositInputs.Root>
          <DepositInputs.Inputs
            useEth={useEth}
            setUseEth={(b: boolean) => {
              setUseEth(b);
            }}
            balance={formatUnits(balance ?? 0n, 18)}
            form={form}
            depositAsset={formData.long}
          />
        </DepositInputs.Root>
        {/* {depositInputs} */}

        <div className="pt-2"></div>
        <Estimations
          disabled={!Boolean(quoteData)}
          ape={formatBigInt(quoteData, 4).toString()}
        />

        <MintFormSubmit.Root>
          <p className="md:w-[450px] pb-2 text-center text-sm text-gray-500">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
          <MintFormSubmit.OpenTransactionModalButton
            isValid={isValid}
            onClick={() => {
              setOpenTransactionModal(true);
            }}
            submitType={submitType}
          />
          <MintFormSubmit.ConnectButton />
          <MintFormSubmit.Errors>
            <>{form.formState.errors.root?.message}</>
          </MintFormSubmit.Errors>
        </MintFormSubmit.Root>
      </form>
    </Card>
  );
}
