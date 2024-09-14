"use client";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/trpc/react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import { formatUnits } from "viem";
import { useFormContext } from "react-hook-form";
import type { TMintFormFields, TVaults } from "@/lib/types";
import DepositInputs from "./deposit-inputs";
import TopSelects from "./topSelects";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import { useQuoteMint } from "./hooks/useQuoteMint";
import useSetRootError from "./hooks/useSetRootError";
import { Card } from "@/components/ui/card";
import {
  calculateApeVaultFee,
  findVault,
  formatBigInt,
  formatNumber,
  getApeAddress,
} from "@/lib/utils";
import Estimations from "./estimations";
import MintFormSubmit from "./submit";
import { useFormSuccessReset } from "./hooks/useFormSuccessReset";
import { useTransactions } from "./hooks/useTransactions";
import { TransactionStatus } from "./transactionStatus";
import { CircleCheck } from "lucide-react";
import TransactionModal from "@/components/shared/transactionModal";
import { VaultContract } from "@/contracts/vault";
import { APE_HASH, WETH_ADDRESS } from "@/data/constants";
import { useGetReceivedTokens } from "./hooks/useGetReceivedTokens";
import { TransactionEstimates } from "./transactionEstimates";
interface Props {
  vaultsQuery: TVaults;
  isApe: boolean;
}

/**
 * Contains form actions and validity.
 */
export default function MintForm({ vaultsQuery, isApe }: Props) {
  const form = useFormContext<TMintFormFields>();
  const formData = form.watch();

  const { data: decimalData } = api.erc20.getErc20Decimals.useQuery({
    tokenAddress: formData.long.split(",")[0] ?? "0x",
  });

  let decimals = decimalData ?? 18;
  const { requests, isApproveFetching, isMintFetching, userBalance } =
    useTransactions({
      isApe,
      vaultsQuery,
      decimals,
    });
  const [useEthRaw, setUseEth] = useState(false);
  const useEth = useMemo(() => {
    // Ensure use eth toggle is not used on non-weth tokens
    if (
      formData.long.split(",")[0]?.toLowerCase() === WETH_ADDRESS.toLowerCase()
    ) {
      return useEthRaw;
    } else {
      false;
    }
  }, [useEthRaw, formData.long]);

  if (useEth) {
    decimals = 18;
  }
  const { versus, leverageTiers, long } = useSelectMemo({
    formData,
    vaultsQuery,
  });
  const { address } = useAccount();

  const { data: userEthBalance } = api.user.getEthBalance.useQuery(
    { userAddress: address },
    { enabled: Boolean(address) && Boolean(formData.long) },
  );

  const vaultId = findVault(vaultsQuery, formData);
  const apeAddress = getApeAddress({
    apeHash: APE_HASH,
    vaultAddress: VaultContract.address,
    vaultId,
  });

  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: transactionData,
  } = useWaitForTransactionReceipt({ hash });

  const { tokenReceived } = useGetReceivedTokens({
    apeAddress,
    logs: transactionData?.logs,
    isApe,
  });

  // Invalidate if approve or mint tx is successful.
  const [currentTxType, setCurrentTxType] = useState<
    // Used to know which
    "approve" | "mint" | undefined
  >();
  useFormSuccessReset({ isConfirming, isConfirmed, currentTxType, useEth });
  const { isValid, errorMessage, submitType } = useCheckSubmitValid({
    ethBalance: userEthBalance,
    decimals,
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
    if (!isApe) {
      return "19";
    }
    if (isFinite(lev)) {
      return formatNumber(calculateApeVaultFee(lev) * 100, 2);
    } else {
      return undefined;
    }
  }, [isApe, levTier]);
  const modalSubmit = () => {
    if (!isConfirmed) {
      onSubmit();
    } else {
      setOpenTransactionModal(false);
    }
  };
  let submitButtonText =
    submitType === ESubmitType.mint ? "Confirm Mint" : "Confirm Approve";
  if (isConfirmed) {
    submitButtonText = "Close";
  }
  if (isPending || isConfirming) {
    submitButtonText = "Pending...";
  }
  const deposit = form.getValues("deposit");
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
                <TransactionStatus
                  isTxPending={isConfirming}
                  waitForSign={isPending}
                  action={submitType === ESubmitType.mint ? "Mint" : "Approve"}
                />

                {submitType === ESubmitType.mint && (
                  <TransactionEstimates
                    isApe={isApe}
                    usingEth={useEth}
                    collateralEstimate={quoteData}
                  />
                )}
                {submitType === ESubmitType.mint && (
                  <TransactionModal.Disclaimer>
                    Output is estimated.
                  </TransactionModal.Disclaimer>
                )}

                {submitType === ESubmitType.approve && (
                  <TransactionModal.Disclaimer>
                    Approve SIR to send token funds .....
                  </TransactionModal.Disclaimer>
                )}
              </>
            )}
            {isConfirmed && (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <CircleCheck size={40} color="#189a8b" />
                </div>
                <h2 className="text-center">Transaction Successful!</h2>
                <h3 className="text-center">
                  {isApe ? "APE" : "TEA"} received:{" "}
                  {formatNumber(formatUnits(tokenReceived ?? 0n, 18), 6)}
                </h3>
              </div>
            )}
          </TransactionModal.InfoContainer>
          {/* ---------------------------------- */}
          <TransactionModal.StatSubmitContainer>
            {submitType === ESubmitType.mint && !isConfirmed && (
              <TransactionModal.StatContainer>
                <TransactionModal.StatRow
                  title={"Fee Percent"}
                  value={fee ? fee.toString() + "%" : "0%"}
                />

                <TransactionModal.StatRow
                  title="Fee Amount"
                  value={
                    formatNumber(
                      parseFloat(deposit ?? "0") *
                        (parseFloat(fee ?? "0") / 100),
                    ) +
                    " " +
                    form.getValues("long").split(",")[1]
                  }
                ></TransactionModal.StatRow>
              </TransactionModal.StatContainer>
            )}
            {
              <TransactionModal.SubmitButton
                onClick={modalSubmit}
                disabled={(!isValid && !isConfirmed) || isPending}
                loading={isPending || isConfirming}
              >
                {submitButtonText}
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
            balance={formatUnits(balance ?? 0n, decimals)}
            form={form}
            depositAsset={formData.long}
          />
        </DepositInputs.Root>

        <Estimations
          isApe={isApe}
          disabled={!Boolean(quoteData)}
          ape={formatBigInt(quoteData, 4).toString()}
        />

        <MintFormSubmit.Root>
          <p className="md:w-[450px] pb-2 text-center text-sm text-gray-500">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
          <MintFormSubmit.OpenTransactionModalButton
            isValid={isValid}
            onClick={() => setOpenTransactionModal(true)}
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
