"use client";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavItem from "./navItem";

export default function SideNav() {
  const [openModal, setOpen] = useState(false);
  return (
    <div className="lg:hidden flex items-center text-white">
      <Sheet open={openModal} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu className="cursor-pointer" size={30} />
        </SheetTrigger>
        <SheetContent>
          <div className="flex justify-center">
            <ul className="text-muted-foreground space-y-4 text-center">
              <div className="bg-primary/40 rounded-md">
                <NavItem onClick={() => setOpen(false)} url={"/"}>
                  Leverage
                </NavItem>
                <NavItem onClick={() => setOpen(false)} url={"/liquidity"}>
                  Liquidity
                </NavItem>
                <NavItem onClick={() => setOpen(false)} url={"/portfolio"}>
                  Portfolio
                </NavItem>
              </div>
              <NavItem onClick={() => setOpen(false)} url={"/stake"}>
                Stake
              </NavItem>
              <NavItem onClick={() => setOpen(false)} url={"/create-vault"}>
                Create Vault
              </NavItem>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
