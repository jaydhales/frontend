import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import Image from "next/image";
import GasFeeEstimation from "@/components/shared/gasFeeEstimation";

interface Props {
  ethBalance?: string;
  claimAmount?: string;
}

const ClaimFees = ({ ethBalance, claimAmount }: Props) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <Card className="mx-auto w-[80%]">
      <div className="text-sm font-medium leading-none pb-1 pt-2">
        Amount to claim:{" "}
      </div>
      <div className="flex justify-between rounded-md bg-primary p-3">
        <div className="flex flex-col justify-between">
          <div className="h-10 w-40 rounded-md ring-offset-background bg-card text-[28px]">
            {claimAmount}
          </div>
          <div className="pt-2 text-sm italic text-gray">$66.88</div>
        </div>
        <div>
          <div className="flex flex-col justify-between gap-y-3">
            <div
              className={`flex items-center justify-center gap-x-2 rounded-md py-1`}
            >
              <Image
                src={
                  "https://raw.githubusercontent.com/fusionxx23/assets/master/blockchains/ethereum/info/logo.png"
                }
                alt="sir-logo"
                width={25}
                height={25}
              />
              <span className="font-medium">ETH</span>
            </div>
            <h2 className="pt-1 text-right text-sm text-[#B6B6C9]">
              Balance:{" "}
              {parseFloat(parseFloat(ethBalance ? ethBalance : "0").toFixed(4))}
            </h2>
          </div>
        </div>
      </div>
      <div className=" flex-col flex items-center justify-center mt-[20px]">
        {address && (
          <Button
            variant={"submit"}
            type="submit"
            // disabled={!isValid}
          >
            {/* {submitType === ESubmitType.mint ? "Stake" : "Approve"} */}
            Claim
          </Button>
        )}
        {!address && (
          <Button
            onClick={() => openConnectModal?.()}
            variant="submit"
            type="button"
          >
            Connect Wallet
          </Button>
        )}
        <GasFeeEstimation></GasFeeEstimation>
      </div>
    </Card>
  );
};

export default ClaimFees;
