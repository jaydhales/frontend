import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import type { TMintFormFields } from "@/lib/types";
import { calculateApeVaultFee, formatBigInt, formatNumber } from "@/lib/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import Estimations from "./estimations";
import { ESubmitType } from "./hooks/useCheckSubmitValid";
import { useEffect, useMemo, useState } from "react";
import TransactionModal, { TransactionModalStat } from "./transactionModal";

interface Props {
  quoteData: bigint | undefined;
  topSelects: React.ReactNode;
  depositInputs: React.ReactNode;
  submitType: ESubmitType;
  isValid: boolean;
  onSubmit: () => void;
  waitForSign: boolean;
  reset: () => void;
  isTxPending: boolean;
  isTxSuccess: boolean;
  usingEth: boolean;
}

/**
 * Form layout container
 */
export default function MintFormLayout({
  quoteData,
  topSelects,
  depositInputs,
  isValid,
  submitType,
  isTxSuccess,
  isTxPending,
  waitForSign,
  usingEth,
  reset,
  onSubmit,
}: Props) {
  const form = useFormContext<TMintFormFields>();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
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
  const collateralAssetName = usingEth
    ? "ETH"
    : form.getValues("long").split(",")[1] ?? "";
  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TransactionModal
          reset={reset}
          waitForSign={waitForSign}
          isTxPending={isTxPending}
          isTxSuccess={isTxSuccess}
          quoteData={quoteData}
          setOpen={setOpenTransactionModal}
          open={openTransactionModal}
          depositAmt={form.getValues("deposit")}
          depositAssetName={collateralAssetName}
          button={
            address && (
              <Button
                onClick={() => onSubmit()}
                disabled={!isValid}
                variant="modal"
                type="submit"
              >
                {submitType === ESubmitType.mint ? "Mint" : "Approve"}
              </Button>
            )
          }
          stats={
            <>
              <TransactionModalStat
                title={"Fee"}
                value={fee ? fee.toString() + "%" : "0%"}
              />
            </>
          }
        />
        {/* Versus, Long, and Leverage Dropdowns */}
        {topSelects}
        <div>
          <FormLabel htmlFor="deposit">Deposit:</FormLabel>
          <div className="pt-1"></div>
          {/* Deposit Input, Deposit Asset, User Balance */}
          {depositInputs}
        </div>
        <div className="pt-2"></div>
        <Estimations
          disabled={!Boolean(quoteData)}
          ape={formatBigInt(quoteData, 4).toString()}
        />
        <div className=" flex-col flex items-center justify-center gap-y-2 pt-4">
          <p className="md:w-[450px] pb-2 text-center text-sm text-gray-500">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
          {address && (
            <Button
              disabled={!isValid}
              variant="submit"
              type="button"
              onClick={() => {
                setOpenTransactionModal(true);
              }}
            >
              {submitType === ESubmitType.mint ? "Mint" : "Approve"}
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

          <div className="md:w-[450px]">
            <p className="h-[20px] text-left text-sm text-red-400">
              {/* Don't show form errors if users is not connected. */}
              {address && <>{form.formState.errors.root?.message}</>}
            </p>
          </div>
        </div>
      </form>
    </Card>
  );
}
