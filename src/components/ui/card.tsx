import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export interface CardProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
}
const cardVariants = cva("rounded-[6px] p-[12px] md:p-[18px]", {
  variants: {
    background: {
      default: "bg-secondary nav-shadow",
      transparent: "",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, background, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          cardVariants({
            background,
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

export { Card };
