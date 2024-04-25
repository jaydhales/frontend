import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const InputVariants = cva(
  "flex h-10 w-40  rounded-md  px-3 py-2 text-sm ring-offset-background" +
    "file:border-0 file:bg-transparent file:text-sm file:font-medium" +
    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2" +
    "focus:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      background: { transparent: "bg-transparent" },
      textSize: { md: "", xl: "text-[40px]" },
    },
    defaultVariants: { background: "transparent" },
  },
);
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputVariants>;
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
