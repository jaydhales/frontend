import { api } from "@/trpc/react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { SirContract } from "@/contracts/sir";
import type { StaticImageData } from "next/image";
import { useState } from "react";
import Image from "next/image";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import sirIcon from "../../../public/images/sir-logo.svg";
import TransactionModal from "../shared/transactionModal";
import { TransactionStatus } from "../leverage-liquidity/mintForm/transactionStatus";

export function SirCard() {
  const { isConnected, address } = useAccount();
  const { data: totalBalance } = api.user.getTotalSirBalance.useQuery(
    {
      user: address,
    },
    { enabled: isConnected },
  );
  const { data: unclaimedData } =
    api.user.getUnclaimedContributorRewards.useQuery(
      { user: address },
      { enabled: isConnected },
    );
  const [open, setOpen] = useState(false);
  const { data } = useSimulateContract({
    ...SirContract,
    functionName: "contributorMint",
  });
  const { writeContract, isPending, data: hash } = useWriteContract();
  console.log(hash, "HASH");
  const { isLoading: isConfirming, data: transactionData } =
    useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data?.request);
    }
  };
  console.log(isConfirming, isPending, "IS PENDING !!!");
  return (
    <div className=" border-b border-secondary-200 pb-2">
      <div className=" rounded-md px-2 pb-2 text-2xl">
        <div className="flex justify-between pb-2">
          <h2 className="text-sm text-gray-200">Total SIR</h2>
          <Link
            href="/stake"
            className="flex items-center gap-x-1  text-sm text-blue-400"
          >
            <span className="underline  underline-offset-2">Stake</span>
            <ChevronRight size={18} />
          </Link>
        </div>
        <TransactionModal.Root setOpen={setOpen} open={open}>
          <TransactionModal.Close setOpen={setOpen} />
          <TransactionModal.InfoContainer>
            <TransactionStatus
              action="Claim"
              waitForSign={isPending}
              isTxPending={isConfirming}
            />
          </TransactionModal.InfoContainer>

          <TransactionModal.StatSubmitContainer>
            <TransactionModal.SubmitButton
              loading={isPending || isConfirming}
              disabled={isPending || isConfirming}
              onClick={() => onSubmit()}
            >
              Claim
            </TransactionModal.SubmitButton>
          </TransactionModal.StatSubmitContainer>
        </TransactionModal.Root>
        <div className="flex items-center justify-between">
          <div className="flex justify-between text-3xl   ">
            <div className="flex items-end gap-x-1">
              <span>{formatNumber(formatUnits(totalBalance ?? 0n, 12))}</span>
              <h2 className="text-sm font-light text-gray-400">SIR</h2>
            </div>
          </div>
          {data?.request && (
            <div>
              <h4 className="px-4 text-center text-[14px] text-gray-300">
                Claim Contributor Rewards
              </h4>
              <Button
                onClick={() => setOpen(true)}
                className="w-full space-x-1 bg-gold px-4 py-2 font-bold text-black hover:bg-gold/90"
              >
                <span>Claim </span>
                <span className="">
                  {formatNumber(formatUnits(unclaimedData ?? 0n, 12), 6)}
                </span>

                <Image
                  height={18}
                  width={18}
                  src={sirIcon as StaticImageData}
                  alt="Sir Icon"
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
