"use client";
import Image, { type StaticImageData } from "next/image";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Button } from "./ui/button";
import sir_logo from "@/../public/images/sir-logo.svg";
import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
export function Header() {
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const logo = sir_logo as StaticImageData;
  const open = () => {
    if (address) {
      openAccountModal?.();
      return;
    }
    openConnectModal?.();
    return;
  };
  return (
    <div className=" grid grid-cols-5 items-center justify-between px-[14px] py-[24px] text-white">
      <Link href={"/"} className="flex items-center gap-x-2">
        <Image src={logo} alt="Sir-Trading Logo" className="h-[60px] w-auto" />
        <h1 className="font-lora text-[24px] font-bold">SIR. Trading</h1>
      </Link>
      <div className="col-span-3 flex justify-center">
        <nav className="hidden lg:block">
          <ul className="flex gap-x-[16px] bg-[#0A0A0F] px-[12px] py-[12px] font-semibold text-muted-foreground">
            <div className="flex gap-x-[16px] bg-primary/40  rounded-md">
              <NavItem url={"/"}>Leverage</NavItem>
              <NavItem url={"/liquidity"}>Provide Liquidity</NavItem>
              <NavItem url={"/"}>My tokens</NavItem>
            </div>
            <NavItem url={"/stake"}>Stake</NavItem>
            <NavItem url={"/create-vault"}>Create Vault</NavItem>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-x-2 justify-end">
        <Button onClick={open} variant={"brown"} className="rounded-full">
          {!address && "Connect Wallet"}
          {address &&
            address.slice(0, 5) +
              "..." +
              address.slice(address.length - 5, address.length)}
        </Button>
        <div className="lg:hidden flex items-center text-white">
          <Sheet>
            <SheetTrigger>
              <Menu className="cursor-pointer" size={30} />
            </SheetTrigger>
            <SheetContent>
              <div className="flex justify-center">
                <ul className="text-muted-foreground space-y-4 text-center">
                  <div className="bg-primary/40 rounded-md">
                    <NavItem url={"/"}>Leverage</NavItem>
                    <NavItem url={"/liquidity"}>Provide Liquidity</NavItem>
                    <NavItem url={""}>My tokens</NavItem>
                  </div>
                  <NavItem url={"/stake"}>Stake</NavItem>
                  <NavItem url={"/create-vault"}>Create Vault</NavItem>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  url,
  children,
  main,
}: {
  children: ReactNode;
  url: string;
  main?: boolean;
}) {
  const path = usePathname();
  const active = url === path;
  return (
    <Link href={url}>
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
