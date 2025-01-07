import { roundDown } from "@/lib/utils";
import { useAccount } from "wagmi";
export function BalancePercent({
  setValue,
  balance,
  overrideMaxValue,
  disabled,
}: {
  overrideMaxValue?: string;
  setValue: (s: string) => void;
  balance: string | undefined;
  disabled?: boolean;
}) {
  const { isConnected } = useAccount();
  console.log({ isConnected });
  if (disabled ?? !isConnected) {
    console.log("disabled");
  }
  const dis = Boolean(disabled) || !isConnected;
  console.log({ dis });
  return (
    <h2 className="flex justify-end gap-x-2 pt-1 text-right text-sm text-[#26DEC8]">
      <button
        onClick={() => {
          if (dis) return;

          setValue(
            roundDown(Number.parseFloat(balance ?? "0") / 4, 4).toString(),
          );
        }}
        aria-label="25% Balance"
        type="button"
        disabled={dis}
      >
        25%
      </button>{" "}
      <button
        disabled={dis}
        onClick={() => {
          if (dis) return;

          setValue(
            roundDown(Number.parseFloat(balance ?? "0") / 2, 4).toString(),
          );
        }}
        aria-label="50% Balance"
        type="button"
      >
        50%
      </button>{" "}
      <button
        type="button"
        disabled={true}
        onClick={() => {
          if (dis) return;
          console.log("HERE");
          if (!overrideMaxValue) {
            setValue(balance ?? "");
            return;
          }
          if (
            Number.parseFloat(overrideMaxValue) >
            Number.parseFloat(balance ?? "0")
          ) {
            setValue(balance ?? "");
            return;
          }
          setValue(overrideMaxValue);
        }}
        aria-label="Max Balance"
      >
        Max
      </button>
    </h2>
  );
}
