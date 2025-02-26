"use client";
import Show from "@/components/shared/show";
import type { SelectCurrentApr } from "@/lib/db/schema";
import { formatNumber } from "@/lib/utils";
import React from "react";
import { formatUnits, parseUnits } from "viem";

export default function AprDisplay({
  currentApr,
}: {
  currentApr: SelectCurrentApr | undefined;
}) {
  const APR = parseUnits(currentApr?.apr ?? "0", 0);

  return (
    <div className="font-lora text-2xl ">
      <Show when={APR > 0n} fallback={<h1>N/A</h1>}>
        {/* remove eth decimals since eth 18 sir 12 === 6 */}
        <h1>{formatNumber(formatUnits(APR, 6))}%</h1>
      </Show>
    </div>
  );
}
