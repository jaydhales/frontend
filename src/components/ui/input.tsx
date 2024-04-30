import * as React from "react";
import { cn } from "@/lib/utils";
import * as classVarianceAuthority from "class-variance-authority";

const InputVariants = classVarianceAuthority.cva(
  "flex h-10 w-40  rounded-md  py-2  text-sm ring-offset-background" +
    "file:border-0 file:bg-transparent file:text-sm file:font-medium" +
    "placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 " +
    "focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      background: { transparent: "bg-transparent" },
      textSize: { md: "", xl: "text-[40px]" },
    },
    defaultVariants: { background: "transparent" },
  },
);
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  classVarianceAuthority.VariantProps<typeof InputVariants>;
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, background, textSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputVariants({ background, textSize, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
