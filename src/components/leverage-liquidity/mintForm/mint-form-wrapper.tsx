"use client";
import React, { useMemo, useState } from "react";
import { api } from "@/trpc/react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSelectMemo } from "./hooks/useSelectMemo";
import type { SimulateContractReturnType } from "viem";
import { formatUnits } from "viem";
import { useFormContext } from "react-hook-form";
import type { TMintFormFields, TVaults } from "@/lib/types";
import DepositInputs from "./deposit-inputs";
import TopSelects from "./topSelects";
import { ESubmitType, useCheckSubmitValid } from "./hooks/useCheckSubmitValid";
import { useQuoteMint } from "./hooks/useQuoteMint";
import useSetRootError from "./hooks/useSetRootError";
import type { TUserBalance } from "./types";
import { Card } from "@/components/ui/card";
import { calculateApeVaultFee, formatBigInt, formatNumber } from "@/lib/utils";
import Estimations from "./estimations";
import MintFormSubmit from "./submit";
import TransactionModal from "./transactionModal";
import { useFormSuccessReset } from "./hooks/useFormSuccessReset";
interface Props {
  vaultsQuery: TVaults;
  requests: {
    mintRequest: SimulateContractReturnType["request"] | undefined;
    mintWithETHRequest?: SimulateContractReturnType["request"] | undefined;
    approveWriteRequest?: SimulateContractReturnType["request"] | undefined;
  };
  isMintFetching: boolean;
  approveFetching: boolean;
  userBalance: TUserBalance;
}
/**
 * Contains form actions and validity.
 */
export default function MintFormWrapper({
  vaultsQuery,
  requests,
  approveFetching,
  isMintFetching,
  userBalance,
}: Props) {
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
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
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
    approveFetching,
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
          <TransactionModal.Close
            setOpen={setOpenTransactionModal}
            reset={reset}
          />
          <TransactionModal.Info
            usingEth={useEth}
            isTxSuccess={isConfirmed}
            isTxPending={isConfirming}
            waitForSign={isPending}
            quoteData={quoteData}
          />
          <TransactionModal.StatSubmitContainer>
            <TransactionModal.StatContainer>
              <TransactionModal.StatRow
                title={"Fee"}
                value={fee ? fee.toString() + "%" : "0%"}
              />
            </TransactionModal.StatContainer>
            <TransactionModal.SubmitButton
              onClick={() => onSubmit()}
              disabled={!isValid}
            >
              {submitType === ESubmitType.mint ? "Mint" : "Approve"}
            </TransactionModal.SubmitButton>
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
