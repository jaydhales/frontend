"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const navItemVariants = cva(
  "cursor-pointer rounded-md px-2 text-gray-400 py-1 data-[main=true]:bg-primary data-[active=true]:text-white",

  {
    variants: {
      theme: {
        light: "text-white hover:text-gold data-[active=true]:text-gold",
        dark: "",
      },
    },
    defaultVariants: {
      theme: "dark",
    },
  },
);
interface Props extends VariantProps<typeof navItemVariants> {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  url: string;
  main?: boolean;
}
export default function NavItem({
  url,
  children,
  main,
  onClick,
  theme,
  className,
}: Props) {
  const path = usePathname();
  const active = url === path;
  return (
    <Link onClick={onClick} href={url}>
      <li
        data-active={active ? "true" : "false"}
        data-main={main ? "true" : "false"}
        className={cn(navItemVariants({ theme, className }))}
      >
        {children}
      </li>
    </Link>
  );
}
