import { formatNumber } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";
import { formatUnits } from "viem";
import ExplorerLink from "./explorerLink";
import { motion } from "motion/react";

export default function TransactionSuccess({
  amountReceived,
  assetReceived,
  hash,
  decimals,
}: {
  amountReceived?: bigint | undefined;
  assetReceived?: string;
  decimals?: number;
  hash: string | undefined;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-center">
        <CircleCheck size={40} color="#F0C775" />
      </div>
      <h2 className="text-center">Transaction Successful!</h2>
      {amountReceived && (
        <h3 className="text-center">
          {assetReceived}{" "}
          {formatNumber(formatUnits(amountReceived ?? 0n, decimals ?? 18), 6)}
        </h3>
      )}
      <ExplorerLink transactionHash={hash} />
    </motion.div>
  );
}
