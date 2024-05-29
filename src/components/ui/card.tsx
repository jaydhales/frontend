import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CardProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("rounded-[8px] bg-secondary p-[20px]", className)}
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
