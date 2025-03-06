import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ExplorerLink({
  transactionHash,
}: {
  transactionHash: string | undefined;
}) {
  return (
    <>
      {transactionHash && (
        <div className="flex justify-center gap-x-4">
          <Link
            className="flex items-center gap-x-1 text-sm text-neutral-400"
            target="_blank"
            href={`https://etherscan.io/tx/${transactionHash}`}
          >
            <ExternalLink size={15} />
            <div className="flex items-center gap-x-1">
              <span>View transaction on Explorer</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
