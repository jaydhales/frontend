import { formatBigInt } from "@/lib/utils";
import { Form, useFormContext } from "react-hook-form";
import Estimations from "../leverage/mintForm/estimations";
import { ESubmitType } from "../leverage/mintForm/hooks/useCheckSubmitValid";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FormLabel } from "../ui/form";
import type { TMintFormFields } from "@/lib/types";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
interface Props {
  quoteData: bigint | undefined;
  topSelects: React.ReactNode;
  depositInputs: React.ReactNode;
  submitType: ESubmitType;
  isValid: boolean;
  onSubmit: () => void;
}
/**
 * DepositForm
 * Reusable Form for depositing with Vault params.
 */
export default function DepositForm({
  quoteData,
  topSelects,
  depositInputs,
  isValid,
  submitType,
  onSubmit,
}: Props) {
  const form = useFormContext<TMintFormFields>();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  return (
    <Card>
      <Form {...form} onSubmit={onSubmit}>
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

        <div className=" flex-col flex items-center justify-center gap-y-2">
          {/* TODO */}
          {/* Dont set size w-[450px] on all elements. */}
          <p className="w-[450px] pb-2 text-center text-sm text-gray">{`With leveraging you risk losing up to 100% of your deposit, you can not lose more than your deposit`}</p>
          {address && (
            <Button disabled={!isValid} variant={"submit"} type="submit">
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

          <div className="w-[450px]">
            <p className="h-[20px] text-left text-sm text-red-400">
              {/* Don't show form errors if users is not connected. */}
              {address && <>{form.formState.errors.root?.message}</>}
            </p>
          </div>
        </div>
      </Form>
    </Card>
  );
}
