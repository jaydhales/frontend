import { Button } from "@/components/ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";
import { ESubmitType } from "./hooks/useCheckSubmitValid";

const SubmitContext = React.createContext(undefined);

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <SubmitContext.Provider value={undefined}>
      <div className=" flex-col flex items-center justify-center gap-y-2 pt-4">
        {children}
      </div>
    </SubmitContext.Provider>
  );
};

const Errors = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  return (
    <div className="md:w-[450px]">
      <p className="h-[20px] text-left text-sm text-red-400">
        {/* Don't show form errors if users is not connected. */}
        {address && <>{children}</>}
      </p>
    </div>
  );
};

const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  if (address) return undefined;
  return (
    <Button onClick={() => openConnectModal?.()} variant="submit" type="button">
      Connect Wallet
    </Button>
  );
};

const OpenTransactionModalButton = ({
  onClick,
  isValid,
  submitType,
}: {
  submitType: ESubmitType;
  onClick: () => void;
  isValid: boolean;
}) => {
  const { address } = useAccount();
  if (!address) return undefined;
  return (
    <Button
      disabled={!isValid}
      variant="submit"
      type="button"
      onClick={onClick}
    >
      {submitType === ESubmitType.mint ? "Mint" : "Approve"}
    </Button>
  );
};

const MintFormSubmit = {
  Root,
  Errors,
  OpenTransactionModalButton,
  ConnectButton,
};

export default MintFormSubmit;
