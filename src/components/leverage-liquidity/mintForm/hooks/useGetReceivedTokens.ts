import { ApeContract } from "@/contracts/ape";
import type { TAddressString } from "@/lib/types";
import { useEffect, useState } from "react";
import { decodeEventLog, type Log } from "viem";
interface Props {
  logs: Log<bigint, number, false>[] | undefined;
  apeAddress: TAddressString;
}

/**
 * Get tokens received from transaction logs.
 */
export function useGetReceivedTokens({ logs, apeAddress }: Props) {
  const [tokenReceived, setTokenReceived] = useState<bigint | undefined>();
  useEffect(() => {
    if (logs) {
      const foundLogs = logs.filter((l) => l.address === apeAddress);
      if (!foundLogs) return;
      foundLogs.forEach((log) => {
        const parsed = decodeEventLog({
          abi: ApeContract.abi,
          data: log.data,
          topics: log.topics,
        });

        if (parsed.eventName === "Transfer") {
          setTokenReceived(parsed.args.amount);
          return;
        }
      });
    }
  }, [apeAddress, logs]);
  return { tokenReceived };
}
