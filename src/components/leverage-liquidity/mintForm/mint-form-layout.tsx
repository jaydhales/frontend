import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import type { TMintFormFields } from "@/lib/types";
import { formatBigInt } from "@/lib/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import Estimations from "./estimations";
import { ESubmitType } from "./hooks/useCheckSubmitValid";
import TransactionModal from "./transactionModal";
import { useState } from "react";

interface Props {
  quoteData: bigint | undefined;
  topSelects: React.ReactNode;
  depositInputs: React.ReactNode;
  submitType: ESubmitType;
  isValid: boolean;
  onSubmit: () => void;
  waitForSign: boolean;
  isTxPending: boolean;
  isTxSuccess: boolean;
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
  onSubmit,
}: Props) {
  const form = useFormContext<TMintFormFields>();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TransactionModal
          waitForSign={waitForSign}
          isTxPending={isTxPending}
          isTxSuccess={isTxSuccess}
          setOpen={setOpenTransactionModal}
          open={openTransactionModal}
        >
          {address && (
            <Button
              onClick={() => onSubmit()}
              disabled={!isValid}
              variant="modal"
              type="submit"
            >
              {submitType === ESubmitType.mint ? "Mint" : "Approve"}
            </Button>
          )}
        </TransactionModal>

        {topSelects}
        <div>
          <FormLabel htmlFor="deposit">Deposit:</FormLabel>
          <div className="pt-1"></div>
          {depositInputs}
        </div>

        <Estimations
          disabled={!Boolean(quoteData)}
          ape={formatBigInt(quoteData, 4).toString()}
        />

        <div className=" flex-col flex items-center justify-center gap-y-2 pt-4">
          <p className="md:w-[450px] pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
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
