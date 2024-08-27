import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import type { ReactNode } from "react";
import { useMemo } from "react";
interface Props {
  waitForSign: boolean;
  isTxPending: boolean;
  isTxSuccess: boolean;
  setOpen: (b: boolean) => void;
  open: boolean;
  children: ReactNode;
}
export default function TransactionModal({
  waitForSign,
  isTxPending,
  isTxSuccess,
  open,
  setOpen,
  children,
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
        align="center"
        animate="none"
        closeColor={"black"}
        className=" overflow-hidden bg-transparent"
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
          <div className="px-6 bg-black/15 py-4">
            <h2 className="text-left font-lora text-lg">{data.message}</h2>
            <div className="flex gap-x-2 py-2">
              <h3 className="">ETH</h3>
              <span className="text-gray">{"->"}</span>
              <h3>APE</h3>
            </div>
          </div>
          <div className="flex py-4 px-6  w-full flex-col gap-y-4 items-center">
            <div className="flex flex-col w-full py-2 gap-y-1">
              <StatRow />
              <StatRow />
              <StatRow />
            </div>

            {children}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function StatRow() {
  return (
    <div className="flex justify-between text-[13px]">
      <h3 className="text-gray ">Price</h3>
      <h4>398</h4>
    </div>
  );
}
