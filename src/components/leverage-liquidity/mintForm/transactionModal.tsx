import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useMemo } from "react";
interface Props {
  waitForSign: boolean;
  isTxPending: boolean;
  isTxSuccess: boolean;
  setOpen: (b: boolean) => void;
  open: boolean;
}
export default function TransactionModal({
  waitForSign,
  isTxPending,
  isTxSuccess,
  open,
  setOpen,
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
    return {};
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
          className={`space-y-3 rounded-md border-4  transition-all duration-700 ${data.success ? "border-accent" : "border-accent/0"} bg-secondary p-8 text-white`}
        >
          <h2 className="pb-1 text-center font-lora text-xl">{data.message}</h2>
          <h3 className="text-gray">Lorem ipsum</h3>
          <Button
            role="button"
            onClick={() => setOpen(false)}
            variant="submit"
            type="button"
          >
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
