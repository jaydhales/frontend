import * as React from "react";
import { cn, formatNumber } from "@/lib/utils";
import * as classVarianceAuthority from "class-variance-authority";
import { formatUnits } from "viem";

const AmountVariants = classVarianceAuthority.cva("", {
  variants: {
    amountSize: {
      small: "",
      large: "text-2xl",
    },
  },
  defaultVariants: { amountSize: "large" },
});

const LabelVariants = classVarianceAuthority.cva(" text-gray-400", {
  variants: {
    labelSize: {
      small: "",
      large: "text-sm",
    },
  },
  defaultVariants: { labelSize: "large" },
});
export type InputProps = React.HTMLAttributes<HTMLHeadElement> &
  classVarianceAuthority.VariantProps<typeof AmountVariants> &
  classVarianceAuthority.VariantProps<typeof LabelVariants> & {
    decimals?: number;
    amount: bigint | undefined;
    unitLabel: string;
  };
const TokenDisplay = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, amount, decimals, amountSize, labelSize, unitLabel, ...props },
    ref,
  ) => {
    return (
      <h3
        ref={ref}
        className={cn(AmountVariants({ amountSize, className }))}
        {...props}
      >
        {formatNumber(formatUnits(amount ?? 0n, decimals ?? 18), 3)}
        <span className={cn(LabelVariants({ labelSize }))}> {unitLabel}</span>
      </h3>
    );
  },
);
TokenDisplay.displayName = "TokenDisplay";

export { TokenDisplay };
