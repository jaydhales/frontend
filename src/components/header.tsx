"use client";

import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

export function Header() {
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const open = () => {
    if (address) {
      openAccountModal?.();
      return;
    }
    openConnectModal?.();
    return;
  };
  return (
    <div className="px-4 py-2">
      <Button onClick={open}>
        {!address && "Connect"}
        {address &&
          address.slice(0, 5) +
            "..." +
            address.slice(address.length - 5, address.length)}
      </Button>
    </div>
  );
}
