import { roundDown } from "@/lib/utils";
export function BalancePercent({
  setValue,
  balance,
  overrideMaxValue,
}: {
  overrideMaxValue?: string;
  setValue: (s: string) => void;
  balance: string | undefined;
}) {
  return (
    <h2 className="flex justify-end gap-x-2 pt-1 text-right text-sm text-[#26DEC8]">
      <button
        onClick={() =>
          setValue(
            roundDown(Number.parseFloat(balance ?? "0") / 4, 4).toString(),
          )
        }
        aria-label="25% Balance"
        type="button"
      >
        25%
      </button>{" "}
      <button
        onClick={() =>
          setValue(
            roundDown(Number.parseFloat(balance ?? "0") / 2, 4).toString(),
          )
        }
        aria-label="50% Balance"
        type="button"
      >
        50%
      </button>{" "}
      <button
        type="button"
        onClick={() => {
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
