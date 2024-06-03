import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
interface Props {
  waitForSign: boolean;
  isTxPending: boolean;
}
export default function ProgressAlert({ waitForSign, isTxPending }: Props) {
  const [o, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (waitForSign) {
      setOpen(true);
      setMessage("Please Sign Transaction.");
    }
    if (isTxPending) {
      setOpen(true);
      setMessage("Waiting for block.");
    }
    if (!waitForSign && !isTxPending) {
      setOpen(false);
    }
  }, [waitForSign, isTxPending]);
  return (
    <AlertDialog open={o} onOpenChange={setOpen}>
      <AlertDialogContent
        align="center"
        animate="none"
        closeColor={"black"}
        className=" overflow-hidden bg-transparent"
      >
        <div className="space-y-3 rounded-md bg-secondary p-8 text-white">
          <h2 className="pb-1 text-center font-lora text-xl">{message}</h2>
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
