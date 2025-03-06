import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import type { TCalculatorFormFields } from "@/components/providers/calculatorFormProvider";
import useFormFee from "@/components/leverage-liquidity/mintForm/hooks/useFormFee";

export default function Calculations({
                                       disabled
                                     }: {
  disabled: boolean;
}) {
  const form = useFormContext<TCalculatorFormFields>();
  const formData = form.watch();

  // Check for the required fields
  const areRequiredValuesPresent = useMemo(() => {
    return formData.depositToken && formData.versus && formData.leverageTier;
  }, [formData.depositToken, formData.versus, formData.leverageTier]);

  const strFee = useFormFee({ leverageTier: formData.leverageTier, isApe: true });
  // If the required values are not present, show a placeholder
  if (!areRequiredValuesPresent) {
    return <div className="flex h-40 items-center justify-center">Please complete all required fields to display calculations.</div>;
  }



  const fee = Number(strFee);

  // Make sure entryPrice and exitPrice are provided to avoid calculation errors.
  const entryPrice = Number(formData.entryPrice);
  const exitPrice = Number(formData.exitPrice);
  if (!entryPrice || !exitPrice) {
    return <div className="flex h-40 items-center justify-center">Please provide both entry and exit prices.</div>;
  }

  // Calculate positions using the provided values.
  const finalPosition: number =
      (1 - fee / 100) * (exitPrice / entryPrice) ** ((1 + 2 ** parseFloat(formData.leverageTier)) - 1);

  const collateralPosition: number =
      (1 - fee / 100) * (exitPrice / entryPrice) ** (1 + 2 ** parseFloat(formData.leverageTier));

  const positionGain = (finalPosition - 1) * 100;
  const collateralGain = (collateralPosition - 1) * 100;

  const ticker = (token: string) => token.split(",")[1];

  const isLong = (): boolean => formData.long.split(",")[0] === formData.depositToken;



  return (
      <div className={`mt-4 ${disabled ? "opacity-50" : ""}`}>
        <h2 className="text-md font-bold">Project return:</h2>
        <div className="pt-1"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-md">
            <h3 className="text-md">
            <span className="text-sm text-gray-300">
              Returns in <span>{ticker(formData.long)}</span>
            </span>
            </h3>
            <div className="text-md space-x-1">
              <span>{(Number(formData.deposit) * finalPosition).toFixed(2)}</span>
              <span className={positionGain < 0 ? "text-red-400" : "text-green-400"}>
              ({positionGain > 0 ? "+" : ""}
                {positionGain.toFixed(2)}%)
            </span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md">
            <h3 className="text-md">
            <span className="text-sm text-gray-300">
              Returns in <span>{ticker(formData.versus)}</span>
            </span>
            </h3>
            <div className="text-md space-x-1">
            <span>
              {(Number(formData.deposit) * (entryPrice * collateralPosition)).toFixed(2)}
            </span>
              <span className={collateralGain < 0 ? "text-red-400" : "text-green-400"}>
              ({collateralGain > 0 ? "+" : ""}
                {collateralGain.toFixed(2)}%)
            </span>
            </div>
          </div>
        </div>
      </div>
  );
}