import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ui/tooltip";
import type { TMintFormFields } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { X } from "lucide-react";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { formatUnits } from "viem";
interface Props {
  setOpen: (b: boolean) => void;
  open: boolean;
  children: React.ReactNode;
}
function Root({ open, setOpen, children }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        title="Mint Modal"
        align="center"
        animate="none"
        closeColor={"black"}
        className="bg-transparent"
      >
        <div
          className={`rounded-xl relative transition-all duration-700  bg-secondary text-white`}
        >
          {children}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
const StatContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col w-full py-2 gap-y-1">{children}</div>
);
function StatSubmitContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex py-4 px-6 w-full flex-col gap-y-4 items-center">
      {children}
    </div>
  );
}
interface InfoProps {
  waitForSign: boolean;
  isTxPending: boolean;
  isTxSuccess: boolean;
  quoteData: bigint | undefined;
  usingEth: boolean;
}

function Info({
  waitForSign,
  usingEth,
  isTxPending,
  isTxSuccess,
  quoteData,
}: InfoProps) {
  const data = useMemo(() => {
    if (isTxSuccess) {
      return { message: "Success!", success: true };
    }
    if (waitForSign) {
      return { message: "Please Sign Transaction." };
    }
    if (isTxPending) {
      return { message: "Pending..." };
    }
    return { message: "Confirm Mint" };
  }, [waitForSign, isTxPending, isTxSuccess]);

  const form = useFormContext<TMintFormFields>();
  const collateralAssetName = usingEth
    ? "ETH"
    : form.getValues("long").split(",")[1] ?? "";
  const deposit = form.getValues("deposit");

  return (
    <div className="px-6 rounded-tr-xl rounded-tl-xl bg-black/15 pt-5 pb-6">
      <h2 className="text-left font-lora text-lg">{data.message}</h2>
      <div className="flex gap-x-2 py-2">
        <h3 className="space-x-1">
          <span>{deposit}</span>
          <span className="text-gray-300 text-sm">{collateralAssetName}</span>
        </h3>
        <span className="text-gray-500">{"->"}</span>
        <h3 className="space-x-1">
          <span>
            {formatNumber(parseFloat(formatUnits(quoteData ?? 0n, 18)), 4)}
          </span>
          <span className="text-gray-300 text-sm">APE</span>
        </h3>
      </div>
      <div className="text-[12px] italic text-gray-400 items-center pt-2 w-[300px]">
        <span>Output is estimated.</span>
      </div>
    </div>
  );
}

function Close({
  reset,
  setOpen,
}: {
  setOpen: (b: boolean) => void;
  reset: () => void;
}) {
  return (
    <div className="absolute right-3 top-3">
      <X
        className="cursor-pointer"
        size={20}
        onClick={() => {
          reset();
          setOpen(false);
        }}
      />
    </div>
  );
}
function StatRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between relative text-[13px]">
      <h3 className="text-gray-300 ">
        <span className="flex z-20 items-center gap-x-1">
          {title} <ToolTip>Fee Info</ToolTip>
        </span>
      </h3>
      <h4>{value}</h4>
    </div>
  );
}
function SubmitButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <Button onClick={onClick} disabled={disabled} variant="modal" type="submit">
      {children}
    </Button>
  );
}
const TransactionModal = {
  Root,
  Info,
  Close,
  StatRow,
  StatSubmitContainer,
  StatContainer,
  SubmitButton,
};
export default TransactionModal;
