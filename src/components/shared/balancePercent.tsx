import { roundDown } from "@/lib/utils";
export function BalancePercent({
  setValue,
  balance,
}: {
  setValue: (s: string) => void;
  balance: string | undefined;
}) {
  return (
    <h2 className="flex justify-end gap-x-2 pt-1 text-right text-sm text-[#26DEC8]">
      <span
        onClick={() =>
          setValue(roundDown(parseFloat(balance ?? "0") / 4, 4).toString())
        }
        aria-label="25% Balance"
        role="button"
      >
        25%
      </span>{" "}
      <span
        onClick={() =>
          setValue(roundDown(parseFloat(balance ?? "0") / 2, 4).toString())
        }
        aria-label="50% Balance"
        role="button"
      >
        50%
      </span>{" "}
      <span
        onClick={() =>
          setValue(roundDown(parseFloat(balance ?? "0"), 4).toString())
        }
        role="button"
        aria-label="Max Balance"
      >
        Max
      </span>
    </h2>
  );
}
