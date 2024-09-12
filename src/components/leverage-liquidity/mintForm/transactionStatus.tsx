import { useMemo } from "react";

interface StatusProps {
  waitForSign: boolean;
  isTxPending: boolean;
}
export function TransactionStatus({ isTxPending, waitForSign }: StatusProps) {
  const data = useMemo(() => {
    if (waitForSign) {
      return { message: "Please Sign Transaction." };
    }
    if (isTxPending) {
      return { message: "Pending..." };
    }
    return { message: "Confirm Mint" };
  }, [waitForSign, isTxPending]);
  return <h2 className="text-left font-lora text-lg">{data.message}</h2>;
}
