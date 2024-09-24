"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function NavItem({
  url,
  children,
  main,
  onClick,
}: {
  onClick?: () => void;
  children: ReactNode;
  url: string;
  main?: boolean;
}) {
  const path = usePathname();
  const active = url === path;
  return (
    <Link onClick={onClick} href={url}>
      <li
        data-active={active ? "true" : "false"}
        data-main={main ? "true" : "false"}
        className="cursor-pointer px-2 py-1 rounded-md data-[main=true]:bg-primary data-[active=true]:text-white hover:text-white"
      >
        {children}
      </li>
    </Link>
  );
}
