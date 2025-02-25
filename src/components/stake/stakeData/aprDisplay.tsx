"use client";
import Show from "@/components/shared/show";
import type { SelectCurrentApr } from "@/lib/db/schema";
import { formatNumber } from "@/lib/utils";
import { api } from "@/trpc/react";
import React, { useEffect } from "react";
import { formatUnits, parseUnits } from "viem";

export default function AprDisplay({
  currentApr,
  sync,
}: {
  currentApr: SelectCurrentApr | undefined;
  sync: boolean;
}) {
  const [enabled, setEnabled] = React.useState(false);
  const { data } = api.divends.getApr.useQuery(undefined, {
    enabled: enabled,
    placeholderData: currentApr,
  });
  const { data: synced } = api.divends.longPollDividends.useQuery(undefined, {
    enabled: sync,
  });
  useEffect(() => {
    if (synced) {
      setEnabled(true);
    }
  }, [synced]);
  const APR = parseUnits(data?.apr ?? "0", 0);

  return (
    <div className="font-lora text-2xl ">
      <Show when={APR > 0n} fallback={<h1>N/A</h1>}>
        <h1>{formatNumber(formatUnits(APR, 6))}%</h1>
      </Show>
    </div>
  );
}
