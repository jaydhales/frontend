import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import ToolTip from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/utils";
import { X } from "lucide-react";

import type { ReactNode } from "react";
import { useMemo } from "react";
import { formatUnits } from "viem";
interface Props {
  waitForSign: boolean;
  isTxPending: boolean;
  isTxSuccess: boolean;
  setOpen: (b: boolean) => void;
  open: boolean;
  button: ReactNode;
  stats: ReactNode;
  quoteData: bigint | undefined;
  depositAmt: string | undefined;
  depositAssetName: string;
}
export default function TransactionModal({
  waitForSign,
  isTxPending,
  isTxSuccess,
  open,
  setOpen,
  button,
  quoteData,
  depositAmt,
  stats,
  depositAssetName,
}: Props) {
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
          <div className="absolute right-3 top-3">
            <X
              className="cursor-pointer"
              size={20}
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <div className="px-6 rounded-tr-xl rounded-tl-xl bg-black/15 pt-5 pb-6">
            <h2 className="text-left font-lora text-lg">{data.message}</h2>
            <div className="flex gap-x-2 py-2">
              <h3 className="space-x-1">
                <span>{depositAmt}</span>
                <span className="text-gray-300 text-sm">
                  {depositAssetName}
                </span>
              </h3>
              <span className="text-gray-500">{"->"}</span>
              <h3 className="space-x-1">
                <span>
                  {formatNumber(
                    parseFloat(formatUnits(quoteData ?? 0n, 18)),
                    4,
                  )}
                </span>
                <span className="text-gray-300 text-sm">APE</span>
              </h3>
            </div>
            <div className="text-[12px] italic text-gray-400 items-center pt-2 w-[300px]">
              <span>Output is estimated.</span>
            </div>
          </div>
          <div className="flex py-4 px-6  w-full flex-col gap-y-4 items-center">
            <div className="flex flex-col w-full py-2 gap-y-1">{stats}</div>
            {button}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function TransactionModalStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
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
