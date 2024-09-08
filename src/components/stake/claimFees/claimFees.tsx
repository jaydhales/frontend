import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import Image from "next/image";
import { useEffect } from "react";
// import GasFeeEstimation from "@/components/shared/gasFeeEstimation";

import { type SimulateContractReturnType } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatNumber } from "@/lib/utils";

import { api } from "@/trpc/react";
type SimulateReq = SimulateContractReturnType["request"] | undefined;
interface Props {
  ethBalance?: string;
  claimAmount?: string;
  claimSimulate: SimulateReq;
  claimResult: bigint | undefined;
  claimFetching: boolean;
}

const ClaimFees = ({
  ethBalance,
  claimAmount,
  claimSimulate,
  claimResult,
  claimFetching,
}: Props) => {
  const utils = api.useUtils();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      utils.user.getEthBalance.invalidate().catch((e) => console.log(e));
    }
  }, [isConfirming, isConfirmed, utils.user.getEthBalance]);

  const onSubmit = () => {
    if (claimSimulate && Boolean(claimResult)) {
      writeContract(claimSimulate);
      return;
    }
  };

  return (
    <>
      <Card className="">
        <h2 className="text-center text-2xl pb-6 font-lora ">Claim</h2>
        <div className=" rounded-md bg-secondary-300 px-3 py-2">
          <div className="text-sm font-medium leading-none py-1">
            Amount to claim{" "}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-between">
              <div className="h-10 w-40 rounded-md ring-offset-background bg-card text-[28px]">
                {formatNumber(claimAmount ?? "0")}
              </div>
              {/* <div className="pt-2 text-sm italic text-gray-500">$66.88</div> */}
            </div>
            <div>
              <div className="flex flex-col justify-between gap-y-3">
                <div
                  className={`flex items-center justify-end gap-x-2 rounded-md py-1`}
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
                  {parseFloat(parseFloat(ethBalance ?? "0").toFixed(4))}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-col flex items-center justify-center mt-[20px]">
          {address && (
            <Button
              variant={"submit"}
              type="submit"
              className="md:w-full"
              onClick={onSubmit}
              disabled={!Boolean(claimResult) || claimFetching}
            >
              Claim
            </Button>
          )}
          {!address && (
            <Button
              onClick={() => openConnectModal?.()}
              variant="submit"
              className="md:w-full"
              type="button"
            >
              Connect Wallet
            </Button>
          )}
          {/* <GasFeeEstimation></GasFeeEstimation> */}
        </div>
      </Card>
    </>
  );
};

export default ClaimFees;
