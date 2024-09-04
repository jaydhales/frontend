import type { TMintFormFields } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { formatUnits } from "viem";

interface EstimateProps {
  collateralEstimate: bigint | undefined;
  usingEth: boolean;
  isApe: boolean;
}
export function Estimates({
  isApe,
  collateralEstimate,
  usingEth,
}: EstimateProps) {
  const form = useFormContext<TMintFormFields>();
  const collateralAssetName = usingEth
    ? "ETH"
    : form.getValues("long").split(",")[1] ?? "";
  const deposit = form.getValues("deposit");
  return (
    <div className="flex gap-x-2 py-2">
      <h3 className="space-x-1">
        <span>{deposit}</span>
        <span className="text-gray-300 text-sm">{collateralAssetName}</span>
      </h3>
      <span className="text-gray-500">{"->"}</span>
      <h3 className="space-x-1">
        <span>
          {formatNumber(formatUnits(collateralEstimate ?? 0n, 18), 6)}
        </span>
        <span className="text-gray-300 text-sm">{isApe ? "APE" : "TEA"}</span>
      </h3>
    </div>
  );
}
